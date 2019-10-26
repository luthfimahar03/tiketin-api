const carsModel = require('../models/cars')
const url = require('../../config/url')
let status = 200

module.exports = {

	getCars: (req, res) => {
		let { id_city, name } = req.query
		let query = `SELECT * FROM car WHERE id_city=${id_city}`
		name && (query += ` AND name='${name}'`)

		carsModel
			.getCars(query)
			.then(result => {
				if (result.length < 1) {
					status = 404
					res.status(status).json({
						status,
						message: 'Car not found.'
					})
				} else {
					status = 200
					for (let i = 0; i < result.length; i++) {
						result[i].image && result[i].image !== undefined && result[i].image !== null && (result[i].image_url = url.carsImgSrc + result[i].image)
					}
					res.status(status).json({
						status,
						message: 'Success getting all cars.',
						data: result
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
		const { id_users, id_car, from_date, to_date } = req.body
		const booked_status = 'Choose Payment Method'
		const price = parseInt(req.body.price)

		const date1 = new Date(from_date)
		const date2 = new Date(to_date)
		const Difference_In_Time = date2.getTime() - date1.getTime()
		const days = (Difference_In_Time / (1000 * 3600 * 24)) + 1

		const dataQuery = { id_users, id_car, from_date, to_date, price, booked_status }
		let data = { id_users, id_car, from_date, to_date, days, price, booked_status }
		carsModel
			.carBooking(dataQuery)
			.then(result => {
				status = 200
				let id = result.insertId
				data = { id, ...data }
				res.status(status).json({
					status,
					message: 'Success booking car.',
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

	carBookingChoosePayment: (req, res) => {
		const { id, payment_method } = req.body
		const booked_status = 'Waiting Payment'
		const updated_at = new Date()

		let data = { payment_method, booked_status, updated_at }

		carsModel
			.carBookingChoosePayment(data, id)
			.then(result => {
				status = 200
				data = { id, ...data }
				res.status(status).json({
					status,
					message: 'Success choose payment method for car rentals',
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

	carBookingPayment: (req, res) => {
		const { id } = req.body
		const booked_status = 'Waiting Payment Confirmation'
		let payment_proof = req.files.payment_proof

		let randomstring = require("randomstring")
		let paymentProofCode = randomstring.generate({
			length: 6,
			charset: 'alphanumeric'
		})
		let image = `${paymentProofCode}_${payment_proof.name}`

		payment_proof.mv('uploads/' + image, function (err) {
			if (err) res.send(err);
			console.log("success")

		})

		payment_proof = image
		const updated_at = new Date()
		let data = { payment_proof, booked_status, updated_at }

		carsModel
			.carBookingPayment(data, id)
			.then(result => {
				status = 200
				data = { id, ...data }
				res.status(status).json({
					status,
					message: 'Success upload payment proof for car rentals.',
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

	carBookingPaymentConfirm: (req, res) => {
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

		carsModel
			.carBookingPaymentConfirm(data, id)
			.then(result => {
				status = 200
				data = { id, ...data }
				res.status(status).json({
					status,
					message: 'Success update car rentals payment confirmation.',
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
