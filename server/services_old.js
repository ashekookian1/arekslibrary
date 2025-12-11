//Bring in Mongo
const {MongoClient, ObjectId } = require('mongodb'); //create the  mongo client and the object id

//Define Database URL
const dbURL = mongodb: //127.0.0.1;

const database_file = path.join(__dirname + "/files/data.txt");  // creating your own db

const client = new MongoClient(dbURL)

var services = function(app) {
    
    app.post("/write-record", function(req, res) {
        var id = "lib" + Date.now();

        
        var idSentFromClient = req.body.id;
		var bookTitleSentFromClient = req.body.bookTitle;
		var authorSentFromClient = req.body.author;
		var publisherSentFromClient = req.body.publisher;
        var yearPublishedSentFromClient = req.body.yearPublished;
        var isbnSentFromClient = req.body.isbn;
    }

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

 try{
            const conn = await client.connect(); // connect to the Mongo server
            const db = conn.db("bookData"); // connect to the Mongo db desired
            const coll = db.collection("bookData"); // connect to the collection in the db desired

            await coll.insertOne(newBookData);

            await conn.close(); //close the db connection
            return res.json({msg: "SUCCESS"}); // message that successfully got the data you wanted - if it got it correctly

        } catch(err) {
            return res.json({msg:"Error: " + err}); // gives the client an error message if something goes wrong - error variable = what went wrong
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

//2.  Connect, find data, close database, return results or error
        try {
            const conn = await client.connect(); // connect to the Mongo server
            const db = conn.db("libraryData"); // connect to the Mongo db desired
            const coll = db.collection("libraryData"); // connect to the collection in the db desired

            const spells = await coll.find().sort(orderBy).toArray();

            await conn.close();

            return res.json({msg: "SUCCESS", libraryData: libraryData}); // gets spells array back and it populates the table 
        } catch(err) {
            return res.json({msg: "Error: " + err});
        }
    });

    app.put('/write-record', async function(req, res) {
        var idSentFromClient = req.body.id;
		var bookTitleSentFromClient = req.body.bookTitle;
		var authorSentFromClient = req.body.author;
		var publisherSentFromClient = req.body.publisher;
        var yearPublishedSentFromClient = req.body.yearPublished;
        var isbnSentFromClient = req.body.isbn;

        var libraryDataSentFromClient = req.query.libraryData;

        //2. Convert id string to a MongoID object
        var libraryDatasMongoObject = ObjectId.createFromHexString(libraryDataSentFromClient);

        //3. Create search with MongoID
        const search = {_id: libraryDataAsMongoObject};

        //4.  Connect and delete data, close database, return success or failure
            const conn = await client.connect(); // connect to the Mongo server
            const db = conn.db("libraryData"); // connect to the Mongo db desired
            const coll = db.collection("libraryData"); // connect to the collection in the db desired

            await coll.deleteOne(search);

            await conn.close(); //close the db connection
            return res.json({msg: "SUCCESS"}); // message that successfully got the data you wanted - if it got it correctly
    });
app.delete("/delete-record", function(req, res) { 

        var deleteID = req.body.id;
        
        if(fs.existsSync(database_file)) {
            console.log("Delete ID: " + deleteID);
            fs.readFile(database_file, "utf8", function(err, data) {
                if(err) {
                    res.json({msg: err});
                }else{
                    libraryData = JSON.parse(data);
                    console.log(JSON.stringify(libraryData));
                    for(var i=0; i<libraryData.length; i++) {
                        if (libraryData[i].id === deleteID) {
                            libraryData.splice(i, 1); 
                            break;

                        }
                    
                    }

                    fs.writeFile(database_file, JSON.stringify(libraryData), function(err) {
                                if(err) {
                                            res.send(JSON.stringify({msg: err}));
                                } else {
                                     res.send(JSON.stringify({msg: "SUCCESS"}));
                                }

                    });
                }
            });
        }
    });




}
    
module.exports = services; 

    