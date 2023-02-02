const mongoose = require("mongoose")

const FriendSchema = new mongoose.Schema({
    name: String,
    email: String,
})

module.exports = FriendSchema