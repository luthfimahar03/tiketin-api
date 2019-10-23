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
	},
	carBookingChoosePayment: (data, id) => {
		return new Promise((resolve, reject) => {
			conn.query('UPDATE car_booked SET ? WHERE id=?', [data, id], (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},
	carBookingPayment: (data, id) => {
		return new Promise((resolve, reject) => {
			conn.query('UPDATE car_booked SET ? WHERE id=?', [data, id], (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},
	carBookingPaymentConfirm: (data, id) => {
		return new Promise((resolve, reject) => {
			conn.query('UPDATE car_booked SET ? WHERE id=?', [data, id], (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	}
}
