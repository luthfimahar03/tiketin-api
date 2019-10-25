const conn = require('../../config/db')
const url = require('../../config/url')
const date = new Date()
const dateNow = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()

module.exports = {
	getFlight: query => {
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
	flightBooking: data => {
		return new Promise((resolve, reject) => {
			conn.query('INSERT INTO flight_booked SET ?', data, (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},
	flightBookingPassenger: data => {
		return new Promise((resolve, reject) => {
			conn.query('INSERT INTO flight_passenger SET ?', data, (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},
	flightBookingChoosePayment: (data, id) => {
		return new Promise((resolve, reject) => {
			conn.query('UPDATE flight_booked SET ? WHERE id=?', [data, id], (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},
	flightBookingPayment: (data, id) => {
		return new Promise((resolve, reject) => {
			conn.query('UPDATE flight_booked SET ? WHERE id=?', [data, id], (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},
	flightBookingConfirm: (data, id) => {
		return new Promise((resolve, reject) => {
			conn.query('UPDATE flight_booked SET ? WHERE id=?', [data, id], (err, result) => {
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
			conn.query(`
				SELECT
					fb.id AS id_order, fb.id_users, fb.id_flight_schedule, fb.price, fb.contact_name, fb.contact_num_phone, fb.payment_method, fb.booking_code, fb.booked_status, fb.information,
					fs.flight_number, fs.from_airport, fs.from_airport_code, cf.name AS from_city, fs.from_at, to_airport, fs.to_airport_code, ct.name AS to_city, fs.to_at,
					fa.name AS airline_name, fa.image AS airline_image, CONCAT("${url.airlinesImgSrc}", fa.image) AS airline_image_url
				FROM flight_booked fb, flight_schedule fs, city cf, city ct, flight_airline fa
				WHERE fb.id_users=? AND fb.id_flight_schedule=fs.id AND fs.from_id_city=cf.id AND fs.to_id_city=ct.id AND fs.id_flight_airline=fa.id AND DATE(fs.from_at)>='${dateNow}'
			`, id_users, (err, result) => {
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
			conn.query(`
				SELECT
					fb.id AS id_order, fb.id_users, fb.id_flight_schedule, fb.price, fb.contact_name, fb.contact_num_phone, fb.payment_method, fb.booking_code, fb.booked_status, fb.information,
					fs.flight_number, fs.from_airport, fs.from_airport_code, cf.name AS from_city, fs.from_at, to_airport, fs.to_airport_code, ct.name AS to_city, fs.to_at,
					fa.name AS airline_name, fa.image AS airline_image, CONCAT("${url.airlinesImgSrc}", fa.image) AS airline_image_url
				FROM flight_booked fb, flight_schedule fs, city cf, city ct, flight_airline fa
				WHERE fb.id_users=? AND fb.id_flight_schedule=fs.id AND fs.from_id_city=cf.id AND fs.to_id_city=ct.id AND fs.id_flight_airline=fa.id AND DATE(fs.from_at)<'${dateNow}'
			`, id_users, (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},
	getPassenger: id_flight_schedule => {
		return new Promise((resolve, reject) => {
			conn.query(`SELECT * FROM flight_passenger WHERE id_flight_schedule=?`, id_flight_schedule, (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	}
}
