const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = "mongodb+srv://jw209:ThC419plusOne%3F@cluster0.ghlu9.mongodb.net/Tennis?retryWrites=true&w=majority";

const routes = require('./routes/api');

// mongoose connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
});


// data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// http request logger
app.use(morgan('tiny'));
app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../client/build'));
}

// start listening
app.listen(PORT, console.log(`Server is stating at ${PORT}`));