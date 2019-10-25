const express = require('express')
const Route = express.Router()

const carsController = require('../app/controllers/cars')
const usersController = require('../app/controllers/auth')

Route
	.get('/', carsController.getCars)
	.post('/booking', usersController.validateUser, carsController.carBooking)
	.patch('/booking/choose-payment', usersController.validateUser, carsController.carBookingChoosePayment)
	.patch('/booking/payment', usersController.validateUser, carsController.carBookingPayment)
	.patch('/booking/payment/confirm', usersController.validateUser, carsController.carBookingPaymentConfirm)

module.exports = Route
