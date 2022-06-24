const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({path:'./config.env'});
const url=process.env.DATABASE;
mongoose.connect(url);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;