const express = require('express');

const router = express.Router();

const User = require('../models/player');
const Comments = require('../models/comment');
const Game = require('../models/game');

// routes
router.get('/', (req, res) => {
    User.find({})
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('Error retrieving data');
        })
});

router.get('/comments', (req, res) => {
    Comments.find({})
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('Error retrieving data');
        })
});

router.post('/saveComment', (req, res) => {
    console.log('Body: ', req.body);
    const data = req.body;

    const newComment = new Comments(data);
    
    newComment.save((error) => {
        if (error) {
            res.status().json({msg: 'Internal server error'});
        } else {
            res.json({
                msg: 'Data received'
            })
        }
    })
})

router.post('/saveGame', (req, res) => {
    console.log('Body: ', req.body);
    const data = req.body;

    const newGame = new Game(data);
    
    newGame.save((error) => {
        if (error) {
            res.status().json({msg: 'Internal server error'});
        } else {
            res.json({
                msg: 'Data received'
            })
        }
    })
})

module.exports = router;