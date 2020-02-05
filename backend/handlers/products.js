const mProducts = require('../models/products')

const getAll = (req, res) => {
    
    console.log(req.query);
    let q = {user_id : req.user.id};
                               
            
    let sort = {};
    
    
    if(req.query.year != undefined){
        q.year = req.query.year;
    }   
        
    
    if(req.query.ime != undefined){
            q.ime = req.query.ime 
      
        }
    if(req.query.godina_from != undefined){
        if(q.godina == undefined){
            q.godina = {};
        }
        q.godina.$gte = new Date(Number (req.query.godina_from));

    }

    if(req.query.godina_to != undefined){
        if(q.godina == undefined){
            q.godina = {};
        }
        q.godina.$lt = new Date(Number(req.query.godina_to));
        
    }

    if(req.query.sort != undefined){
      let sortable = ['purchase_date', 'product_price']
      let sq = req.query.sort.split(":")
      if(sortable.indexOf(sq[0]) > -1){
          if(sq[1] == 1 || -1){
                 sort[sq[0]] = sq[1] 
          }
      }

    }


    mProducts.getAll(q, sort)
    .then(data => {
    res.status(200).send(data);
    console.log(data)
    })
    .catch(err => {
        res.status(500).send(err);
    });
  };

    const getOne = (req, res) => {
    mProducts.getOne(req.params.id, req.user.id)
    .then(data => {
        res.status(200).send(data)
    })
    .catch(err => {
        res.status(500).send(err);
    });

};

const save = (req, res) => {
    var data = req.body;
    let er = 0;
    if(data.product_name == undefined || data.product_name.length == 0){er++;};
    if(data.product_desc == undefined || data.product_desc.length == 0){er++;};
    if(data.product_type == undefined || data.product_type.length == 0){er++;};
    if(data.purchase_date == undefined || data.purchase_date.length == 0){er++;};
    if(data.product_price == undefined || data.product_price.length == 0){er++;};
    if(er == 0){
    mProducts.save({...data, user_id: req.user.id})
    .then(() => {
        res.status(201).send('Created')
        console.log('Created')
    })
    .catch(err => {
        res.status(500).send(err);
        console.log(err)
    });
} else {
    res.status(400).send('Bad request')
}

};

const replace = (req, res) => {
    var data = req.body;
    console.log(data)
    let er = 0;
    if(data.product_name == undefined || data.ime.length == 0){er++;}
    if(data.product_desc == undefined || data.zanr.length == 0){er++;}
    if(data.product_type == undefined || data.akteri.length == 0){er++;}
    if(data.purchase_date == undefined || data.godina.length == 0){er++;}
    if(data.product_price == undefined || data.rezija.length == 0){er++;}
    if(er == 0){
    mProducts.replace(req.params.id, req.body)
   .then(()=> {
    res.status(204).send();
   })
   .catch(err=>{
res.status(500).send('FUCKOFF');
   });
} else {
    res.status(400).send('Bad Request')
}
};

const update = (req, res) => {
    
    mProducts.replace(req.params.id, req.body)
    .then(()=> {
        res.status(204).send();
        console.log("Product Updated")
    })
    .catch(err =>{
        console.log(err)
        res.status(500).send(err)
    });
};

const remove = (req, res) => {
   mProducts.remove(req.params.id, req.user.id)
   .then(()=> {
    res.status(204).send();
   })
   .catch(err=>{
res.status(500).send(err);
   });
}






module.exports = {
    getAll,
    getOne,
    save,
    replace,
    update,
    remove 
}
