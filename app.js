if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path")
const mongoose = require("mongoose")
const passport = require("passport")
const localStrategy = require("passport-local")

const User = require("./models/user")

const userRoutes = require("./routes/OAuth")
const infoRoutes = require("./routes/userInfo")

// Connecting to Database  ||"mongodb://localhost:27017/Zcoins"
const dbUrl = /*process.env.DB_URL ||*/ "mongodb://localhost:27017/Zcoins"
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const db = mongoose.connection
db.on("error", console.error.bind(console, "Mongoose connection denied"))
db.once("open", () => {
    console.log("Mongoose connection established!!")
})

// Passport configurations
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/auth", userRoutes)
app.use(infoRoutes)

// Serve Static assets if in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    console.log("In production")
    app.use(express.static(path.join(__dirname, "client/build")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"))
    })
}

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
