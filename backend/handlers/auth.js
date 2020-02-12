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
                } else {
                    throw new Error('Bad Request - User Exists')
                    return res.status(400).send('User exists')
                }
            })
            .catch((err) => {
                throw new Error(err);
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
                    
                return res.status(200).send({jwt: token, fullname :`${data.first_name} ${data.last_name}`} )
            }
            return res.status(200).send('not found');
        });
       
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send('internal server error')
    });      
}
    
const renew = (req, res) => {
    return res.status(200).send(req.user.id);
}
const resetLink = (req, res) => {
}
const resetPassword = (req, res) => {
    return res.status(200).send('ok');
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
                .then(()=> {
                    console.log('Password changed successfully')
                 return res.status(200).send('Password successfully changed')
                })
               .catch((err)=> {console.log(err)})
            });
            })

            }
        })
    })
}
const confirm = (req, res) => {
    // koga nekoj kje klikne na 
    // http://localhost:8001/api/v1/confirm/[CONFIRM_HASH]
    // go nosi na ovoj handler
    // go prezemate hash-ot
    // proveruvate vo baza dali vakov hash postoi
    // ako postoi na istiot record mu setirate
    // confirmed: true
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