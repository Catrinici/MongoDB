const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

//Dir where our models are located
const modelPath = path.resolve('server', 'models');

const reg = new RegExp("\\.js$", "i");

//DB information
const dbURI = 'mongodb://localhost/1955-api';
mongoose.connect(dbURI);
mongoose.Promise = global.Promise;

//succesfull
mongoose.connection.on('connected', () => {
    console.log(`Mongoose default connection open to ${ dbURI }`);
})

//connection err
mongoose.connection.on('error', err => {
    console.log(`Mongoose default connection error: ${err}`);
    process.exit(0);
})

//When connection is disconnected
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});

//If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through program termination');
        process.exit(0);
    })
})

//read all the files in the model dir and check if it is a js file before requiring it
fs.readdirSync(modelPath).forEach(file => {
    if (reg.test(file)) {
        require(path.join(modelPath, file));
    }
})