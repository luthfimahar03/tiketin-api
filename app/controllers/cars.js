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
	}

}
