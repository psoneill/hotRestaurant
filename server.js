// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3400;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Star Wars Characters (DATA)
// =============================================================
var Reservation = function(customerName,phoneNumber,customerEmail,customerID) {
    this.customerName = customerName;
    this.phoneNumber = phoneNumber;
    this.customerEmail = customerEmail;
    this.customerID = customerID;
  }
  var reservationList = [];
  for (let index = 0; index < 10; index++) {
    var newReservation = new Reservation("test"+index,"999 111-2222","test@gmail.com","test"+index);
    reservationList.push(newReservation);
  }
  
  console.log(reservationList);
// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
// app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "view.html"));
// });
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });
app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "makeReservation.html"));
});
app.get("/view", function(req, res) {
    res.sendFile(path.join(__dirname, "viewReservations.html"));
  });
// Displays all characters
app.get("/api/tables", function(req, res) {
  return res.json(reservationList);
});
// Displays a single character, or returns false
app.get("/api/waitlist", function(req, res) {
  var waitList = [];
  for (var i = 0; i < reservationList.length; i++) {
    if (i > 4) {
      waitList.push(reservationList[i]);
    }   
  }
  return res.json(waitList);
});

// Create New Characters - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;
  console.log(newReservation);
  reservationList.push(newReservation);
  res.json(newReservation);
});
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});