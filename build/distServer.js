'use strict';

// allows final prod version of app to be run locally for review
import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

/* eslint-disable no-console */

const port = 3000;
const app = express();

app.use(compression()); // enable gzip compression
app.use(express.static('dist')); // add support to express for serving static files

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.get('/users', (req, res) => {
  // hard coding for simplicity; pretend this hits real db
  res.json([
    { id: 1, firstName: "Bob", lastName: "Smith", email: "bob@gmail.com" },
    { id: 2, firstName: "Tammy", lastName: "Norton", email: "tnorton@yahoo.com" },
    { id: 3, firstName: "Tina", lastName: "Lee", email: "lee.tina@hotmail.com" }
  ]);
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  }
  else {
    open(`http://localhost:${port}`);
  }
});
