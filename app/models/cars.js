const conn = require('../../config/db')

module.exports = {
	getCars: query => {
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
	}
}
