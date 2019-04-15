const usersRoute = require('express').Router();
const Users = require('./db').Users;

usersRoute.get('/', async (req, res) => {
    const vendorsList = await Users.findAll();
    // console.log(vendorsList.length)
    res.send(vendorsList);
});

usersRoute.post('/', async (req, res) => {
    // var nameFromReq = req.body.name;
    var result = await Users.findOne({
        where: {
            name: req.body.name
        }
    })

    if (result == null) {
        try {
            var added = await Users.create({
                name: req.body.name
            })
            result = await Users.findOne({
                where: {
                    name: req.body.name
                }
            })
            res.send({success:true, userId : result.id})
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
    res.send({ success: true, userId: result.id })
})



module.exports = usersRoute;