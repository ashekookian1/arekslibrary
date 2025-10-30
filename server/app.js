const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express(); // the app express manages http so we don't have to use node

app.use(cors());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');  // * means anyone can use this
    next(); 
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/client", express.static(path.resolve(__dirname + "/../client/")));  // this is showing express the path to where the client folder is

const port = 5000;

//Page listeners (our router)

//Service listeners (our data processes)

// Listen
var server = app.listen(port, function(err) { // this is the app function that uses the port 5000 above - if the function has an error - it'll give you an error code
    if(err) throw err;

    console.log("Listening on port: " + port);  //port 5000 above - get/print message "listening on port 5000"

});