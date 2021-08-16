const express = require("express")
const router = express.Router()
const { manageMoney, manageCoins, requestCoins, transferCoins } = require("../controllers/userInfo")

router.route("/manage-money").post(manageMoney)

router.route("/manage-coins").post(manageCoins)

router.route("/request-coins").post(requestCoins)

router.route("/transfer-coins").post(transferCoins)

module.exports = router
