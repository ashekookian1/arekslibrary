// var jsonObject = [{"ID":"lib: 1606248331027", "bookTitle":"Dracula", "author":"Bram Stoker", "publisher": "Random House", 
// "yearPublished": "1897", "isbn":"0-571-05686-5"},

// {"ID":"lib: 1606248433134", "bookTitle": "Frankenstein", "author":"Mary Shelly","publisher":"Pearson","yearPublished":"1818","isbn":"9780134801155"},

// {"ID":"lib: 1606248476038", "bookTitle": "Crime and Punishment", "author":"Fyodor Dostoyevsky", "publisher":"Norton", "yearPublished":"1866","isbn":"9781718198456"},

// {"ID":"lib: 1606431028909", "bookTitle": "Vanity Fair", "author":"William Makepeace Thackery", "publisher":"Faber and Faber", "yearPublished":"1848","isbn":"53163540"},

// {"ID":"lib: 1606431056850","bookTitle": "Angela's Ashes", "author": "Frank McCourt", "publisher": "Norton", "yearPublished":"1996","isbn":"9798676487225"}];

retrieveData();

function retrieveData() {
        
    fetch(libraryURL + "/get-records", { //get the data from the database
        method: "GET"
    })

    .then(response => {  // sending the response to an unnamed function
    
        if(!response.ok){ // if response is not ok, then throw the below error message
            throw new Error("Network Error: " + response.statusText);
        }

        return response.json();
    })

    .then(data => {
        console.log(data.libraryData);
        if(data.msg === "SUCCESS") { 
            console.log("Testing");
            showTable(data.libraryData)

        }
    })

    .catch(err => {
        alert("Error: " + err);
    });

}


function showTable(jsonObject) {
    var htmlString = "";

    for(var i=0; i<jsonObject.length; i++) {
        htmlString += "<tr>";
           
            // htmlString += "<td>" + jsonObject[i].id + "</td>";
            htmlString += "<td>" + jsonObject[i].bookTitle + "</td>";
            htmlString += "<td>" + jsonObject[i].author + "</td>";
            htmlString += "<td>" + jsonObject[i].publisher + "</td>";
            htmlString += "<td>" + jsonObject[i].yearPublished + "</td>";
            htmlString += "<td>" + jsonObject[i].isbn + "</td>";
            //htmlString += "<td> </td>";  

           htmlString += "<td><button class='delete-button' data-id='"+ jsonObject[i]._id + "'>Delete</button></td>"; 
           //part 2 of create a delete button???
           // <button style="font-size: 20px" id="submitBtn" >Delete</button> - HTML how to create a delete button

        htmlString += "</tr>";
    }

    document.getElementById("libraryTable").innerHTML = htmlString;
    
    activateDelete();
}

function activateDelete() {
    // Capture all html items tagged with the delete-button class
    const deleteButtons = document.querySelectorAll('.delete-button');

    //Loop through all the deleteButtons and create a listener for each one
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const deleteID = this.getAttribute("data-id");  // <-- from the html button object
            handleDelete(deleteID);  //You will write this function.
        });
    });
}

function handleDelete(deleteId) {
    var deleteBookId = { id: deleteId };
    fetch(libraryURL + "/delete-record", {   
        method: "DELETE",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(deleteBookId)
    })

    .then(response => {
        if(!response.ok) {
            throw new Error("Network response was not ok: " + response.statusText);
        }

        return response.json();
    })

    .then(data => { 
        if(data.msg === "SUCCESS"){
            retrieveData();
        }else{
            console.log(data.msg)
        }
    })
    .catch(error => {
         console.log("There is an error" + error);
    });


}
