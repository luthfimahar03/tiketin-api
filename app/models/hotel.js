const conn = require('../../config/db')

module.exports = {
    getHotel: (data) => {
        console.log("afjamsnahjdbajbd")
        return new Promise((resolve, reject) => {
            conn.query("SELECT * FROM hotel where id_city=? and name=? and price>=? and price<=? " ,[data.id_city, data.name, data.minPrice, data.maxPrice], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    }
}