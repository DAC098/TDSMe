// node modules
const http = require('http');
const https = require('https');
const path = require('path');

// npm modules
const express = require('express');
const React = require('react');
const {renderToString} = require('react-dom/server');

// custom modules
const baseHTML = require('./js/baseHTML.js');

// react elements
const App = require('./react/App.js');

var app = express();

const PORT = process.env.NODE_PORT || 3000;

app.use(express.static("./resources"));

app.get("/",(req,res) => {
    var str = baseHTML(renderToString(React.createElement(App)));
    res.end(str);
});

var server = http.createServer(app).listen(PORT,() => {
    console.log('servering listening on port',PORT);
});
