var bcrypt = require('bcryptjs');
const mongoose = require('mongoose');


const User = mongoose.model(
    'users',
    new mongoose.Schema({
        first_name: String,
        last_name : String,
        email: String,
        password: String,
        birth_date: Date,
        telephone: String,
        counrty: String,
        _created: Date,
        confirm_hash: String,
        confirmed: Boolean
        
    },
    {
        collection: 'users'
    })
);

const createUser = (data) => {
    return new Promise((success,fail) => {
        var user = new User(data);
        user.save(err =>{
            if(err){
                console.log('haha')
                return fail(err);
               
            }
      
            return success()
        });
    });
}

const getUserPasswordByEmail = (email) => {
    return new Promise((success, fail) => {
        User.find({email: email}, {password: 1, first_name : 1, last_name :1, email : 1, confirm_hash : 1, confirmed : 1}, (err, data) => {
         if(err){
             return fail(err);
         }    
         return success(data[0]);
        });
    });
}

const confirmUserAccount = (hash) => {
    return new Promise((success, fail) => { 
        User.update({confirm_hash: hash}, {confirmed:true}, (err) => {
            if(err){
                return fail(err);
            }
            return success();
        })
    })
}
const updateP = (email, data) => {

    return new Promise ((success, fail) =>{
        User.updateOne({email:email}, {password : data}, err =>{
            if(err){
                return fail(err)
            }
            return success();
        });
    });
};
const updateU = (id, data) => {
    return new Promise ((success, fail) =>{
        User.updateOne({_id:id}, data, err =>{
            if(err){
                return fail(err)
            }
            return success();
        });
    });
};

const getUser = (id) => {
    return new Promise((success, fail) => {
        User.find({_id:id}, {password : 0, confirm_hash : 0, confirmed : 0, __v : 0, _id: 0}, (err,data)=> {
            if(err){
                return fail;
            }
            return success(data[0]);
        });
    });
};

const resetPassword = (confirm, data) =>{
    return new Promise((success, fail) => {
        User.updateOne({confirm_hash : confirm}, {password:data}, (err)=>{
            if(err){
                console.log('hehe')
                return fail(err)
            }
            console.log('haha')
            return success();
        });
    });
};

const updateHash = (email, conf_hash) => {
    return new Promise((success, fail) => {
        User.updateOne({email : email}, {confirm_hash : conf_hash}, err=>{
            if(err){
                return fail(err)
            }
            return success();
        });
    });
};

const getHash = (hash) =>{
    return new Promise((success,fail)=>{
        User.find({confirm_hash:hash}, {confirm_hash:1}, (err,data)=>{
            if(err){
                return fail(err)
            }
            return success(data[0])
        })
    })
}


module.exports = {
    createUser,
    getUserPasswordByEmail,
    confirmUserAccount,
    updateP,
    updateU,
    getUser,
    resetPassword,
    updateHash,
    getHash
    
}