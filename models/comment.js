const mongoose = require('mongoose');

// schema
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    fname: String,
    lname: String,
    comment: String,
    date: String
});

// model
const Comments = mongoose.model('Comments', CommentSchema);

module.exports = Comments;