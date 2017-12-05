
var config = {
  apiKey: "AIzaSyBB37Qku9-DET8z9CO465CDrXlc7wYUm40",
  authDomain: "train-scheduler-e89b4.firebaseapp.com",
  databaseURL: "https://train-scheduler-e89b4.firebaseio.com",
  projectId: "train-scheduler-e89b4",
  storageBucket: "train-scheduler-e89b4.appspot.com",
  messagingSenderId: "763723494227"
};
firebase.initializeApp(config);

var database = firebase.database();

database.ref().once("value", function(snapshot) {
  console.log(snapshot.val());

Object.keys(snapshot.val()).forEach(function(train){
  console.log(snapshot.val()[train].destination,
              snapshot.val()[train].name,
              snapshot.val()[train].frequency,
              snapshot.val()[train].start);
var destination = snapshot.val()[train].destination
var name = snapshot.val()[train].name
var frequency = snapshot.val()[train].frequency
var start = snapshot.val()[train].start

var firstTimeConverted = moment(parseInt(start,10)).subtract(1, "days");
console.log(firstTimeConverted.format("hh:mm"));

var currentTime = moment();
console.log("CURRENT TIME: " + currentTime.format("hh:mm"));

 var futureTime = firstTimeConverted.add(freq * 60 * 25, "minutes");
console.log(futureTime.format("hh:mm"));

 var diffTime = moment().diff(futureTime, "minutes");
 console.log("DIFFERENCE IN TIME: " + diffTime);

 var tMinutesTillTrain = diffTime % frequency;
 console.log(tMinutesTillTrain);

 var nextTrain = moment().add(tMinutesTillTrain, "minutes");
 console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

var nextTrainPretty = moment.unix(nextTrain).format("hh:mm a");

 $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
     frequency + "</td><td>" + nextTrainPretty + "</td><td>" + tMinutesTillTrain + "</td></tr>");
})

})

var firstTrainTime = " ";
var freq = " ";



$("#add-train-btn").on("click", function(event) {

  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var firstTrainTime = moment($("#start-input").val().trim(), "HH:mm").format("X");
  var freq = $("#frequency-input").val().trim();


  var newTrain = {
    name: trainName,
    destination: trainDest,
    start: firstTrainTime,
    frequency: freq,

  };


  database.ref().push(newTrain);


  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);


  alert("Train successfully added");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().start;
  var freq = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(trainDest);
  console.log(firstTrainTime);
  console.log(freq);


});
