const usersModel = require('../models/user')
const bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
// let middleware = require('../../auth/middleware');
const config = require('../../config/configs')
let status = 200
const saltRounds = 10

module.exports = {

	registration: (req, res) => {
		let { email, password, first_name, last_name, num_phone } = req.body

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
					res.json({
						status: 500,
						message: err
					})
				})
		} else {
			res.json({
				status: 500,
				message: err
			})
		}
	},

	login: (req, res) => {
		let email = req.body.email

		usersModel
			.login(email)
			.then(result => {
				const password = req.body.password
				const id_user = result[0].id
				const passwordHash = result[0].password
				const jwtPrivateKey = config.jwtPrivateKey

				if (bcrypt.compareSync(password, passwordHash)) {
					const token = jwt.sign({ id_user: id_user }, jwtPrivateKey, {
						expiresIn: '24h'
					})

					const { first_name, last_name, num_phone } = result[0]

					status = 200
					res.json({
						status,
						message: 'login success',
						data: {
							id_user,
							email,
							first_name,
							last_name,
							num_phone,
							token
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
	},

	validateUser: (req, res, next) => {
		let authorization = req.headers['authorization'].split(' ')
		let bearerToken = authorization[1]
		jwt.verify(bearerToken, config.jwtPrivateKey, (err, decoded) => {
			if (err) {
				status = 401
				res.status(status).json({
					status,
					message: "Invalid token / token not found. You're not logged in."
				})
			} else {
				next()
			}
		})
	},

	resetPassword: (req, res) => {
		let email = req.body.email
		const randomstring = require('randomstring')
		let password = randomstring.generate({
			length: 8,
			charset: 'alphanumeric'
		})
		let salt = bcrypt.genSaltSync(saltRounds)
		passwordHash = bcrypt.hashSync(password, salt)

		usersModel
			.resetPassword(passwordHash, email)
			.then(result => {

				const nodemailer = require('nodemailer')
				const smtp = require('../../config/smtp')
				const { host, port, user, pass } = smtp

				let transporter = nodemailer.createTransport({
					pool: true,
					secure: true,
					host,
					port,
					auth: {
						user,
						pass
					}
				})

				console.log(transporter)

				let info = transporter.sendMail({
					from: '"Tiketin" <jumaidilfadillah@gmail.com>', // sender address
					to: `${email}, ${email}`, // list of receivers
					subject: 'Reset Password - Tiketin', // Subject line
					html: `<p>You request to reset your Tiketin account password. Here is your new password:</p>${password}` // html body
				})

				transporter.verify(function (error, success) {
					if (error) {
						status = 500
						console.log(error)
						res.status(status).json({
							status,
							message: {
								info: 'Error send email.',
								error
							}
						})
					} else {
						status = 200
						res.status(status).json({
							status,
							message: 'Reset password success.'
						})
					}
				});
			})
			.catch(err => {
				status = 500
				console.log(err)
				res.status(status).json({
					status,
					message: err
				})
			})
	}

}
