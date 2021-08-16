const User = require("../models/user")

module.exports.manageMoney = async (req, res) => {
    try {
        const { username, password, amount, command } = req.body
        let message
        const verify = await req._passport.instance._strategies.local._verify(username, password)

        if (!verify.user) throw verify.error.message

        const user = await User.findOne({ username: { $eq: username } })

        if (command === "addMoney") {
            user.money += parseFloat(amount)
            message = "Your money is added successfully."
        } else if (command == "withdraw") {
            user.money -= parseFloat(amount)
            message = `Your withdraw amount of ${amount}/- was successfull.`
        }

        await user.save()
        res.status(200).json({ message, user })
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
                message = `${parseFloat(coins)} coins are successfully selled.`
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
