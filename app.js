const express = require('express');
const app = express();

let port = 1337;

app.use(express.static('public'));
app.use(express.static('src/views'));

app.get('/', function(req, res) {
    res.send("Hello World");
});

app.get('/books', function (req, res) {
    res.send("Hello Books");
});


app.listen(port, function(err) {
    console.log('Running server on port: ' + port);
});