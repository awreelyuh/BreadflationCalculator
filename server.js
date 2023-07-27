'use strict'
const express = require('express');
const app = express();

app.use(express.json());

let router = express.Router();

router.get('/', (req, res, next) => {
    res.send('Hello World!');
});

app.use('/api/', router);

app.listen(5000, function () {
    console.log("Node server is listening on port 5000");
});