const express = require('express')
const Route = express.Router()

const cityController = require('../app/controllers/city')

Route
	.get('/', cityController.getCity)

module.exports = Route
