const express = require('express')
const Route = express.Router()

// let middleware = require('../../auth/middleware');

//import constroller
const hotelController = require('../app/controllers/hotel')

Route
	.get("/", hotelController.getHotel)
	// .get("/:id", usersController.getByOneUsers)
	// .post("/registration", usersController.addRegistration)


module.exports = Route
