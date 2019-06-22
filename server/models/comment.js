const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    text: String,
    created: String,
    modified: String,
    postid: String,
    userid: String
});

module.exports = mongoose.model('Comment', CommentSchema);