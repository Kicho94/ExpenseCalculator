const mongoose = require('mongoose');

const Products = mongoose.model(
    'products',
    new mongoose.Schema(
        {
            product_name: String,
            product_desc: String,
            product_type: String,
            purchase_date: Date,
            product_price: Number,
            user_id : String,
            _created: Date
        },
        {
            collection: 'products'
        })
    );

    const getAll = (q, sort) => {
        return new Promise((success, fail) => {
            Products.find(q, {}, {sort : sort}, (err, data) => {
                if(err){
                    return fail(err);
                }
                return success(data);
            })
        })
    };

    const getOne = (id, userID) => {
        return new Promise((success, fail) => {
            Products.find({_id: id, user_id: userID}, (err, data) => {
                if(err){
                 return fail(err);
                }
                return success(data[0]);
            });
        });
    };

    const save = (data) => {
        return new Promise((success, fail) => {
            var f = new Products(data);
            f.save(data, err => {
                if(err){
                 return fail(err);
                }
                return success();
            });
        });
    };

    const remove = (id, userID) => {
        return new Promise((success, fail) => {
            Products.deleteOne({_id:id, user_id: userID}, err=> {
                if(err){
                    return fail(err);
                    }
                return success();
            });
        });
    }

    const replace = (id, data) => {
        return new Promise ((success, fail) =>{
            Products.updateOne({_id:id}, data, err =>{
                if(err){
                    return fail(err)
                }
                return success();
            });
        });
    };

    


    module.exports = {
        getAll,
        getOne,
        save,
        remove,
        replace,
            }