const mongoose = require('mongoose');

//Schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: String,
    password: String,
    date: {
        type: String,
        default: Date.now()
    }
})

//Model
const Users = mongoose.model('Users', UserSchema);

module.exports = Users;