const hotelModel = require('../models/hotel')
const url = require('../../config/url')
const uuidv4 = require('uuid/v4');
let status = 200

module.exports = {

	getHotel: (req, res) => {
		let { id_city } = req.query
		let { name } = req.query
		let query = `SELECT * FROM hotel WHERE id_city=${id_city}`
		name && (query += ` AND name='${name}'`)

		hotelModel
			.getHotel(query)
			.then(result => {
				if (result.length <= 0) {
					status = 404
					res.status(status).json({
						status,
						message: 'Hotel not found.'
					})
				} else {
					status = 200
					for (let i = 0; i < result.length; i++) {
						result[i].image && result[i].image !== undefined && result[i].image !== null && (result[i].image_url = url.hotelImgSrc + result[i].image)
					}
					res.status(status).json({
						status,
						message: 'Success getting all hotel',
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
			.then(result => {
				if (result.length >= 1) {
					status = 200
					for (let i = 0; i < result.length; i++) {
						result[i].image && result[i].image !== undefined && result[i].image !== null && (result[i].image_url = url.hotelRoomImgSrc + result[i].image)
					}
					res.status(status).json({
						status,
						message: 'Success getting all hotel rooms.',
						data: result
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
		const { id_users, id_hotel_rooms, check_in_at, check_out_at, payment_method } = req.body
		const number_guests = parseInt(req.body.number_guests)
		const price = parseInt(req.body.price)
		const booked_status = 'Choose Payment Method'
		let data = { id_users, id_hotel_rooms, check_in_at, check_out_at, number_guests, price, payment_method, booked_status }
		hotelModel
			.hotelBooking(data)
			.then(result => {
				status = 200
				id = result.insertId
				data = { id, ...data }
				res.status(status).json({
					status,
					message: 'Success booking hotel.',
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
		let { id, payment_method } = req.body
		const booked_status = 'Waiting Payment'
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

	proofPaymentHotel: (req, res) => {
		const { id } = req.body
		const booked_status = 'Waiting Payment Confirmation'
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
			.proofPaymentHotel(data, id)
			.then(result => {
				status = 200
				data = { id, ...data }
				res.status(status).json({
					status,
					message: 'Success upload payment proof for hotel booked.',
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
					message: 'Success update booked hotel confirmation.',
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

		hotelModel
			.getOrder(id_users)
			.then(resultQuery => {
				if (resultQuery.length <= 0) {
					status = 404
					res.status(status).json({
						status,
						message: 'Hotel order not found.'
					})
				} else {
					status = 200
					res.status(status).json({
						status,
						message: 'Success getting all hotel order.',
						data: resultQuery
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
		let { id_users } = req.query

		hotelModel
			.getOrderHistory(id_users)
			.then(resultQuery => {
				if (resultQuery.length <= 0) {
					status = 404
					res.status(status).json({
						status,
						message: 'Hotel order history not found.'
					})
				} else {
					status = 200
					res.status(status).json({
						status,
						message: 'Success getting all hotel order history.',
						data: resultQuery
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

		payment_proof = payment_proof_code + payment_proof.name
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
	},
	
	getHistory: (req, res) => {

		hotelModel
			.getHistory()
			.then(result => {
				status = 200
				res.status(status).json({
					status,
					message: 'Success get all history hotel.',
					result

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
