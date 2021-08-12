const User = require("../models/user")
const passport = require("passport")

module.exports.register = async (req, res) => {
    try {
        const { fname, lname, mobile, password, confirmPassword, email } = req.body;

        if (password !== confirmPassword) throw "Passwords are not matched"

        const user = new User({ username: mobile, name: `${fname} ${lname}`, email })
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
        const { _id, username, name, email, holderName, ProofType, PanCardNum, IFSCcode, BankName, AccountNum } = req.body
        const user = await User.findOneAndUpdate({ _id: { $eq: _id } }, { username, name, email, holderName, ProofType, PanCardNum, IFSCcode, BankName, AccountNum }, { new: true })

        res.status(200).json({ message: "Details updated", user })
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
