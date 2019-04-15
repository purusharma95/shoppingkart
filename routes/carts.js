const cartRoute = require('express').Router();
const Cart = require('./db').Cart;
const Products = require('./db').Products;
const Users = require('./db').Users;
const Vendors = require('./db').Vendors;

cartRoute.get('/',async (req,res)=>{
    const cartList = await Cart.findAll({
        include:[Products,Users]
    });
    res.send({success: true, data:cartList})
});

cartRoute.get('/:uid', async (req,res)=>{
    const uId = parseInt(req.params.uid);
    const cartByUserId = await Cart.findAll({
        include: [{ model: Products,
             include: Vendors}],
        where:{
            userId: uId
        }
    })
    res.send({success: true, data:cartByUserId})
});

cartRoute.post('/',async(req,res)=>{
    var prev = await Cart.findOne({
        where:{
            productId: req.body.productId,
            userId: req.body.userId,
        }
    })
    if(prev == null){
        try{
            const result = await Cart.create({
                quantity: req.body.quantity,
                cost: req.body.cost,
                userId: req.body.userId,
                productId: req.body.productId
            })
            res.send({success:true, data: result})
        }catch(err){
            res.send({success: false, error: err.message})
        }
    } else {
        const newResult = Cart.update(
            {quantity: req.body.quantity},{
                where:{
                    productId: req.body.productId,
                    userId: req.body.userId
                }
            })
            res.send({success:true, data: newResult, msg: 'Cart is Updated'})
    }
})

cartRoute.delete('/',async(req,res)=>{
    const record  = await Cart.destroy({
        where: {
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
})

module.exports = cartRoute;