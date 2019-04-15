const vendorsRoute = require('express').Router();
const Vendors = require('./db').Vendors;

vendorsRoute.get('/',async (req,res)=>{
    const vendorsList = await Vendors.findAll()
    if(vendorsList.length==0){
        res.send({
            success: false,
            message: "No records in db"
        })
    } else {
        res.send({
            success: true,
            data: vendorsList
        })
    }
});

vendorsRoute.post('/',async(req,res)=>{
    try{
        const result = await Vendors.create({
            name: req.body.name
        })
        res.status(200);
        res.send({
            success: true,
            newLength:  await Vendors.findAll().length
        })
    } catch(e) {
        res.status(409);
        res.send({
            success : false,
            err: e.message
        })
    }
});

vendorsRoute.delete('/',async(req,res)=>{
    console.log(req.body.name);

    const record  = await Vendors.destroy({
        where: {
            // id : parseInt(req.body.id)
            name: req.body.name
        }
    })
    console.log(req.body.name);
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
vendorsRoute.get('/:id',async(req,res)=>{
    var intid = parseInt(req.params.id);
    const record  = await Vendors.findAll({
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
})
module.exports = vendorsRoute;