const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const mongodb = require('./data/database');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
    'Z-Key',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS',
  );
  next();
});
app.use('/', require('./routes/index'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Database initialized!!');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
});
