const conn = require('../../config/db')

module.exports = {
  getCity: () => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM city ORDER BY name ASC`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
