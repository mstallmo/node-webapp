const express = require('express');
const authRouter = express.Router();
const mongodb = require('mongodb').MongoClient;
const passport = require('passport');

const router = function () {
    authRouter.route('/signUp')
        .post(function(req, res) {
            console.log(req.body);
            const url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function(err, db) {
                const collection = db.collection('users');
                const user = {
                    username: req.body.username,
                    password: req.body.password
                };
                collection.insertOne(user, function (err, results) {
                    req.login(results.ops[0], function() {
                        res.redirect('/auth/profile');
                    });
                });
            });
        });
    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function(req, res) {
            res.redirect('/auth/profile');
        });
    authRouter.route('/profile')
        .get(function(req, res) {
            res.json(req.user);
        });
    return authRouter;
};

module.exports = router;