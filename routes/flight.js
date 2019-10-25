const express = require('express')
const Route = express.Router()

const flightController = require('../app/controllers/flight')
const usersController = require('../app/controllers/auth')

Route
	.get('/', flightController.getFlight)
	.post('/booking', usersController.validateUser, flightController.flightBooking)
	.post('/booking/passenger', usersController.validateUser, flightController.flightBookingPassenger)
	.patch('/booking/choose-payment', usersController.validateUser, flightController.flightBookingChoosePayment)
	.patch('/booking/payment', usersController.validateUser, flightController.flightBookingPayment)
	.patch('/booking/payment/confirm', usersController.validateUser, flightController.flightBookingConfirm)
	.get('/order', usersController.validateUser, flightController.getOrder)
	.get('/order/history', usersController.validateUser, flightController.getOrderHistory)
	.get('/passenger', usersController.validateUser, flightController.getPassenger)

module.exports = Route
