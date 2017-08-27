const express = require('express');
const bookRouter = express.Router();

let books = [
    {
        title: 'Fight Club',
        author: ' Chuck Palahniuk',
        read: true
    },
    {
        title: 'Catch 22',
        author: 'Joseph Heller',
        read: true
    },
    {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        read: false
    }
];

bookRouter.route('')
    .get(function (req, res) {
        res.render('booksListView', {
            title: 'Hello from books',
            nav: [{
                Link: '/books',
                Text: 'Books'
            }, {
                Link: '/authors', Text: 'Authors'
            }],
            books: books
        });
    });

bookRouter.route('/:id')
    .get(function (req, res) {
        let id = req.params.id;
        res.render('bookView', {
            title: 'Hello from books',
            nav: [{
                Link: '/books',
                Text: 'Books'
            }, {
                Link: '/authors', Text: 'Authors'
            }],
            book: books[id]
        });
    });

module.exports = bookRouter;