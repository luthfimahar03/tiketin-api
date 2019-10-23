const express = require('express')
const Route = express.Router()

const hotelController = require('../app/controllers/hotel')

Route
	.get('/', hotelController.getHotel)
	.get('/rooms', hotelController.getHotelRooms)
	.post('/booking', hotelController.hotelBooking)
	.patch('/booking/choose-payment', hotelController.hotelBookingChoosePayment)
	.patch('/booking/payment', hotelController.proofPayment)
	.patch('/booking/confirm', hotelController.hotelBookingConfirm)

module.exports = Route
