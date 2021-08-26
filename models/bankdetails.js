const mongoose = require("mongoose")

const bankDetailsSchema = new mongoose.Schema({
    username: String,
    accountHolderID: String,
    accountID: String,
    resourceID: String,
    bundleID: String,
    targetAccount: String,
    requestID: String,
    transactions: [
        {
            _id: false,
            transaction_requestId: String,
            transferID: String,
            timeStamp: Date
        }
    ]
})

module.exports = mongoose.model("Bankdetail", bankDetailsSchema)
