var express = require('express');
var router = express.Router();
var productService = require('../services/product.service');

// routes dois get do produto, id e all
// put delete post, dois gets

router.get('/all', getAllProduct);
router.get('/:id', getProduct);
router.delete('/:id', deleteProduct);
router.post('/', registerProduct);
router.put('/:id', updateProduct);

module.exports = router;

function getProduct(req, res) {
    console.log("TESTE")
    console.log(req.params.id)
    productService.getById(req.params.id)
        .then(function (product) {
            if (product) {
                res.send(product);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function getAllProduct(req, res) {
    productService.getAll()
        .then(function (product) {
            if (product) {
                res.send(product);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function deleteProduct(req, res) {
    productService.delete(req.params.id)
        .then(function (product) {
            if (product) {
                res.send(product);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function registerProduct(req, res) {
    productService.create(req.body)
        .then(function (product) {
            if (product) {
                res.send(product);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
