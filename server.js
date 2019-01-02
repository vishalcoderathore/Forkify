const express = require('express');
const path = require('path');

//Create our App
var app = express();
const PORT = process.env.PORT || 8080;
const publicPath = path.join(__dirname, 'dist');

const dotenv = require('dotenv');
dotenv.config();

app.use(function (req, res, next){
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});


//use() lets to add functionality to our express app
//static requires a folder location, in our case its public
app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

//start the server
app.listen(PORT, function() {
    console.log('Express server is up on port ' + PORT);
});