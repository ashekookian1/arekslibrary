const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", function(event) {
    //alert("Submit Button Pushed");

    var bookTitle = document.getElementById("bookTitle").value;
    var bookTitle = document.getElementById("author").value;
    var bookTitle = document.getElementById("publisher").value;
    var bookTitle = document.getElementById("yearPublished").value;
    var bookTitle = document.getElementById("isbn").value;

    if(!bookTitle || !author || !publisher || !yearPublished || !isbn) {
        alert("Please fill in all fields before submitting!"); 
        return;
    }

    var jsonObject = {
        bookTitle: bookTitle,  // left of the colon is the variable name, right of it is the actual value - it will get and save the variable when you type it in on the enter data page
        author: author,
        publisher: publisher,
        yearPublished: yearPublished,
        isbn: isbn
    }

    //Send data through a fetch
    fetch(libraryURL + "/write-record", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonObject)
    })
    .then(response => {  // sending the response to an unnamed function
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
    })
});

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", function(event) {


    $("book_title").val("");
    $("author").val("");
    $("publisher").val("");
	$("year_published").val("");
	$("isbn").val("");

   event.preventDefault();

    
	// the below uses pure JavaScript to get the value in the input button
    const firstTextBox = document.getElementById("book_title");
    const secondTextBox = document.getElementById("author");
	const thirdTextBox = document.getElementById("publisher");
	const fourthTextBox = document.getElementById("year_published");
	const fifthTextBox = document.getElementById("isbn");

    var first = firstTextBox.value;
    var second = secondTextBox.value;
	var third = thirdTextBox.value;
	var fourth = fourthTextBox.value;
	var fifth = fifthTextBox.value;

    //the below uses jQuery uses pure JavaScript to get the value in the input button
   // var third = $('#input3').val();

    

    alert("Submit button was pressed.");

    event.preventDefault();
   
});