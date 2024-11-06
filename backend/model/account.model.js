const mongoose = require("mongoose")

const {Schema,model} = mongoose

const accountSchema = new Schema({
    name : String,
    email : {
        type : String,
        unique : true
        },
    password : String,
    confirmPassword : String,
    
        
})
const accountModel = model("user",accountSchema)

module.exports = accountModel