'use strict'
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//For serving up own API
// let router = express.Router();
// router.get('/', (req, res, next) => {
//     res.send('Hello World!');
// });
// app.use('/api/', router);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    //res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, 'public'));
});

app.listen(port, function () {
    console.log(`Node server is listening on port ${port}`);
});