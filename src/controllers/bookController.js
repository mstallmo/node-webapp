const mongodb = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const bookController = function (bookService, nav) {
    const middleware = function(req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
    };
    const getIndex = function (req, res) {
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
    };
    const getById = function (req, res) {
        const id = new ObjectId(req.params.id);
        const url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function (err, db) {
            const collection = db.collection('books');
            collection.findOne({_id: id}, function (err, results) {
                if (results.bookId) {
                    bookService.getBookById(results.bookId,
                        function(err, book) {
                            results.book = book;
                            res.render('bookView', {
                                title: 'Hello from books',
                                nav: nav,
                                book: results
                            });
                        });
                } else {
                    res.render('bookView', {
                        title: 'Hello from books',
                        nav: nav,
                        book: results
                    });
                }

            });
        });
    };
    return {
        middleware: middleware,
        getIndex: getIndex,
        getById: getById
    };
};

module.exports = bookController;