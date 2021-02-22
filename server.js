const { notes } = require('./db/db.json')

// const fs = require('fs');
// const path = require('path');
const express =  require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// // parse incoming string or array data
// app.use(express.urlencoded({ extended: true }));
// // parse incoming JSON data
// app.use(express.json());


// app.use(express.static('public'));
function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if (query.title) {
      filteredResults = filteredResults.filter(notes => notes.title === query.title);
    }
   
    return filteredResults;
  }

  app.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });