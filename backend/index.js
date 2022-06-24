const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const express = require('express');
const app = express();
const port = process.env.PORT;
const db = require('./config/mongoose');

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});