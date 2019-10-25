const conn = require('../../config/db')
const date = new Date()
const today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

module.exports = {
  getPromoList: () => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM promo WHERE valid_from<='${today}' AND valid_until>='${today}'`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getPromoDetail: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM promo WHERE id=?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  addPromo: data => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO promo SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  /*
  editCategory: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE category SET ? WHERE id=?', [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  deleteCategory: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM category WHERE ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
  */
}
