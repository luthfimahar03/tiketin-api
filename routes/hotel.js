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
	.patch('/booking/payment/confirm', usersController.validateUser, hotelController.hotelBookingConfirm)
	.get('/order', usersController.validateUser, hotelController.getOrder)
	.get('/order/history', usersController.validateUser, hotelController.getOrderHistory)

module.exports = Route
