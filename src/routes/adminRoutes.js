const express = require('express');
const adminRouter = express.Router();
const mongodb = require('mongodb').MongoClient;

const books = [
    {
        title: 'Fight Club',
        author: ' Chuck Palahniuk',
        bookId: 5759,
        read: true
    },
    {
        title: 'Catch 22',
        author: 'Joseph Heller',
        bookId: 168668,
        read: true
    },
    {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        read: false
    },
    {
        title: 'Harry Potter And the Sourcerer\'s Stone',
        author: 'J.K. Rawling',
        read: true
    }
];

const router = function (nav) {
    adminRouter.route('/addBooks')
        .get(function (req, res) {
            const url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function(err, db) {
                const collection = db.collection('books');
                collection.insertMany(books, function(err, results) {
                    res.send(results);
                    db.close();
                });
            });
        });
    return adminRouter;
};
module.exports = router;