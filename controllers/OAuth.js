const User = require("../models/user")
const passport = require("passport")
const axios = require("axios")
const uuid = require("uuid").v4
const Bankdetails = require("../models/bankdetails")

module.exports.register = async (req, res) => {
    try {
        const { fname, mname, lname, Birthdate, mobile, PanCardNo, password, confirmPassword, email, BirthYear, BirthMonth, birthDay } = req.body;

        if (password !== confirmPassword) throw "Passwords are not matched"

        const user = new User({ username: mobile, name: `${fname}-${mname}-${lname}`, email, Birthdate, PanCardNo, BirthYear, BirthMonth, birthDay })
        const newUser = await User.register(user, password)

        res.status(200).json({ message: "Registered successfully", newUser })
    } catch (err) {
        const errMssg = 'E11000 duplicate key error collection: Zcoins.users index: email_1 dup key:'
        err.message = err.message.includes(errMssg) ? 'This email is already registered. Try to Sign Up with another mail' : err.message;
        console.log(err.message)
        res.status(500).send(err.message)
    }
}

module.exports.updateInfo = async (req, res) => {
    try {
        const { username, name, PanCardNo, BirthYear, BirthMonth, birthDay } = req.body
        const [fname, mname, lname] = name.split("-")

        // Create account holder
        const accountData = {
            ifiID: 140793,
            formID: uuid(),
            individualType: "REAL",
            firstName: fname,
            middleName: mname,
            lastName: lname,
            profilePicURL: "",
            dob: {
                year: BirthYear,
                month: BirthMonth,
                day: birthDay
            },
            kycDetails: {
                kycStatus: "MINIMAL",
                kycStatusPostExpiry: "string",
                kycAttributes: {},
                authData: {
                    PAN: PanCardNo
                },
                authType: "PAN"
            },
            vectors: [
                {
                    type: "p",
                    value: `+91${username}`,
                    isVerified: true
                }
            ]
        }

        axios({
            method: "POST",
            url: "https://fusion.preprod.zeta.in/api/v1/ifi/140793/applications/newIndividual",
            data: JSON.stringify(accountData),
            headers: {
                "Content-Type": "application/json",
                "X-Zeta-AuthToken": process.env.FUSION_AUTH_TOKEN
            }
        }).then(response => {
            console.log("\n\n\n\naccount res", response.data)
            if (response.data.status === "REJECTED") throw response.data.statusDetails.message

            const accountData = response.data
            const bundleData = {
                accountHolderID: accountData.individualID,
                disableCardFFCreation: false,
                disableFFCreation: false,
                disablePhoneFFCreation: false,
                name: `${name} bundle`,
                phoneNumber: `+91${username}`,
                requestID: uuid()
            }

            // Bundle creation
            axios({
                method: "POST",
                url: "https://fusion.preprod.zeta.in/api/v1/ifi/140793/bundles/8a916c00-0fa3-4794-8e8d-ea9010ff1b80/issueBundle",
                data: JSON.stringify(bundleData),
                headers: {
                    "Content-Type": "application/json",
                    "X-Zeta-AuthToken": process.env.FUSION_AUTH_TOKEN
                }
            }).then(async bundleRes => {
                console.log("\n\n\n\nbundle res", bundleRes.data)

                const bundleData = bundleRes.data
                // Update details in our database
                const bank = new Bankdetails({
                    username,
                    accountHolderID: bundleData.accounts[0].accountHolderID,
                    accountID: bundleData.accounts[0].accountID,
                    resourceID: bundleData.paymentInstruments[0].resourceID,
                    bundleID: bundleData.paymentInstruments[0].bundleID,
                    targetAccount: bundleData.paymentInstruments[0].targetAccount,
                    requestID: bundleData.requestID
                })

                await bank.save()

                console.log("\n\n\nbank ", bank)

                res.status(200).json({ message: "Account created successfully" })

            }).catch(err => {
                console.log(err.data)
                res.status(500).send(err)
            })

        }).catch(err => {
            console.log(err.data)
            res.status(500).send(err)
        })

    } catch (err) {
        console.log(err)
        console.log("\n", err.message)
        res.status(500).send(err)
    }
}

module.exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) {
            return next(err); // will generate a 500 error
        }
        if (!user) {
            return res.send({ success: false, message: 'authentication failed' });
        }
        req.login(user, loginErr => {
            if (loginErr) {
                return next(loginErr);
            }
            return res.send({ success: true, user: req.user });
        });
    })(req, res, next);
}
