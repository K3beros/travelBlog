const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    username: String,
    location: String,
    d_o_b: Number,
    gender: String

})

const User = mongoose.model('User', UserSchema)
module.exports = User;