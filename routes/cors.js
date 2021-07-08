const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['http://localhost:3000','http://localhost:5500' , 'https://localhost:3443', 'http://127.0.0.1:3000', 'http://127.0.0.1:5000', 'http://127.0.0.1:5500','https://book-finder-dsp.herokuapp.com','https://book-finder-dsp.netlify.app','https://bookfinder-frontend.herokuapp.com'];
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);