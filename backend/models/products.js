const mongoose = require('mongoose');

const Products = mongoose.model(
    'products',
    new mongoose.Schema(
        {
            product_name: String,
            product_desc: String,
            product_type: String,
            purchase_date: Date,
            product_price: Number
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