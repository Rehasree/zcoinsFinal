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
    BankName: String,
    AccountNum: String,
    IFSCcode: String,
    holderName: String,
    PanCardNum: String,
    ProofType: String,
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
