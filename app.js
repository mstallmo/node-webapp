const express = require('express');
const app = express();

const nav = [{
    Link: '/books',
    Text: 'Books'
}, {
    Link: '/authors', Text: 'Authors'
}];
const bookRouter = require('./src/routes/bookRoutes')(nav);

let port = process.env.PORT || 8080;

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter);

app.get('/', function(req, res) {
    res.render('index', {title: 'Hello from render', nav: nav});
});

app.listen(port, function(err) {
    console.log('Running server on port: ' + port);
});