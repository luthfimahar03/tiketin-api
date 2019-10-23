const express = require('express')
const Route = express.Router()

const carsController = require('../app/controllers/cars')

Route
	.get('/', carsController.getCars)

module.exports = Route
