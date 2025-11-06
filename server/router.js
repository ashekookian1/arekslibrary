const path = require("path");

//function to hold all our page listeners
var router = function(app) {
    app.get("/", function(req, res) { // unnamed function is in between the {}s
        res.sendFile(path.join(__dirname + "/../client/Arek Library Project.html"))  //telling it the path to where the code is sitting
    });

    app.get("/write-data", function(req, res) { // unnamed function is in between the {}s
        res.sendFile(path.join(__dirname + "/../client/write-data.html"))  //telling it the path to where the code is sitting
    });

    app.get("/view-data", function(req, res) { // unnamed function is in between the {}s
        res.sendFile(path.join(__dirname + "/../client/view-data.html"))  //telling it the path to where the code is sitting
    });

}

module.exports = router;

//once updated this page - must restart the server - so control c below, and then up arrow to get the command to restart it