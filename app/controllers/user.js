// import model
const usersModel = require("../models/user")
const conn = require("../../config/db")
const bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
// let middleware = require('../../auth/middleware');

module.exports = {
    registration: (req, res) => {
        let { email, password, first_name, last_name, num_phone } = req.body


        const bcrypt = require('bcryptjs');
        const saltRounds = 10;
        if (email && password) {

            let salt = bcrypt.genSaltSync(saltRounds);
            let hash = bcrypt.hashSync(password, salt);

            const data = { email, hash, first_name, last_name, num_phone }

            usersModel.registration(data).then(result => {
                console.log("adhandmnjafjajbmfb")
                res.json({
                    status: 200,
                    message: "registration success",
                })
            }).catch(err => {
                res.json({
                    status: 500,
                    message: err
                })
            })
        } else {
            res.json({
                status: 500,
                message: err
            })
        }
    },

}