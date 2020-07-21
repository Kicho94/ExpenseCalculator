const express = require('express');
const products = require('../handlers/products');
const bodyParser = require('body-parser');
var jwt = require('express-jwt');
var cors = require('cors');
const config = require('../config/index.js');
const db = require('../db/connection');

var c = config.getConfig("db");

const api = express();
db.init(c);

api.use(bodyParser.json());
api.use(cors());
api.use(
    jwt( { 
            secret: config.getConfig('jwt').key
         })
       );
            

api.get('/api/v1/products/', products.getAll);
api.get('/api/v1/products/:id', products.getOne);
api.post('/api/v1/products/', products.save);
api.put('/api/v1/products/:id', products.replace);
api.patch('/api/v1/products/:id', products.update);
api.delete('/api/v1/products/:id', products.remove);

api.listen(8080, err => {
    if(err){
        console.log('Could not start server');
        console.log(err);
        return;
    }
    console.log('Server started sucessfully on port 8080');
});