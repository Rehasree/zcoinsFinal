const express = require("express")
const router = express.Router()
const { manageMoney, manageCoins, requestCoins } = require("../controllers/userInfo")

router.route("/manage-money").post(manageMoney)

router.route("/manage-coins").post(manageCoins)

router.route("/request-coins").post(requestCoins)

module.exports = router
