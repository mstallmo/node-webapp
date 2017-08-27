const express = require('express');
const bookRouter = express.Router();

const router = function (nav) {

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

    bookRouter.route('/')
        .get(function (req, res) {
            res.render('bookListView', {
                title: 'Hello from books',
                nav: nav,
                books: books
            });
        });

    bookRouter.route('/:id')
        .get(function (req, res) {
            let id = req.params.id;
            res.render('bookView', {
                title: 'Hello from books',
                nav: nav,
                book: books[id]
            });
        });
    return bookRouter;
};
module.exports = router;