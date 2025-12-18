//Bring in Mongo
const {MongoClient, ObjectId } = require('mongodb'); //create the  mongo client and the object id

//Define Database URL
const dbURL = "mongodb://127.0.0.1";  

//const database_file = path.join(__dirname + "/files/data.txt");  // creating your own db

const client = new MongoClient(dbURL)

var services = function(app) {
    // all db listeners are in here
    app.post("/write-data", async function(req, res) {
    

        var bookData = {
            bookTitle: req.body.bookTitle,
            author: req.body.author,
            publisher: req.body.publisher,
            yearPublished: req.body.yearPublished,
            isbn: req.body.isbn
        };


        console.log(JSON.stringify(bookData))
        try{
            const conn = await client.connect(); // connect to the Mongo server
            const db = conn.db("library"); // connect to the Mongo db desired
            const coll = db.collection("bookTable"); // connect to the collection in the db desired

            await coll.insertOne(bookData);

            await conn.close(); //close the db connection
            return res.json({msg: "SUCCESS"}); // message that successfully got the data you wanted - if it got it correctly

        } catch(err) {
            return res.json({msg:"Error: " + err}); // gives the client an error message if something goes wrong - error variable = what went wrong
        }

    });

    app.get("/get-records", async function(req, res) {
        
        const orderBy = {bookTitle: 1};        // order it by name - in the name field

        //2.  Connect, find data, close database, return results or error
        try {
            const conn = await client.connect(); // connect to the Mongo server
            const db = conn.db("library"); // connect to the Mongo db desired
            const coll = db.collection("bookTable"); // connect to the collection in the db desired

            const books = await coll.find().sort(orderBy).toArray();

            await conn.close();

            return res.json({msg: "SUCCESS", libraryData: books}); // gets spells array back and it populates the table 
        } catch(err) {
            return res.json({msg: "Error: " + err});
        }

    });

app.get("/get-dataByType", async function(req, res) {
        //1.  Capture data sent from client (see line 34 in spellsTable.js for JSON object name)
        var typeValueSentFromClient = req.query.type;

        //2.  Filter by the data value sent from the client.
        //       Note: type = "", is sent when ALL is selected.
        var search = (typeValueSentFromClient === "") ? { } : {type: typeValueSentFromClient};

        //3. Set up sort by name ascending
                const orderBy = { author: 1 };

        //4.  Connect, find data, close database, return results or error
        try {
            const conn = await client.connect(); // connect to the Mongo server
            const db = conn.db("libraryData"); // connect to the Mongo db desired
            const coll = db.collection("libraryData"); // connect to the collection in the db desired

            const spells = await coll.find(search).sort(orderBy).toArray();

            await conn.close();

            return res.json({msg: "SUCCESS", author: author}); // gets spells array back and it populates the table 
        } catch(err) {
            return res.json({msg: "Error: " + err});
        }

    });

    app.put('/update-record', async function(req, res) {
        //1.  Bring in the data from the client (see spellsTable.js, line 96 for JSON object names)
        var titleSentFromClient = req.body.title;
        var authorSentFromClient = req.body.author;
        var publisherSentFromClient = req.body.publisher;
        var yearPublishedSentFromClient = req.body.yearPublished;
        var isbnSentFromClient = req.body.isbn;

        var updateRecord =  {
            $set: {
                title: titleSentFromClient,
                author: authorSentFromClient,
                publisher: publisherSentFromClient,
                yearPublished: yearPublishedSentFromClient, 
                isbn: isbnSentFromClient
                
                // put counter-spell in ""s because 
                //JSON has issues with hyphens - so this way, it won't cause issues when use the hyphen
            }
        };
    });


app.delete("/delete-record", async function(req, res) { 

        var deleteID = req.body.id;
        var deleteID2 = ObjectId.createFromHexString(deleteID);

        //3. Create search with MongoID
        const search = {_id: deleteID2};
        try{
            const conn = await client.connect();
            const db = conn.db("library");
            const coll = db.collection('bookTable');

            await coll.deleteOne(search);

            await conn.close();
            return res.json({msg: "SUCCESS"});
        } catch(err) {
            return res.json({msg: "Error: " + err});        
        }
});

}

module.exports = services;