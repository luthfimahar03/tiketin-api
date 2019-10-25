const conn = require('../../config/db')
const date = new Date()
const dateNow = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()

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
	proofPayment: (data, id) => {
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
	getOrder: id_users => {
		return new Promise((resolve, reject) => {
			conn.query(`SELECT hb.id AS id_order, hb.check_in_at, hb.check_out_at, hb.number_guests, hb.price, hb.payment_method, hb.booking_code, hb.information, hr.name AS room_name, h.name AS hotel_name, c.name AS city_name FROM hotel_booked hb, hotel_rooms hr, hotel h, city c WHERE hb.id_users=? AND hb.id_hotel_rooms=hr.id AND hr.id_hotel=h.id AND h.id_city=c.id AND hb.check_out_at>='${dateNow}'`, id_users, (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},
	getOrderHistory: id_users => {
		return new Promise((resolve, reject) => {
			conn.query(`SELECT hb.id AS id_order, hb.check_in_at, hb.check_out_at, hb.number_guests, hb.price, hb.payment_method, hb.booking_code, hb.information, hr.name AS room_name, h.name AS hotel_name, c.name AS city_name FROM hotel_booked hb, hotel_rooms hr, hotel h, city c WHERE hb.id_users=? AND hb.id_hotel_rooms=hr.id AND hr.id_hotel=h.id AND h.id_city=c.id AND hb.check_out_at<'${dateNow}'`, id_users, (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},
	addHotel: data => {
		return new Promise((resolve, reject) => {
			conn.query('INSERT INTO hotel SET ?', data, (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},
	addHotelRoom: data => {
		return new Promise((resolve, reject) => {
			conn.query('INSERT INTO hotel_rooms SET ?', data, (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	}
}
