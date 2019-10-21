const conn = require('../../config/db')

module.exports = {
  registration: (data) => {
    console.log("ajdjahdjajdnjn")
    return new Promise((resolve, reject) => {
      conn.query("SELECT * FROM users WHERE email=? ", [data.email], (err, result) => {
        if (result.length < 1) {
          conn.query('INSERT INTO users SET ?', data, (err, result) => {
            if (!err) {
              resolve(result)
            } else {
              reject(err)
            }
          })
        } else {
          err = "Email is already registered"
          reject(err)
        }
      })
    })
  },
  // addRegistration: (data) => {
  //   console.log(data);
  //   return new Promise((resolve, reject) => {
  //       conn.query('SELECT * FROM users WHERE email=?', data.email, (err, result) => {
  //           if (result.length < 1) {
  //               conn.query('INSERT INTO users SET ?', data, (err, result) => {
  //                   if (!err) {
  //                       resolve(result)
  //                   } else {
  //                       reject(err)
  //                   }
  //               })
  //           } else {
  //               err = "Email is alredy registered"
  //               reject(err)
  //           }
  //       })
  //   })


}