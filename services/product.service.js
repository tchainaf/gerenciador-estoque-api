var config = require('../config.json');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('products');

var service = {};

service.getById = getById;

module.exports = service;

function getById(_id) {
    var deferred = Q.defer();

    db.products.findById(_id, function (err, product) {
        if (err)
            deferred.reject(err.name + ': ' + err.message);

        deferred.resolve();
    });

    return deferred.promise;
}