const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const mongodb = require('./data/database');

app.use('/', require('./routes/index'));

mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    } else {
        console.log('Database initialized!!');
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }
})
