const express = require('express');
const app = express();


// setup public directory

app.use(express.static(__dirname + 'public'));

