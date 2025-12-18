//1.  Define angular app
var app = angular.module("libraryDataApp", []);

//2.  Create the controller and populate with the functions needed
app.controller('libraryDataCtrl', function ($scope, $http) {
    $scope.libraryData = [];
   
    $scope.get_records = function() {
        $http({
            method : "get",
            url : libraryURL + "/get-records"
        }).then(function(response) {
            if(response.data.msg === "SUCCESS") {
                // spellTableData = response.data.spells;
                $scope.libraryData = response.data.libraryData;
                
            } else {
                console.log(response.data.msg);
            }
        }, function(response) {
            alert(response);
            console.log("I failed");
        });
    };

    $scope.redrawTable = function() {
        var type = $scope.selectedType.value;
        console.log("redraw");
        $http({
            method : "get",
            url : libraryURL + "/get-records",
            params: {type: type}
        }).then(function(response) {
            if(response.data.msg === "SUCCESS") {
				console.log("here");
                // spellTableData = response.data.spells;
                $scope.libraryData = response.data.libraryData;
            } else {
                console.log(response.data.msg);
            }
        }, function(response) {
            alert(response);
            console.log("I failed");
        });
    }

    

    $scope.editBook = function(editBook) {
        $scope.title = $scope.libraryData[editBook].title;
        $scope.author = $scope.libraryData[editBook].author;
        $scope.publisher = $scope.libraryData[editBook].publisher;
        $scope.yearPublished = $scope.libraryData[editBook].yearPublished;
        $scope.isbn = $scope.libraryData[editBook].isbn;

        // console.log("editBook set: " + $scope.editBook);
        $scope.hideTable = true;
        $scope.hideForm = false;
    }

    $scope.updateBook = function() {
        if($scope.title === "" || $scope.author === "" || $scope.publisher === "" 
            || $scope.yearPublished === "" || $scope.isbn === "") {
            $scope.addResults = "Please fill in all fields.";
            return;
        }
$scope.cancelUpdate = function() {
		$scope.hideForm = true;
		$scope.hideTable = false;
}

        // console.log("Edit completed successfully check: " + $scope.editBook);

        $http({
            method : "PUT",
             url : libraryURL + "/write-data",
             data: {
                "title": $scope.title,
                "author": $scope.author,
                "publisher": $scope.publisher,
                "yearPublished": $scope.yearPublished,
                "isbn": $scope.isbn
            }
        }).then(function(response) {
            if(response.data.msg === "SUCCESS") {
                $scope.hideForm = true;
                $scope.hideTable = false;

                $scope.redrawTable();
                
                $scope.title = "";
                $scope.author = "";
                $scope.publisher = "";
                $scope.yearPublished = "";
                $scope.isbn = "";
            } else {
                $scope.addResults = response.data.msg;
            }
        }, function(response) {
            alert(response);
            console.log("I failed");
        });

    }

    $scope.get_records();
});

//A handy function we will use to get the list of types
function getTypes(libraryData) {
    var typeExists;  //This is used to prevent duplicates

    typesArray = [{value:"", display:"ALL"}];
	
	//Loop through the JSON array returned from the server
    for(var i=0; i<libraryData.length; i++) {
		//Check to see if the type in the ith record has already been captured
        typeExists = typesArray.find(function(element) {
            return element.value === libraryData[i].type;
        })    
        if(typeExists) {
            continue;  //If already captured, move on to next element
        } else {
			//If not captured, add the type and uppercase type to the types array
            typesArray.push({value: libraryData[i].type, display: libraryData[i].type.toUpperCase()});
        }
    }

    return typesArray
}

//retrieveData();

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

function deleteData() {
        
    fetch(libraryURL + "/delete-records", { //get the data from the database
        method: "DELETE"
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
// this (below) is what was there before the angular addition


// function showTable(jsonObject) {
//     var htmlString = "";

//     for(var i=0; i<jsonObject.length; i++) {
//         htmlString += "<tr>";
           
//             // htmlString += "<td>" + jsonObject[i].id + "</td>";
//             htmlString += "<td>" + jsonObject[i].bookTitle + "</td>";
//             htmlString += "<td>" + jsonObject[i].author + "</td>";
//             htmlString += "<td>" + jsonObject[i].publisher + "</td>";
//             htmlString += "<td>" + jsonObject[i].yearPublished + "</td>";
//             htmlString += "<td>" + jsonObject[i].isbn + "</td>";
//             //htmlString += "<td> </td>";  

//            htmlString += "<td><button class='delete-button' data-id='"+ jsonObject[i]._id + "'>Delete</button></td>"; 
//            //part 2 of create a delete button???
//            // <button style="font-size: 20px" id="submitBtn" >Delete</button> - HTML how to create a delete button

//         htmlString += "</tr>";
//     }

//     document.getElementById("libraryTable").innerHTML = htmlString;
    
//     activateDelete();
// }

// function activateDelete() {
//     // Capture all html items tagged with the delete-button class
//     const deleteButtons = document.querySelectorAll('.delete-button');

//     //Loop through all the deleteButtons and create a listener for each one
//     deleteButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             const deleteID = this.getAttribute("data-id");  // <-- from the html button object
//             handleDelete(deleteID);  //You will write this function.
//         });
//     });
// }

// function handleDelete(deleteId) {
//     var deleteBookId = { id: deleteId };
//     fetch(libraryURL + "/delete-record", {   
//         method: "DELETE",
//         headers: { "Content-Type": "application/json"},
//         body: JSON.stringify(deleteBookId)
//     })

//     .then(response => {
//         if(!response.ok) {
//             throw new Error("Network response was not ok: " + response.statusText);
//         }

//         return response.json();
//     })

//     .then(data => { 
//         if(data.msg === "SUCCESS"){
//             retrieveData();
//         }else{
//             console.log(data.msg)
//         }
//     })
//     .catch(error => {
//          console.log("There is an error" + error);
//     });


// }
