const express = require('express')
const Route = express.Router()

const promoController = require('../app/controllers/promo')
const usersController = require('../app/controllers/auth')

Route
	.get('/', promoController.getPromoList)
	.get('/:id', promoController.getPromoDetail)
	.post('/add',  promoController.addPromo)
/*
.patch('/edit', promoController.editPromo)
.delete('/delete', promoController.deletePromo)
*/

module.exports = Route
