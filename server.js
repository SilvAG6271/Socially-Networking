//importing all required files
const express = require('express');
const routes = require('./routes');
const db = require('./config/connection');
const path = require('path');

//setting up the port 
const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
//listening to port
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });