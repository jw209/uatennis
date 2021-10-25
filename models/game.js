const mongoose = require('mongoose');

// schema
const Schema = mongoose.Schema;
const GameSchema = new Schema({
    p1fname: String,
    p1lname: String,
    p1won: String,
    p2fname: String,
    p2lname: String,
    p2won: String,
    date: String
});

// model
const Game = mongoose.model('Game', GameSchema);

module.exports = Game;