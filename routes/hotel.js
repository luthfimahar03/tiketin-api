const express = require('express')
const Route = express.Router()

const hotelController = require('../app/controllers/hotel')
const usersController = require('../app/controllers/auth')

Route
	.get('/', hotelController.getHotel)
	.get('/rooms', hotelController.getHotelRooms)
	.post('/booking', usersController.validateUser, hotelController.hotelBooking)
	.patch('/booking/choose-payment', usersController.validateUser, hotelController.hotelBookingChoosePayment)
	.patch('/booking/payment', usersController.validateUser, hotelController.proofPayment)
	.patch('/booking/confirm', usersController.validateUser, hotelController.hotelBookingConfirm)

module.exports = Route
