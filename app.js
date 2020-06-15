// Variable that requies the express framework
const express = require("express");
//Variable that requires the path module
const path = require("path");
//variable that requires fs module
const fs = require("fs");
//Parses incoming requests with JSON
const { json } = require("express");

// variable instanciates express framework
const app = express();
//variable holds port number for server or environment
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Uses express static method for index.js and css folders
app.use(express.static(path.join(__dirname, "public")));

// API call routes
// =============================================================
// Shows all notes in db.json object array requested
app.get("/api/notes", (req, res) => {
    //Holds access  of db.json array
    fs.readFile(__dirname + "/db/db.json", (err, data) => {
        if (err)
            throw err;
    //Holds value of data from array and converts is to parse
        let noteData = JSON.parse(data);
    //Returns data to browser as json object
        res.json(noteData);
    })

});
 //Shows single note in db.json object array
app.get("/api/notes/:Title", (req, res) => {
    //Holds access  of db.json array
    fs.readFile(__dirname + "/db/db.json", (err, data) => {
        if (err)
            throw err;
        //Holds value of data from array and converts is to parse
        let noteData = JSON.parse(data);
        // Loops through notes db and locates note requested by browser
             notes =  noteData.filter(note => {
        
            return note.Title.toLowerCase() === req.params.Title.toLowerCase();
        
        });
        //Returns data to browser as json object
        res.json(notes);
    })
     
});

//API POST call routes 
//===============================================================
// This call Takes new notes input
app.post("/api/notes", (req, res) => {

 //Holds access  of db.json array 
 fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {
        if (err)
            throw err;
       //Returns data to browser as json object
        let notes = JSON.parse(data)
        // Holds value of new input from the user creates id# dynamically
        let newNote = {
            id: notes.length + 1,
            title: req.body.title,
            text: req.body.text
        }
        //adds new input to the db.json array
        notes.push(newNote);


        // Writes new file with added input along with previous objects
        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), (err, data) => {
            if (err)
                throw err;
                //Returns new data to browser as json object
                res.json(notes);
            
        })
    })

});
//Api call that is used to delete current note objects 
app.delete("/api/notes/:id", (req, res) => {
    
    
    //Holds access  of db.json array 
    fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {
        if (err)
            throw err;

           
            //Returns data to browser as json object 
            let notes = JSON.parse(data);
           // Stores element that is deleted in constant note
            const note = notes.find(n => n.id === parseInt(req.params.id)); 
           //Grabs the position of the note we are deleting. i.e index[2] 
            const index = notes.indexOf(note);
            //Removes note based on index called
            notes.splice(index, 1);

         
        
     // Writes new file with added input along with previous objects        
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), (err, data) => {
                if (err)
                    throw err;
                
                    res.json(notes);
                
            })
            

    })

});

// Routes  Question: Do I need a 404 error route?
// =============================================================
//Route sends back notes.html to the browser
app.get("/notes", (req, res) => {
    res.sendFile(__dirname + "/public/notes.html");
});
//Route sends back index.html to the browser
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})
// Route for CSS folder
app.get("/notes", (req, res) => {
    res.sendFile(__dirname + "/public/assets/css/styles.css")
});
//Route for index.js folder
app.get("/notes", (req, res) => {
    res.sendFile(__dirname + "/public/assets/js/index.js")
});




// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
