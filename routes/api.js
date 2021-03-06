const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const router = express.Router();

const User = require('../models/player');
const Comments = require('../models/comment');
const Game = require('../models/game');
const Account = require('../models/account');

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/logon");

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

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  Account.findOne({ email: req.body.email }).then(account => {
    if (account) {
      return res.status(400).json({ email: "Email taken" });
    } else {
      const newAccount = new Account({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAccount.password, salt, (err, hash) => {
          if (err) throw err;
          newAccount.password = hash;
          newAccount
            .save()
            .then(account => res.json(account))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  Account.findOne({ email }).then(account => {
    if (!account) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    bcrypt.compare(password, account.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: account.id,
          name: account.name
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Invalid password" });
        }
      });
    });
});

module.exports = router;