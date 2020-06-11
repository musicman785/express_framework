// Variable that requies the express framework
const express = require("express");
//Variable that requires the path module
const path = require("path");
//variable that requires fs module
const fs = require("fs");

// variable instanciates express framework
const app = express();
//variable holds port number for server
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());






// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
