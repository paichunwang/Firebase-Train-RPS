// console.log("What button was clicked: " + x) // checking what button was pressed
var id = "15bdf952"
var appKey = "f46dd27595c9f290dd53bcdc138f4b79"
var search;
var queryURL = `https://api.edamam.com/search?q=${search}&app_id=${id}&app_key=${appKey}&from=0&to=3&calories=591-722&health=alcohol-free`

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    //console.log(response) // check the response data param
    console.log(response)
});