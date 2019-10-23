const hotelModel = require('../models/hotel')
const uuidv4 = require('uuid/v4');
let status = 200

module.exports = {
	getHotel: (req, res) => {
		let id_city = req.query.id
		let { name } = req.query
		let query = `SELECT * FROM hotel WHERE id_city=${id_city}`
		name && (query += ` AND name='${name}'`)

		hotelModel
			.getHotel(query)
			.then(resultQuery => {
				if (resultQuery.length <= 0) {
					status = 404
					res.status(status).json({
						status,
						message: 'Hotel not found.'
					})
				} else {
					status = 200
					res.status(status).json({
						status,
						message: 'Success getting all hotel',
						data: resultQuery
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

	getHotelRooms: (req, res) => {
		let {
			idHotel,
			fromDate,
			toDate,
			minPrice,
			maxPrice,
			numberGuests,
			name
		} = req.query

		!minPrice && (minPrice = 0)
		!maxPrice && (maxPrice = 0)
		let query = `SELECT * FROM hotel_rooms WHERE id_hotel=${idHotel} AND from_date='${fromDate}' AND to_date='${toDate}' AND price>=${minPrice} AND price<=${maxPrice} AND maximum_guests>=${numberGuests}`
		name && (query += ` AND name='${name}'`)

		hotelModel
			.getHotelRooms(query)
			.then(resultQuery => {
				if (resultQuery.length >= 1) {
					status = 200
					res.status(status).json({
						status,
						message: 'Success getting all hotel rooms.',
						data: resultQuery
					})
				} else {
					status = 404
					res.status(status).json({
						status,
						message: 'Nothing hotel rooms.'
					})
				}
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

	hotelBooking: (req, res) => {
		const { id_users, id_hotel_rooms, check_in_at, check_out_at, payment_method, booked_status } = req.body
		const number_guests = parseInt(req.body.number_guests)
		const data = { id_users, id_hotel_rooms, check_in_at, check_out_at, number_guests, payment_method, booked_status }
		hotelModel
			.hotelBooking(data)
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
	},

	hotelBookingConfirm: (req, res) => {
		const { id, booked_status, information } = req.body
		const updated_at = new Date()
		if (booked_status === 'Payment Confirmed') {
			const randomstring = require("randomstring")
			var booking_code = randomstring.generate({
				length: 6,
				charset: 'alphabetic',
				capitalization: 'uppercase'
			})
		}

		const data = { id, booking_code, booked_status, information, updated_at }

		hotelModel
			.hotelBookingConfirm(data, id)
			.then(resultQuery => {
				status = 200
				res.status(status).json({
					status,
					message: 'Success update booked hotel confirm.',
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

	proofPayment: (req, res) => {
		const { id } = req.body
		let randomstring = require("randomstring");
		let data
		let payment_proof = req.files.payment_proof;
		let image = uuidv4() + `.${req.files.payment_proof.mimetype.split("/")[1]}`

		payment_proof.mv('uploads/' + image, function (err) {
			if (err) res.send(err);
			console.log("success")

		})
		var payment_proof_code = randomstring.generate({
			length: 12,
			charset: 'alphabetic',
			capitalization: 'uppercase'
		});

		payment_proof =  payment_proof_code + payment_proof.name
		data = { id, payment_proof }

		hotelModel
			.proofPayment(data, id)
			.then(resultQuery => {
				status = 200
				res.status(status).json({
					status,
					message: 'Success upload proof of payment.',
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
