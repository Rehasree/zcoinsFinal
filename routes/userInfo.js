const express = require("express")
const router = express.Router()
const { manageMoney, manageCoins, requestCoins, transferCoins, getProfileDetails } = require("../controllers/userInfo")

router.route("/manage-money").post(manageMoney)

router.route("/manage-coins").post(manageCoins)

router.route("/request-coins").post(requestCoins)

router.route("/transfer-coins").post(transferCoins)

router.route("/get-profile-details").post(getProfileDetails)

module.exports = router
