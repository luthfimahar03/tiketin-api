const conn = require('../../config/db')

module.exports = {
	registration: data => {
		return new Promise((resolve, reject) => {
			conn.query(
				'SELECT * FROM users WHERE email=? ',
				[data.email],
				(err, result) => {
					if (result.length < 1) {
						conn.query('INSERT INTO users SET ?', data, (err, result) => {
							if (!err) {
								resolve(result)
							} else {
								reject(err)
							}
						})
					} else {
						err = 'Email is already registered.'
						reject(err)
					}
				}
			)
		})
	},
	login: email => {
		return new Promise((resolve, reject) => {
			conn.query('SELECT * FROM users WHERE email=?', email, (err, result) => {
				if (!err) {
					if (result.length > 0) {
						return resolve(result)
					}
					reject('Email not registered')
				} else {
					reject(new Error(err))
				}
			})
		})
	}
}
