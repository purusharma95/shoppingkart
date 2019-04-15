const productsRoute = require('express').Router();
const Products = require('./db').Products;
const Vendors = require('./db').Vendors;

productsRoute.get('/',async (req,res)=>{
    const productsList = await Products.findAll({
        include:Vendors
    });
    if(productsList.length==0){
        res.send({
            success: false,
            message: "No records in db"
        })
    } else {
        res.send({
            success: true,
            data: productsList
        })
    }
});

productsRoute.post('/',async(req,res)=>{
    try{
        const result = await Products.create({
            name: req.body.name,
            cost: req.body.cost,
            vendorId: req.body.vendorId
        })
        res.status(200);
        res.send({
            success: true,
            newLength:  await Products.findAll().length
        })
    } catch(e) {
        res.send({
            success : false,
            err: e.message
        })
    }
});

productsRoute.delete('/',async(req,res)=>{
    const record  = await Products.destroy({
        where: {
            // name: req.body.name
            id: req.body.id
        }
    })
    if(record == 0){
        res.send({
            success: false,
            message:"error while deleting"
        })
    } else{
        res.send({
            success: true,
            message: "deleted successfully"
        })
    }
});

productsRoute.get('/:id',async(req,res)=>{
    var intid = parseInt(req.params.id);
    const record  = await Products.findAll({
        where: {
            id : intid
        }
    })
    if(record == 0){
        res.send({
            success: false,
            message:"No record found!"
        })
    } else{
        res.send(record)
    }
});

module.exports = productsRoute;