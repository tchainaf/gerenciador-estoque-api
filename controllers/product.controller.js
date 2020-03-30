var express = require('express');
var router = express.Router();
var productService = require('../services/product.service');

// routes
router.get('/:id', getProduct);

module.exports = router;

function getProduct(req, res) {
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