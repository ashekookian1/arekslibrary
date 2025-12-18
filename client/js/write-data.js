const submitButton = document.getElementById("submitBtn");
submitButton.addEventListener("click", function(event) {
    // alert("Submit Button Pushed");
event.preventDefault();

    var bookTitle = document.getElementById("bookTitle").value;
    var author = document.getElementById("author").value;
    var publisher = document.getElementById("publisher").value;
    var yearPublished = document.getElementById("yearPublished").value;
    var isbn = document.getElementById("isbn").value;

    if(!bookTitle || !author || !publisher || !yearPublished || !isbn) {
        alert("Please fill in all fields before submitting!"); 
        return;
    }

    var jsonObject = {
        bookTitle: bookTitle,  // left of the colon is the variable name, 
        // right of it is the actual value - it will get and save the variable when you type it in on the enter data page
        author: author,
        publisher: publisher,
        yearPublished: yearPublished,
        isbn: isbn
    }

    //Send data through a fetch
    fetch(libraryURL + "/write-data", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonObject)
    })
    .then(response => {  // sending the response to an unnamed function
        console.log("hello");
        if(!response.ok){ // if response is not ok, then throw the below error message
            throw new Error("Network Error: " + response.statusText);
        }

        return response.json();
    })
    .then(data => {
        alert("Result: " + data.msg);
        if(data.msg === "SUCCESS") {
            document.getElementById("clear").click();
        }
    })
    .catch(error => {
        alert("Error: " + error);  
    });

       
});

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", function(event) {


    $("book_title").val("");
    $("author").val("");
    $("publisher").val("");
	$("year_published").val("");
	$("isbn").val("");

   event.preventDefault();
   
});