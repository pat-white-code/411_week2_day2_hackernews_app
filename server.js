const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));
const port = process.env.PORT || 8080;

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, ()=>{
  console.log(`server.js listening on ${port}`)
});