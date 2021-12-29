// import modules
const express = require('express');
const fs = require('fs');
const path = require('path');

//port config
const PORT = process.env.PORT || 3001;

const notes = require('./db/db.json')

// express app

const app = express();

// express public directory
public = app.use(express.static('public'))
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// GET /notes 
app.get('/notes', (req,res) =>{
    res.sendFile('notes.html', { root: './public' });
})

// GET *
app.get('/', (req,res) =>{
    res.sendFile('index.html', { root: './public' });
})

// GET /api/notes read all file in db

app.get('/api/notes' ,(req,res) => {
    res.json(notes)
})


// POST /api/notes for receive a new note to save on the request body, add it to the db.json file
function createNewNote(body,notesArray) {
    const note = body;
    notesArray.push(note)
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;

}

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const note = createNewNote(req.body, notes)
    res.json(note)
})
  


// server port 3001

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
  