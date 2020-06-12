// Variable that requies the express framework
const express = require("express");
//Variable that requires the path module
const path = require("path");
//variable that requires fs module
const fs = require("fs");
const { json } = require("express");

// variable instanciates express framework
const app = express();
//variable holds port number for server
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Array to hold note objects created
let notes = [];


// API call routes
// =============================================================
app.get("/api/notes", (req, res) => { 
    fs.readFile(__dirname + "/db/db.json", (err, data) => {
        if(err)
        throw err;
        let noteData = JSON.parse(data);
        res.json(noteDAta);
    })
   
});
   
app.post("/api/notes", (req, res) => {
    let newNote = req.body;

    notes.push(newNote);
   
    notes = JSON.stringify(notes);
   
    res.json(JSON.parse(notes));

    fs.writeFile(__dirname + "/db/db.json", notes, (err, data) => {
        if (err) 
        throw err;
        console.log(newNote);
        
    })
    console.log(notes);
  }); 

// Routes Question: Do I need a 404 error route?
// =============================================================
app.get("/notes", (req, res) => {
  res.sendFile(__dirname + "/public/notes.html");
});

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})




  
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
