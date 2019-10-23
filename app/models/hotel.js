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
	hotelBookingChoosePayment: (data, id) => {
		return new Promise((resolve, reject) => {
			conn.query('UPDATE hotel_booked SET ? WHERE id=?', [data, id], (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},
	proofPaymentHotel: (data, id) => {
		return new Promise((resolve, reject) => {
			conn.query('UPDATE hotel_booked SET ? WHERE id=?', [data, id], (err, result) => {
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
			conn.query('UPDATE hotel_booked SET ? WHERE id=?', [data, id], (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},
	getHistory: (data) => {
		return new Promise((resolve, reject) => {
			conn.query("SELECT c.name, h.name, h.id_city, hb.id_users, hb.id_hotel_rooms, hb.booking_code, hb.check_in_at, hb.check_out_at, hr.id_hotel, hr.name, hr.price from city c " + 
			"left outer join hotel h " + 
				"on h.id_city=c.id " + 
			"left outer join hotel_booked hb " + 
				"on hb.id_hotel_rooms= h.id_city " + 
			"left outer join hotel_rooms hr " + 
				"on hr.id_hotel=hb.id_hotel_rooms", data, (err, result) => {
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
