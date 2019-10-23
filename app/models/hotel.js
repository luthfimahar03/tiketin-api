const conn = require('../../config/db')

module.exports = {
	getHotel: query => {
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
	getHotelRooms: query => {
		return new Promise((resolve, reject) => {
			conn.query(query, (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},
	hotelBooking: data => {
		return new Promise((resolve, reject) => {
			conn.query('INSERT INTO hotel_booked SET ?', data, (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},
	hotelBookingConfirm: (data, id) => {
		return new Promise((resolve, reject) => {
			conn.query('UPDATE hotel_booked SET ? WHERE ?', [data, id], (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},

	proofPayment: (data, id) => {
		return new Promise((resolve, reject) => {
			conn.query('UPDATE hotel_booked SET ? WHERE ?', [data, id], (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	}

}
