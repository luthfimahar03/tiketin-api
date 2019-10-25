const flightModel = require('../models/flight')
const url = require('../../config/url')
let status = 200

module.exports = {

	getFlight: (req, res) => {
		let { from_id_city, to_id_city, date } = req.query
		let query = `SELECT fs.*, cf.name AS from_city, ct.name AS to_city
		FROM flight_schedule fs, city cf, city ct
		WHERE fs.from_id_city=cf.id AND fs.to_id_city=ct.id AND
			fs.from_id_city=${from_id_city} AND fs.to_id_city=${to_id_city} AND DATE(fs.from_at)='${date}'`

		flightModel
			.getFlight(query)
			.then(result => {
				if (result.length <= 0) {
					status = 404
					res.status(status).json({
						status,
						message: 'Flight not found.'
					})
				} else {
					status = 200
					res.status(status).json({
						status,
						message: 'Success getting all flight.',
						data: result
					})
				}
			})
			.catch(err => {
				if (!id_city) {
					status = 404
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

	flightBooking: (req, res) => {
		const { id_users, id_flight_schedule, contact_name, contact_num_phone } = req.body
		const price = parseInt(req.body.price)
		const booked_status = 'Choose Payment Method'
		let data = { id_users, id_flight_schedule, contact_name, contact_num_phone, price, booked_status }
		flightModel
			.flightBooking(data)
			.then(result => {
				status = 200
				id = result.insertId
				data = { id, ...data }
				res.status(status).json({
					status,
					message: 'Success booking flight.',
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
	},

	flightBookingPassenger: (req, res) => {
		const { id_flight_schedule, full_name } = req.body
		let data = { id_flight_schedule, full_name }
		flightModel
			.flightBookingPassenger(data)
			.then(result => {
				status = 200
				id = result.insertId
				data = { id, ...data }
				res.status(status).json({
					status,
					message: 'Success add flight passenger.',
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
	},

	flightBookingChoosePayment: (req, res) => {
		let { id, payment_method } = req.body
		const booked_status = 'Waiting Payment'
		const updated_at = new Date()
		let data = { payment_method, booked_status, updated_at }

		flightModel
			.flightBookingChoosePayment(data, id)
			.then(result => {
				status = 200
				data = { id, ...data }
				res.status(status).json({
					status,
					message: 'Success update booked flight choose payment.',
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
	},

	flightBookingPayment: (req, res) => {
		const { id } = req.body
		const booked_status = 'Waiting Payment Confirmation'
		const paymentProof = req.files.payment_proof

		const randomstring = require("randomstring")
		const paymentProofCode = randomstring.generate({
			length: 6,
			charset: 'alphanumeric'
		})
		const payment_proof = `${paymentProofCode}_${paymentProof.name}`

		paymentProof.mv(url.paymentProofFlightPath + payment_proof, function (err) {
			if (err) res.send(err)
		})

		const updated_at = new Date()
		let data = { payment_proof, booked_status, updated_at }

		flightModel
			.flightBookingPayment(data, id)
			.then(result => {
				status = 200
				data.payment_proof_url = url.paymentProofFlightSrc + data.payment_proof
				data = { id, ...data }
				res.status(status).json({
					status,
					message: 'Success upload payment proof for flight booking.',
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
	},

	flightBookingConfirm: (req, res) => {
		const { id, booked_status, information } = req.body
		const updated_at = new Date()
		if (booked_status === 'Payment Accept') {
			const randomstring = require("randomstring")
			var booking_code = randomstring.generate({
				length: 6,
				charset: 'alphabetic',
				capitalization: 'uppercase'
			})
		}

		let data = { booking_code, booked_status, information, updated_at }

		flightModel
			.flightBookingConfirm(data, id)
			.then(result => {
				status = 200
				data = { id, ...data }
				res.status(status).json({
					status,
					message: 'Success update booked flight confirmation.',
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
	},

	getOrder: (req, res) => {
		let { id_users } = req.query

		flightModel
			.getOrder(id_users)
			.then(result => {
				if (result.length <= 0) {
					status = 404
					res.status(status).json({
						status,
						message: 'Flight order not found.'
					})
				} else {
					status = 200
					res.status(status).json({
						status,
						message: 'Success getting all flight order.',
						data: result
					})
				}
			})
			.catch(err => {
				if (!id_users) {
					status = 404
					res.status(status).json({
						status,
						message: 'User not found.'
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

	getOrderHistory: (req, res) => {
		const { id_users } = req.query

		flightModel
			.getOrderHistory(id_users)
			.then(result => {
				if (result.length <= 0) {
					status = 404
					res.status(status).json({
						status,
						message: 'Flight order history not found.'
					})
				} else {
					status = 200
					res.status(status).json({
						status,
						message: 'Success getting all flight order history.',
						data: result
					})
				}
			})
			.catch(err => {
				if (!id_users) {
					status = 404
					res.status(status).json({
						status,
						message: 'User not found.'
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

	getPassenger: (req, res) => {
		const { id_flight_schedule } = req.query

		flightModel
			.getPassenger(id_flight_schedule)
			.then(result => {
				if (result.length <= 0) {
					status = 404
					res.status(status).json({
						status,
						message: 'Flight order history not found.'
					})
				} else {
					status = 200
					res.status(status).json({
						status,
						message: 'Success getting all flight order history.',
						data: result
					})
				}
			})
			.catch(err => {
				if (!id_flight_schedule) {
					status = 404
					res.status(status).json({
						status,
						message: 'Flight schedule not found.'
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



}
