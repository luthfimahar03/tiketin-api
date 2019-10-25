const express = require('express')
const Route = express.Router()

const usersController = require('../app/controllers/auth')

Route
	.post('/registration', usersController.registration)
	.post('/login', usersController.login)
	.post('/reset-password', usersController.resetPassword)

module.exports = Route
