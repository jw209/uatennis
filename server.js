const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const passport = require("passport");

const app = express();

const PORT = process.env.PORT || 55632;
const MONGODB_URI = require("./config/keys").mongoURI;

const routes = require('./routes/api');

// adding to github
// mongoose connection
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
});

// data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// http request logger
app.use(morgan('tiny'));
app.use('/api', routes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}


// start listening
app.listen(PORT, console.log(`Server is stating at ${PORT}`));