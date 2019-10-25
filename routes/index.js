const express = require('express')
const Route = express.Router()

const users = require('./users')
const flight = require('./flight')
const hotel = require('./hotel')
const cars = require('./cars')
const promo = require('./promo')
const city = require('./city')

Route
  .use('/users', users)
  .use('/flight', flight)
  .use('/hotel', hotel)
  .use('/car-rentals', cars)
  .use('/promo', promo)
  .use('/city', city)

module.exports = Route
