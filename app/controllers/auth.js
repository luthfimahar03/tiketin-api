// import model
const usersModel = require('../models/user')
const bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
// let middleware = require('../../auth/middleware');
const config = require('../../config/configs')

module.exports = {
	registration: (req, res) => {
		let { email, password, first_name, last_name, num_phone } = req.body

		const saltRounds = 10
		if (email && password) {
			let salt = bcrypt.genSaltSync(saltRounds)
			password = bcrypt.hashSync(password, salt)

			const data = { email, password, first_name, last_name, num_phone }

			usersModel
				.registration(data)
				.then(result => {
					res.json({
						status: 200,
						message: 'registration success',
						data: data
					})
				})
				.catch(err => {
					res.status(400).json({
						status: 400,
						message: err
					})
				})
		} else {
			res.status(400).json({
				status: 400,
				message: 'Data is required!'
			})
		}
	},

	login: (req, res) => {
		let email = req.body.email

		usersModel
			.login(email)
			.then(result => {
				const password = req.body.password
				const idUser = result[0].id
				const passwordHash = result[0].password
				const jwtPrivateKey = config.jwtPrivateKey

				if (bcrypt.compareSync(password, passwordHash)) {
					const token = jwt.sign({ idUser: idUser }, jwtPrivateKey, {
						expiresIn: '24h'
					})

					const { first_name, last_name, num_phone } = result[0]

					status = 200
					res.json({
						status,
						message: 'login success',
						data: {
							token,
							user: {
								email,
								first_name,
								last_name,
								num_phone
							}
						}
					})
				} else {
					status = 401
					res.status(status).json({
						status,
						message: 'invalid password'
					})
				}
			})
			.catch(err => {
				status = 401
				console.log(err)
				res.status(status).json({
					status,
					message: 'Invalid email.'
				})
			})
	}
}
