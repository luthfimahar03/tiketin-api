const hotelModel = require('../models/hotel')
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
		const price = parseInt(req.body.price)
		let data = { id_users, id_hotel_rooms, check_in_at, check_out_at, number_guests, price, payment_method, booked_status }
		hotelModel
			.hotelBooking(data)
			.then(result => {
				status = 200
				id = result.insertId
				data = { id, ...data }
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

	hotelBookingChoosePayment: (req, res) => {
		let { id, payment_method, booked_status } = req.body
		const updated_at = new Date()
		let data = { payment_method, booked_status, updated_at }

		hotelModel
			.hotelBookingChoosePayment(data, id)
			.then(result => {
				status = 200
				data = { id, ...data }
				res.status(status).json({
					status,
					message: 'Success update booked hotel choose payment.',
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
		const { id, booked_status } = req.body
		let randomstring = require("randomstring");
		let payment_proof = req.files.payment_proof;

		var payment_proof_code = randomstring.generate({
			length: 6,
			charset: 'alphabetic'
		});
		let image = `${payment_proof_code}_${payment_proof.name}`

		payment_proof.mv('uploads/' + image, function (err) {
			if (err) res.send(err);
			console.log("success")

		})

		payment_proof = image
		const updated_at = new Date()
		let data = { payment_proof, booked_status, updated_at }

		hotelModel
			.proofPayment(data, id)
			.then(result => {
				status = 200
				data = { id, ...data }
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
	},

	hotelBookingConfirm: (req, res) => {
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

		hotelModel
			.hotelBookingConfirm(data, id)
			.then(result => {
				status = 200
				data = { id, ...data }
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
	}
}
