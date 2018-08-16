//* REPLACE BELOW ONLY **********************************

var config = {
    apiKey: "AIzaSyBWR20EyufE7JpEnysVcrqc7iPMl194HVw",
    authDomain: "trainschedule-4a867.firebaseapp.com",
    databaseURL: "https://trainschedule-4a867.firebaseio.com",
    projectId: "trainschedule-4a867",
    storageBucket: "trainschedule-4a867.appspot.com",
    messagingSenderId: "681428300794"
};
firebase.initializeApp(config);

//* REPLACE ABOVE ONLY **********************************

var database = firebase.database();

$("h1").html(`<a href="${config.databaseURL}">Link to your database</a>`)

$("#click").on("click", function () {
    event.preventDefault();

    var name = $("#trainName").val().trim();
    var dest = $("#trainDest").val().trim();
    var time = $("#trainTime").val().trim();
    var freq = $("#trainFreq").val().trim();

    var trainschedule = {
        Train_Name: name,
        Train_Destination: dest,
        Train_First_Time: time,
        Train_Frequency: freq,
        serverAdd: firebase.database.ServerValue.TIMESTAMP
    };

    database.ref().push(trainschedule);
});

database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var addTrain = snapshot.val();
    var tFrequency = addTrain.Train_Frequency; //Frequency of Stops
    var firstTime = addTrain.Train_First_Time; //First Run of the Day
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years"); // Convert First run to Hours:Minutes
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes"); // Calculate the difference between Hours:Minutes of current time and first time
    var tRemainder = diffTime % tFrequency; // Modulus the difference in time (NOW) and frequency of the train to get the remaining time difference
    var tMinutesTillTrain = tFrequency - tRemainder; //Frequency minus the remaining minutes give the time till train arrive
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format('HH:mm'); //add the min is away from to the current time toget the final time train will arrive

    // $('tbody').empty()
    $('tbody').append(`
            <tr id="column">
            <td>${addTrain.Train_Name}</td>
            <td>${addTrain.Train_Destination}</td>
            <td>Every ${addTrain.Train_Frequency} Minutes</td>
            <td>${nextTrain}</td>
            <td>${tMinutesTillTrain}</td>
            </tr>`)

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


setInterval(function () {
    if (moment().get('second') % 10 == 0) {
        update()
    }
    else {
        console.log(moment().get('seconds'))
    }

}, 1000);