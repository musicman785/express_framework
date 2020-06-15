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
//variable holds port number for server
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Uses express static method for index.js and css folders
app.use(express.static(path.join(__dirname, "public")));
//Array to hold note objects created



// API call routes
// =============================================================
app.get("/api/notes", (req, res) => {
    fs.readFile(__dirname + "/db/db.json", (err, data) => {
        if (err)
            throw err;
        let noteData = JSON.parse(data);
        res.json(noteData);
    })

});

app.get("/api/notes/:Title", (req, res) => {
    fs.readFile(__dirname + "/db/db.json", (err, data) => {
        if (err)
            throw err;
        
        let noteData = JSON.parse(data);
        
             notes =  noteData.filter(note => {
        
            return note.Title.toLowerCase() === req.params.Title.toLowerCase();
        
        });
        res.json(notes);
    })
     
});

// Question: why is the array notes being overwritten? 

//API POST call routes 
//===============================================================
app.post("/api/notes", (req, res) => {

  
 fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {
        if (err)
            throw err;

        let notes = JSON.parse(data)
        
        let newNote = {
            id: notes.length + 1,
            title: req.body.title,
            text: req.body.text
        }
        
        notes.push(newNote);



        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), (err, data) => {
            if (err)
                throw err;
                res.json(notes);
            
        })
    })

});
app.delete("/api/notes/:id", (req, res) => {
    
    
    
    fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {
        if (err)
            throw err;

           
             
            let notes = JSON.parse(data);
           
            const note = notes.find(n => n.id === parseInt(req.params.id)); 
            
            const index = notes.indexOf(note);

            notes.splice(index, 1);

         
        
            
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), (err, data) => {
                if (err)
                    throw err;
                
                    res.json(notes);
                
            })
            

    })

});

// Routes  Question: Do I need a 404 error route?
// =============================================================
app.get("/notes", (req, res) => {
    res.sendFile(__dirname + "/public/notes.html");
});

app.get("*", (req, res) => {
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
