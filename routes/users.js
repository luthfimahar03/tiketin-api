const express = require("express")
const Route = express.Router()

// let middleware = require('../../auth/middleware');


//import constroller
const usersController = require("../app/controllers/user")

Route
    // .get("/", middleware.checkToken, usersController.getUsers)
    // .get("/:id", usersController.getByOneUsers)
    // .post("/registration", usersController.addRegistration)
    .post("/registration", usersController.registration)
    // .post("/login", usersController.login)



module.exports = Route
