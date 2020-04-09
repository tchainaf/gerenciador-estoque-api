var config = require('../config.json');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('products');

var service = {};

service.getById = getById;
service.getAll = getAll;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function getById(id) {
    var deferred = Q.defer();
    db.products.findById(id, function (err, product) {
        if (err) {
            console.log(err);
            deferred.reject(err.name + ': ' + err.message);
        }
        deferred.resolve(product);
    });
    return deferred.promise;
}

function create(product) {
    var deferred = Q.defer();
    db.products.insert(
        product,
        function (err) {
            if (err) {
                console.log(err);
                deferred.reject(err.name + ': ' + err.message);
            }
            deferred.resolve("Salvo");
        });
    return deferred.promise;
}

function _delete(id) {
    var deferred = Q.defer();
    db.products.remove(
        { _id: mongo.helper.toObjectID(id) },
        function (err) {
            if (err) {
                console.log(err);
                deferred.reject(err.name + ': ' + err.message);
            }
            deferred.resolve("Deletou!");
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
        deferred.resolve(product);
    });
    return deferred.promise;
}

function update(id, product) {
    var deferred = Q.defer();
    db.products.update(
        { _id: mongo.helper.toObjectID(id) },
        product,
        function (err) {
            if (err) {
                console.log(err);
                deferred.reject(err.name + ': ' + err.message);
            }
            deferred.resolve("Atualizado!");
        });
    return deferred.promise;
}