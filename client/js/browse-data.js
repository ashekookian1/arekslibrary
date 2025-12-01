var libraryData = [];
var currentRecord = 0;  


var app = angular.module("browseBooksApp", []);

app.controller('browseBooksCtrl', function($scope, $http){

    $scope.get_records = function() {
        $http({
            method: "get",
            url: libraryURL + "/get-records" 
        }).then(function(response) {
            //this is where we go if a connection is successful
            if(response.data.msg === "SUCCESS") {
                libraryData = response.data.libraryData;
                $scope.obj = libraryData[currentRecord];  // defaults to 0 with the first book
                $scope.showHide();
            }
        }, function(error) {
            alert(error); //if we can't connect to the server
        });
    }

    $scope.get_records();

    $scope.changeRecord = function(direction) {
        currentRecord += direction;
        $scope.obj = libraryData[currentRecord];
        $scope.showHide();
    };

    $scope.showHide = function() { // not working!!!!!
        $scope.hidePrev = (currentRecord === 0) ? true : false;  // so you don't keep clicking and getting blanks before the books array starts
        $scope.hideNext = (currentRecord === libraryData.length-1) ? true : false; // same as above but for after end
    }
});
