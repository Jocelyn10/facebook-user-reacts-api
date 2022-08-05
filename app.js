const express = require('express');
const bodyParser = require('body-parser');

import cors from 'cors';

const app = express();

// Routes
const athleteRoutes = require('./routes/athlete');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
); 
app.use(bodyParser.json());

app.use('/api/athlete', athleteRoutes);

module.exports = app;
