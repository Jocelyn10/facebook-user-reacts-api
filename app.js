const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

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

app.get('/', (req, res) => {

    console.log("Hello !");
  res.set('Content-Type', 'text/html');
  res.status(200).send('<h1>Hello GFG Learner!</h1>');

  
});

module.exports = app;
