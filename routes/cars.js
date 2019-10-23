const express = require('express')
const Route = express.Router()

const carsController = require('../app/controllers/cars')

Route
	.get('/', carsController.getCars)
	.post('/booking', carsController.carBooking)
	.patch('/booking/choose-payment', carsController.carBookingChoosePayment)
	.patch('/booking/payment', carsController.carBookingPayment)
	.patch('/booking/payment/confirm', carsController.carBookingPaymentConfirm)

module.exports = Route
