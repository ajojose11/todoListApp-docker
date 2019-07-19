const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    createUser: function (req, resp, next) {

        userModel.findOne({ email: req.body.email }, function (err, userInfo) {
           try{
            if (userInfo) {
                resp.status(400).json({ status: "error", message: "User with Email already exists", data: null })
            } else {
                userModel.create(
                    {
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    }, function (err, result) {
                        if (err) {
                            console.log(err)
                            next(err);
                        }
                        else
                            resp.json({ status: "success", message: "User added successfully!!!", data: null });
                    });

            }
        } catch(e) {
            console.log(e)
        }
        })
    },
    authenticate: function (req, resp, next) {
        if(req.body.email) {
            userModel.findOne({email: req.body.email}, function (err, userInfo) {
                if (err) {
                    next(err);
                } else {
                    if (req.body.password && userInfo) {
                        console.log(err,userInfo,req.body);
                        if(bcrypt.compareSync(req.body.password, userInfo.password)) {
                            const token = jwt.sign({id: userInfo._id}, 'bumblebee', { expiresIn: '7h' });
                            resp.json({status:"success", message: "user found", data:userInfo,token: token});
                        } else {
                            resp.status(400).json({status:"error", message: "Invalid email/password!!!", data:null});
                            }
                    } else {
                        resp.status(400).json({status:"error", message: "Invalid email/password!!!", data:null});
                    }
                }
            });
        } else {
            resp.status(400).json({status:"error", message: "Invalid Params", data:null});
        }
    }
}
