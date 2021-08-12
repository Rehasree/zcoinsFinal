const express = require("express")
const router = express.Router()
const { register, updateInfo, login } = require("../controllers/OAuth")

router.route("/register").post(register)

router.route("/update-info").post(updateInfo)

router.route("/login").post(login)

router.get("/logout", (req, res) => {
    req.logout()
    res.status(200).send("You logged out successfully.")
})

module.exports = router
