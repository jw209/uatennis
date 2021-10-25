const mongoose = require('mongoose');

// schema
const Schema = mongoose.Schema;
const PlayerSchema = new Schema({
    name: String,
    score: Number
});

// model
const User = mongoose.model('User', PlayerSchema);

module.exports = User;