const conn = require('../../config/db')

module.exports = {
	getCars: query => {
		return new Promise((resolve, reject) => {
			conn.query(
				query,
				(err, result) => {
					if (!err) {
						resolve(result)
					} else {
						reject(err)
					}
				}
			)
		})
	},
	carBooking: data => {
		return new Promise((resolve, reject) => {
			conn.query('INSERT INTO car_booked SET ?', data, (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	}
}
