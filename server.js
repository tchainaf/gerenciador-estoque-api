var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var api = express();
var port = process.env.PORT || 3000;

api.use(cors());

api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

// Mapeamento das rotas da aplicação
api.use('/api/product', require('./controllers/product.controller'));

// Start server API
var serverAPI = api.listen(port, function () {
    console.log('Server API listening at http://' + serverAPI.address().address + ':' + serverAPI.address().port);
});