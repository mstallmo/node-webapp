const http = require('https');
const xml2js = require('xml2js');
const parser = xml2js.Parser({explicitArray: false});

const goodreadsService = function () {

    const getBookById = function (id, cb) {

        const url = 'https://www.goodreads.com/book/show/' + id + '.xml?key=6Wx1gqy5TPkzqpO9btupyA';

        const callback = function(response) {
            let str = '';

            response.on('data', function(chunk) {
                str += chunk;
            });
            response.on('end', function() {
                console.log(str);
                parser.parseString(str, function(err, result) {
                    cb(null, result.GoodreadsResponse.book);
                });
            });
        };
        http.request(url, callback).end();
    };

    return {
        getBookById: getBookById
    };
};

module.exports = goodreadsService;