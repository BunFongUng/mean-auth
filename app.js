const express = require('express');

const fs = require('fs');

const path = require('path');

const bodyParser = require('body-parser');

const cors = require('cors');

const passport = require('passport');

const mongoose = require('mongoose');

const databaseConfig = require('./config/database');

const app = express();

const port = process.env.PORT || 3000;

const userRoutes = require('./routes/user');

mongoose.connect(databaseConfig.database_url);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
    console.log(`connected to database ${databaseConfig.database_url}`);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
    console.log(`Unable to connection to database: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected.');
});

app.use(cors());

//set static folder

app.use(express.static(path.join(__dirname, 'public')));

//log all of the incoming request
app.use((req, res, next) => {
    let now = new Date().toString();

    let log = `${now}: ${req.method} ${res.url}`;

    console.log(log);

    fs.appendFile('./log/server.log', log + "\n", (err) => {
        if (err) {
            console.log('Unable to append to server.log file');
        }
    });

    next();
});

app.get('/', (req, res) => {
    res.send('Welcome to our api');
});

app.use('/user', userRoutes);

app.listen(port, () => {
    console.log(`Server stared on port ${port}`);
});