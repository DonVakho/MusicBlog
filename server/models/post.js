const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: String,
    description: String,
    created: String,
    modified: String,
    userid: String
});

module.exports = mongoose.model('Post', PostSchema);