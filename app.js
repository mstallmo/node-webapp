const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const app = express();

const nav = [{
    Link: '/books',
    Text: 'Books'
}, {
    Link: '/authors', Text: 'Authors'
}];
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

let port = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({secret: 'library'}));
require('./src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', function(req, res) {
    res.render('index', {title: 'Hello from render', nav: nav});
});

app.listen(port, function(err) {
    console.log('Running server on port: ' + port);
});