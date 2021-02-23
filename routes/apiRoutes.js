const express = require('express');
const { notes } = require("../db/db.json");
const path = require('path');
const fs = require('fs');


module.exports = function(app) {
    app.use(express.json());

    function filterByQuery(query, notesArray) {
        let filteredResults = notesArray;
        if (query.title) {
          filteredResults = filteredResults.filter(notes => notes.title === query.title);
        }
       
        return filteredResults;
    }
// todo find why 
    function createNewNote(body, noteArray) {
        // console.log(body)
      const note = body;
      noteArray.push(note);
      fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({notes: noteArray}, null, 2)
      );
      return note;
    }

   
    
    app.get('/api/notes', (req, res) => {
        let results = notes;
        if (req.query) {
        results = filterByQuery(req.query, results);
        res.json(results);
    }});

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, './public/index.html'));
    });

    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
    
    

    app.post("/api/notes", (req, res) => {
      const note = createNewNote(req.body, notes);
    //   console.log("notes from post method: ", note)
      res.json(note);
    });
}

