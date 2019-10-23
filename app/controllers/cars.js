const carsModel = require('../models/cars')
let status = 200

module.exports = {

	getCars: (req, res) => {
		let { id_city, name } = req.query
		let query = `SELECT * FROM car WHERE id_city=${id_city}`
		name && (query += ` AND name='${name}'`)

		carsModel
			.getCars(query)
			.then(resultQuery => {
				if (resultQuery.length <= 0) {
					status = 404
					res.status(status).json({
						status,
						message: 'Car not found.'
					})
				} else {
					status = 200
					res.status(status).json({
						status,
						message: 'Success getting all cars.',
						data: resultQuery
					})
				}
			})
			.catch(err => {
				if (!id_city) {
					status = 403
					res.status(status).json({
						status,
						message: 'City is empty.'
					})
				} else {
					console.log(err)
					res.json({
						status: 500,
						message: err
					})
				}
			})
	},

	carBooking: (req, res) => {
		const { id_users, id_car, from_date, to_date, payment_method, booked_status } = req.body
		const price = parseInt(req.body.price)

		const date1 = new Date(from_date)
		const date2 = new Date(to_date)
		const Difference_In_Time = date2.getTime() - date1.getTime()
		const days = (Difference_In_Time / (1000 * 3600 * 24)) + 1

		const dataQuery = { id_users, id_car, from_date, to_date, price, payment_method, booked_status }
		const data = { id_users, id_car, from_date, to_date, days, price, payment_method, booked_status }
		carsModel
			.carBooking(dataQuery)
			.then(resultQuery => {
				status = 200
				res.status(status).json({
					status,
					message: 'Success checkout hotel.',
					data
				})
			})
			.catch(err => {
				console.log(err)
				status = 500
				res.status(status).json({
					status,
					message: err
				})
			})
	}

}
