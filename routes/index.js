const express = require('express')
const Route = express.Router()

const users = require('./users')
const hotel = require('./hotel')
const carRentals = require('./carRentals')

Route
  .use('/users', users)
  .use('/hotel', hotel)
  .use('/sewa-mobil', carRentals)

module.exports = Route
