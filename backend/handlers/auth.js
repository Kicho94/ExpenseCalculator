const mUsers = require('../models/users');
const vUsers = require('../validators/users');
var validator = require('node-input-validator');
var bcrypt = require('bcryptjs');
var jwt = require ('jsonwebtoken');
const config = require('../config/index.js');
const randomstring = require('randomstring');
const sgMail = require('@sendgrid/mail');


const register = (req, res) => {
    console.log(req.body)
    var v = new validator.Validator(req.body, vUsers.createUser);
    v.check()
    .then(matched => {
             if(matched){
            return  mUsers.getUserPasswordByEmail(req.body.email)
            .then((ed)=> {
            if(!ed){
                     console.log('im in')
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(req.body.password, salt, function(err, hash) {
                            if(err){
                                throw new Error(err);
                                return;
                            }
                    var confirm_hash = randomstring.generate({
                        length: 30,
                        charset: 'alphanumeric'
                    });
                       mUsers.createUser(
                          {...req.body, 
                           password : hash,
                            confirm_hash : confirm_hash,
                            confirmed : false
                        });
                        sgMail.setApiKey(config.getConfig('mailer').key);
                        let msg = {
                            to : req.body.email,
                            from : 'kspasovski1@gmail.com',
                            subject : 'Thanks for registering',
                            text : 'Thanks for registering',
                            html : `<strong><p>Hello, please<p/><a href = "http://localhost:8081/api/v1/confirm/${confirm_hash}">click here to confirm your account</a><strong/>`,
                        };
                        sgMail.send(msg);
                        return;
                        });
                        
                    });
                } else if(ed){
                   console.log('Bad Request - User Exists')
                    return res.status(400).send('User exists')
                }
            })
            .catch((err) => {
                console.log(err)
            })
           
            
            }else {
            console.log(Error)
            throw new Error('Validation failed');
        }   
    })
    .then(() => {
        return res.status(200).send('ok');
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send(v.errors)
    })
    
}

const login = (req, res) => {
    mUsers.getUserPasswordByEmail(req.body.email)
    .then((data)=> {
        console.log(data)
        bcrypt.compare(req.body.password, data.password, function(err, rez) {
            if(err){
                return res.status(500).send("could not compare password");
            }
            if(rez){
                var tokenData = {
                    id: data._id,
                    full_name : `${data.first_name} ${data.last_name}`,
                    email: data.email
                };
                
                var token = jwt.sign(tokenData, config.getConfig('jwt').key);
                    
                return res.status(200).send({jwt: token, fullname :`${data.first_name} ${data.last_name}`, confirmed : data.confirmed} )
            }
            return res.status(400).send('Wrong Password');
        });
       
    })
    .catch(err => {
        console.log(err);
        return res.status(404).send('Could not find email')
    });      
}
    
const renew = (req, res) => {
    return res.status(200).send(req.body);
}


const resetLink = (req, res) => {
       mUsers.getUserPasswordByEmail(req.body.email)
        .then((data)=>{
        sgMail.setApiKey(config.getConfig('mailer').key);
        let msg = {
            to : req.body.email,
            from : 'kspasovski1@gmail.com',
            subject : 'Thanks for registering',
            text : 'Thanks for registering',
            html : `<strong><a href = "http://localhost:3000/reset-password/${data.confirm_hash}">Reset-password link</a><strong/>`,
        };
        sgMail.send(msg);
        console.log('zdravo')
        
        
        return res.status(200).send('Reset link sent')
    })
    .catch((err)=>{ console.log(err); return res.status(404).send('Not found')})
    setTimeout(()=>{
        var confirm_hash = randomstring.generate({
            length: 30,
            charset: 'alphanumeric'
        });
        mUsers.updateHash(req.body.email, confirm_hash)
        .then(()=> {console.log('confirm hash changed')})
        .catch(()=> {console.log('something went wrong with the hash')})
    }, 300000)
}


const resetPassword = (req, res) => {
    console.log(req.body.newPassword.length)
    if(req.body.newPassword.length > 2){
    mUsers.getHash(req.body.confirm)
    .then((data)=>{
        console.log(data)
        if(data){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.newPassword, salt, function(err, hash){
            if(err){
                throw new Error(err);
                return;
            };  
    mUsers.resetPassword(req.body.confirm, hash)
    return res.status(200).send('Passwork changed')
                     });
                })
    } else if(!data){
        return res.status(404).send('NOT FOUND') 
    }
})
.catch(err=>{console.log(err)})
}
else{return res.status(500).send('BAD REQUEST')}
}


const changePassword = (req, res) => {
    mUsers.getUserPasswordByEmail(req.user.email)
    .then((data)=>{
        bcrypt.compare(req.body.password, data.password, function(err, rez){
            if(err){
                return res.status(500).send("Could not compare password");
            }  
             if(rez){
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.newPassword, salt, function(err, hash) {
                        if(err){
                            throw new Error(err);
                            return;
                        }   
                mUsers.updateP(req.user.email, hash)
                  
                    console.log('Password changed successfully')
                 return res.status(200).send('Password successfully changed')
            });
            })

            }
            else {return res.status(500).send('Bad request1')}
        });
        
    })
    .catch((err)=>{
        console.log(err);
        return res.status(404).send('Something went wrong')
    })
}

const confirm = (req, res) => {
    var hash = req.params.confirm_hash;
    mUsers.confirmUserAccount(hash)
    .then(() => {
        return res.status(200).send('ok');
    })
    .catch((err) => {
        return res.status(500).send('Internal Server Error');
    })
}

const updateUser = (req, res) => {
if(req.body.password === undefined && req.body.confirm_hash === undefined && req.body.confirmed === undefined && req.body._id === undefined && req.body.__v === undefined){
var data = req.body
mUsers.updateU(req.user.id, data)
.then(()=> {
    return res.status(200).send('User updated')
})
.catch((err)=> {
    console.log(err);
    res.status(500).send(err)
        })
    }
else{
    return res.status(500).send('Nice try')
    }
}


const getUser = (req, res) => {
   mUsers.getUser(req.user.id)
   .then((data)=> {
       res.status(200).send(data)
   })
   .catch((err)=>{
       res.status(500).send(err)
   })
   
}



module.exports = {
    register,
    login,
    renew,
    resetLink,
    resetPassword,
    changePassword,
    confirm,
    updateUser,
    getUser
}