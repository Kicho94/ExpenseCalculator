const express = require('express');
const bodyParser = require('body-parser');
var jwt = require('express-jwt');
var cors = require('cors');
const config = require('../config/index.js');
const db = require('../db/connection');
const auth = require('../handlers/auth');
// const path = require('path');
var c = config.getConfig("db");
db.init(c);


var api = express();

api.use(bodyParser.json());
api.use(cors());
api.use(
    jwt( {secret: config.getConfig('jwt').key} )
    .unless(
        { path: ['/api/v1/register', '/api/v1/login', '/api/v1/confirm/:confirm_hash', '/api/v1/reset-password', '/api/v1/reset-link']}
    )
);


api.post('/api/v1/register', auth.register);
api.post('/api/v1/login', auth.login);
api.get('/api/v1/renew', auth.renew);
api.post('/api/v1/reset-link', auth.resetLink);
api.post('/api/v1/reset-password', auth.resetPassword);
api.post('/api/v1/change-password', auth.changePassword);
api.post('/api/v1/confirm/:confirm_hash', auth.confirm)
api.patch('/api/v1/update-user', auth.updateUser)
api.get('/api/v1/user-info', auth.getUser)




api.use(function(err, req, res, next) {
    if(err.name === 'UnauthorizedError'){
        res.status(401).send({error : 'Invalid token'});
    } else {
        next(err);
    }
});

api.listen(8081, err => {
    if(err){
        console.log('Could not start server');
        console.log(err);
        return;
    }
    console.log('Server started on port 8081');
});