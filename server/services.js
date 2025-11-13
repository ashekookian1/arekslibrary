const fs = require("fs");
const path = require("path");

const database_file = path.join(__dirname + "/files/data.txt");  // creating your own db

var services = function(app) {
    // all db listeners are in here
    app.post("/write-record", function(req, res) {
        var id = "lib" + Date.now();

        var bookData = {
            id: id,
            bookTitle: req.body.bookTitle,
            author: req.body.author,
            publisher: req.body.publisher,
            yearPublished: req.body.yearPublished,
            isbn: req.body.isbn
        };

        console.log(JSON.stringify(bookData))

        var libraryData = []; //creating an array where you can hold data

        if(fs.existsSync(database_file)) {
            //read current data
            fs.readFile(database_file, "utf8", function(err, data) {// unnamed function - put everything in a JSON string
                if(err) {
                    res.send(JSON.stringify({msg: err}));
                } else {
                    libraryData = JSON.parse(data); // put everything in a JSON object

                    libraryData.push(bookData);

                    fs.writeFile(database_file, JSON.stringify(libraryData), function(err) {
                                if(err) {
                                            res.send(JSON.stringify({msg: err}));
                                } else {
                                     res.send(JSON.stringify({msg: "SUCCESS"}));
                                }

                    });
                }
            }); // end of read file

        
        
        
    
        } else {
            libraryData.push(bookData);

            fs.writeFile(database_file, JSON.stringify(libraryData), function(err) {
                                if(err) {
                                            res.send(JSON.stringify({msg: err}));
                                } else {
                                     res.send(JSON.stringify({msg: "SUCCESS"}));
                                }
            }); // end of write file
        }


    });

    app.get("/get-records", function(req, res) {
        if(fs.existsSync(database_file)) {
            fs.readFile(database_file, "utf8", function(err, data) {
                if(err) {
                    res.json({msg: err});
                }else{
                    libraryData = JSON.parse(data);
                    console.log(JSON.stringify(libraryData));
                    res.json({msg: "SUCCESS", libraryData:libraryData});  // left side of colon = JSON object name 
                                                                            // and right side = object value
                }
                
            }) 
        } else {
            libraryData = []; //empty array
            res.json({msg: "SUCCESS", libraryData:libraryData}); 
        }

    });
}
    
module.exports = services; 