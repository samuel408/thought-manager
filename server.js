const { notes } = require('./db/db.json')
// const apiRoutes = require('./routes/apiRoutes.js')

const fs = require('fs');
const path = require('path');
const express =  require('express');
const PORT = process.env.PORT || 3002;
const app = express();



app.use(express.static('public'));

require('./routes/apiRoutes')(app)
  


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
 