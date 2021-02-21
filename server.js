const { notes } = require('./db/db.json')

// const fs = require('fs');
// const path = require('path');
const express =  require('express');
const app = express();

// // parse incoming string or array data
// app.use(express.urlencoded({ extended: true }));
// // parse incoming JSON data
// app.use(express.json());


// app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(notes);
});


app.listen(3002, () => {
    console.log(`API server now on port 3002!`);
  });