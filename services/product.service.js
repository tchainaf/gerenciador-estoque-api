var config = require('../config.json');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('products');

var service = {};

service.getById = getById;
service.getAll = getAll;
service.create = create;
//service.update = update;
service.delete = _delete;

module.exports = service;

function getById(id) {
    var deferred = Q.defer();

    db.products.findById(id, function (err, product) {
        if (err)
            deferred.reject(err.name + ': ' + err.message);

        deferred.resolve();
    });

    return deferred.promise;
}
function create(product) {
    console.log(product);
    var deferred = Q.defer();

    db.products.insert(
        product,
        function (err) {
            if (err) {
                console.log(err);
                deferred.reject(err.name + ': ' + err.message);
            }

            deferred.resolve();
        });
    return deferred.promise;
}
function _delete(id) {
    var deferred = Q.defer();

    db.products.remove(
        { id: mongo.helper.toObjectID(id) },
        function (err) {
            if (err)  {
            console.log(err);
            deferred.reject(err.name + ': ' + err.message);
            }

            deferred.resolve();
        });

    return deferred.promise;
}
function getAll() {
    var deferred = Q.defer();

    db.products.find({}).toArray(function (err, product) {
        if (err) {
            console.log(err);
            deferred.reject(err.name + ': ' + err.message);
        }
        console.log(product);
            // user not found
            deferred.resolve(product);
        
    });

    return deferred.promise;
}