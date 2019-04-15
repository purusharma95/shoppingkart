const seq = require('sequelize');

const db = new seq({
    dialect: 'sqlite',
    storage:__dirname+'/../shoppingkrt.sqlite'
})

const Users = db.define('user',{
    name:{
        type: seq.STRING,
        allowNull: false
    }
})

const Products = db.define('product',{
    name:{
        type: seq.STRING
    },
    cost:{
        type: seq.DOUBLE
    }
})

const Cart = db.define('cart',{
    quantity:{
        type: seq.INTEGER
    },
    cost:{
        type: seq.INTEGER
    }
})

const Vendors = db.define('vendor',{
    name:{
        type: seq.STRING
    }
})

Vendors.hasMany(Products, { onDelete: 'cascade' });
Products.belongsTo(Vendors)
Users.hasMany(Cart, { onDelete: 'cascade' })
Cart.belongsTo(Users)
Products.hasMany(Cart, { onDelete: 'cascade' })
Cart.belongsTo(Products)


module.exports = {
    db,Products,Vendors,Users,Cart
}