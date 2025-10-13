var jsonObject = JSON.parse(data);

main();

function main() {
    console.log(jsonObject);
    console.log(jsonObject.length);
    console.log(JSON.stringify(jsonObject));

    showTable();
                }

function showTable() {
    var htmlString = "";

    for(var i=0; i<jsonObject.length; i++) {
        htmlString += "<tr>";
            htmlString += "<td>" + jsonObject[i].ID + "</td>";
            htmlString += "<td>" + jsonObject[i].bookTitle + "</td>";
            htmlString += "<td>" + jsonObject[i].author + "</td>";
            htmlString += "<td>" + jsonObject[i].publisher + "</td>";
            htmlString += "<td>" + jsonObject[i].yearPublished + "</td>";
            htmlString += "<td>" + jsonObject[i].isbn + "</td>";
        htmlString += "</tr>";
    }

    var tableBodyObj = document.getElementById("libraryTable");

    tableBodyObj.innerHTML = htmlString;
    
	
	//I'm assuming it shouldn't be pre-populated?  (Like using the below list for ex. from lab 3.3)  
	//I'm assuming that we should populate it from the enter data page, and then it shows up on the view data page?
	
	var anotherBook = {};
    anotherBook.ID = "58";
    anotherBook.bookTitle = "More Fun with JSON";
    anotherBook.author = "Jebidiah";
    anotherBook.publisher="Stifler's Mom";
    anotherBook.yearPublished="2025";
    anotherBook.isbn="987654";

    jsonObject.push(anotherBook);

    showTable();
}
