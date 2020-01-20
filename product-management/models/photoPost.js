const mongoose = require('mongoose');

//Schema
const Schema = mongoose.Schema;
const PhotoPostSchema = new Schema({
    title: String,
    imgUrl: String,
    date: {
        type: String,
        default: Date.now()
    }
})

//Model
const PhotoPost = mongoose.model('PhotoPost', PhotoPostSchema);

module.exports = PhotoPost;