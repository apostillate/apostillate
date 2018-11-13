//
const path = require('path');
const express = require('express');
const app = module.exports = express();
//
app.use((express.static(path.join(__dirname, '../../client'))));
app.use('/auth', require('./auth'));
app.all('*', (req, res) => {
	console.log(req.sessionID);
    res.sendFile('/client/index.html', {
        root: '../'
    });
});
