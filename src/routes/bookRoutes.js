const express = require('express');
const bookRouter = express.Router();
const mongodb = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const router = function (nav) {
    bookRouter.route('/')
        .get(function (req, res) {
            const url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                const collection = db.collection('books');
                collection.find({}).toArray(
                    function (err, results) {
                        res.render('bookListView', {
                            title: 'Hello from books',
                            nav: nav,
                            books: results
                        });
                    });
            });
        });

    bookRouter.route('/:id')
        .get(function (req, res) {
            const id = new ObjectId(req.params.id);
            const url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                const collection = db.collection('books');
                collection.findOne({_id: id}, function (err, results) {
                        res.render('bookView', {
                            title: 'Hello from books',
                            nav: nav,
                            book: results
                        });
                    });
            });
        });
    return bookRouter;
};
module.exports = router;