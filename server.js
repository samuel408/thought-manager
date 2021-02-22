const { notes } = require('./db/db.json')

const fs = require('fs');
const path = require('path');
const express =  require('express');
const PORT = process.env.PORT || 3002;
const app = express();



app.use(express.static('public'));

function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if (query.title) {
      filteredResults = filteredResults.filter(notes => notes.title === query.title);
    }
   
    return filteredResults;
  }
function createNewNote(body, noteArray) {
  const note = body;
  noteArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify({notes: noteArray}, null, 2)
  );
  return note;
}
  app.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });
  

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
 module.exports = {createNewNote};