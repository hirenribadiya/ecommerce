const { default: mongoose } = require("mongoose")
const mogoose = require("mongoose")

const connection = mongoose.connect("mongodb://localhost:27017/account")

module.exports = connection

