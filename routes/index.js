const express = require('express')
const Route = express.Router()

const users = require('./users')
const hotel = require('./hotel')
const cars = require('./cars')
const promo = require('./promo')

Route
  .use('/users', users)
  .use('/hotel', hotel)
  .use('/sewa-mobil', cars)
  .use('/promo', promo)

module.exports = Route
