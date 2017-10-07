const express = require('express');
const bookRouter = express.Router();

const router = function (nav) {
    const bookService = require('../services/goodreadsService')();
    const bookController = require('../controllers/bookController')(bookService, nav);
    bookRouter.use(bookController.middleware);
    bookRouter.route('/')
        .get(bookController.getIndex);

    bookRouter.route('/:id')
        .get(bookController.getById);
    return bookRouter;
};
module.exports = router;