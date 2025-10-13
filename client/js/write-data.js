const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", function(event) {
    
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

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", function(event) {


    $("book_title").val("");
    $("author").val("");
    $("publisher").val("");
	$("year_published").val("");
	$("isbn").val("");

   event.preventDefault();
   
});