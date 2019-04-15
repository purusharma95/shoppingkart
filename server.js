const express = require('express');
const db = require('./routes/db').db;
const userRoutes = require('./routes/users');
const vendorRoutes = require('./routes/vendors');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/carts');

const server = express();


server.use(express.json());
server.use(express.urlencoded({ 
    extended: true 
}));

server.use('/',
express.static(__dirname + '/public')
);

server.use('/products',productRoutes);
server.use('/vendors',vendorRoutes);
server.use('/users',userRoutes);
server.use('/carts',cartRoutes);


const PORT = process.env.PORT || 8080

db.sync()
.then(() => {
    console.log("Database Created!")
    server.listen(PORT);
});
