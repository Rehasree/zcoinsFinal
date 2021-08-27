const User = require("../models/user")
const Bankdetails = require("../models/bankdetails")
const axios = require("axios")
const uuid = require("uuid").v4

module.exports.manageMoney = async (req, res) => {
    try {
        const { username, password, amount, command } = req.body
        let message, debitAccountID, creditAccountID, remarks
        const verify = await req._passport.instance._strategies.local._verify(username, password)

        if (!verify.user) throw verify.error.message

        const user = await User.findOne({ username: { $eq: username } })
        if (!user) throw "Their is no account registered with this phone number."

        const bank = await Bankdetails.findOne({ username: { $eq: username } })
        if (!bank) throw "Sorry, we are not able to fetch your bank details."

        // Set account details dynamically
        if (command === "addMoney") {
            debitAccountID = "641db511-875c-4e9e-9698-a95dd87fc989"
            creditAccountID = bank.accountID
            remarks = "Add money."
        }
        else if (command == "withdraw") {
            debitAccountID = bank.accountID
            creditAccountID = "641db511-875c-4e9e-9698-a95dd87fc989"
            remarks = "Withdraw money."
        }

        const transferData = {
            requestID: uuid(),
            amount: {
                currency: "INR",
                amount: amount * 100
            },
            transferCode: "A2A_VBOPayout-VBO2U_AUTH",
            debitAccountID,
            creditAccountID,
            transferTime: 1574741608000,
            remarks,
            attributes: {}
        }

        axios({
            method: "POST",
            url: "https://fusion.preprod.zeta.in/api/v1/ifi/140793/transfers",
            data: JSON.stringify(transferData),
            headers: {
                "Content-Type": "application/json",
                "X-Zeta-AuthToken": process.env.FUSION_AUTH_TOKEN
            }
        }).then(async transferRes => {
            if (transferRes.data.status !== 'SUCCESS') throw "Unable to make transaction."

            const transferData = transferRes.data
            if (command === "addMoney") {
                user.money += parseFloat(amount)
                message = "Your money is added successfully."
            } else if (command == "withdraw") {
                user.money -= parseFloat(amount)
                message = `Your withdraw amount of ${amount}/- was successfull.`
            }

            bank.transactions.push({
                transaction_requestId: transferData.requestID, transferID: transferData.transferID, timeStamp: new Date()
            })

            user.notification += 1;

            await bank.save()
            await user.save()
            res.status(200).json({ message, user })

        }).catch(err => {
            console.log("error ", err)
            res.status(500).send(err)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports.manageCoins = async (req, res) => {
    try {
        const { username, password, action, coins } = req.body
        let message
        const verify = await req._passport.instance._strategies.local._verify(username, password)

        if (!verify.user) throw verify.error.message

        const user = await User.findOne({ username: { $eq: username } })

        if (action === "buy") {
            if (user.money >= parseFloat(coins) * 100) {
                user.money -= parseFloat(coins) * 100
                user.coins += parseFloat(coins)
                message = `${parseFloat(coins)} coins are added into your account successfully.`
            }
        } else if (action === "sell") {
            if (user.coins >= parseFloat(coins)) {
                user.coins -= parseFloat(coins)
                user.money += parseFloat(coins) * 100
                message = `${parseFloat(coins)} coins are successfully sold.`
            }
        }

        await user.save()
        res.status(200).json({ message, user })
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports.requestCoins = async (req, res) => {
    try {
        const { username, password, requestedUser, coins } = req.body
        const verify = await req._passport.instance._strategies.local._verify(username, password)

        if (!verify.user) throw verify.error.message

        const reqUser = await User.findOne({ username: { $eq: requestedUser } })
        if (!reqUser) throw "Their is no user registered with this phone number."

        // if (reqUser.coins < coins) throw `You have requested ${reqUser.username} for ${coins} coins successfull.`

        // These code will be executed when requested user accept request
        // const user = await User.findOne({ username: { $eq: username } })
        // reqUser.coins -= coins
        // user.coins += coins

        // await reqUser.save()
        // await user.save()
        res.status(200).json({ message: `You have requested ${reqUser.username} for ${coins} coins successfully.` })
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports.transferCoins = async (req, res) => {
    try {
        const { username, password, transferedUser, coins } = req.body
        const verify = await req._passport.instance._strategies.local._verify(username, password)

        if (!verify.user) throw verify.error.message

        const toUser = await User.findOne({ username: { $eq: transferedUser } })
        if (!toUser) throw "Their is no user registered with this phone number."

        if (verify.user.coins < coins) throw `You can't transfer beyond ${verify.user.coins} coins.`

        const user = await User.findOne({ username: { $eq: username } })
        user.coins -= coins
        toUser.coins += coins

        await toUser.save()
        await user.save()
        res.status(200).json({ message: `You successfully transferred ${coins} coins to ${transferedUser}.`, user })
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports.getProfileDetails = async (req, res) => {
    try {

        const bank = await Bankdetails.findOne({ username: { $eq: req.body.phoneNumber } })
        if (!bank) throw "Sorry we can't able to fetch your bank details."
        const accountId = bank.accountID

        const user = await User.findOne({ username: { $eq: req.body.phoneNumber } })
        if (!user) throw "No user with this phone number."

        axios({
            method: "GET",
            url: `https://fusion.preprod.zeta.in/api/v1/ifi/140793/accounts/${accountId}/transactions?pageSize=10&pageNumber=1`,
            headers: {
                "Content-Type": "application/json",
                "X-Zeta-AuthToken": process.env.FUSION_AUTH_TOKEN
            }
        }).then(async transactions => {
            user.notification = 0
            await user.save()
            res.status(200).send({ transactions: transactions.data.accountTransactionList, bank, user })
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })

    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports.getDetails = async (req, res) => {
    try {
        const { phoneNumber } = req.body
        const bank = await Bankdetails.findOne({ username: { $eq: phoneNumber } })
        res.status(200).send(bank)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}
