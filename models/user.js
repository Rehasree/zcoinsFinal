const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    Birthdate: Date,
    PanCardNo: String,
    BirthYear: Number,
    BirthMonth: Number,
    birthDay: Number,
    money: {
        type: Number,
        default: 0
    },
    coins: {
        type: Number,
        default: 0
    }
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", userSchema)
