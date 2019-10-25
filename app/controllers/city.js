const cityModel = require('../models/city')
let status = 200

module.exports = {

  getCity: (req, res) => {
    cityModel
      .getCity()
      .then(result => {
        if (result.length >= 1) {
          status = 200
          res.status(status).json({
            status,
            message: 'Success getting all city.',
            data: result
          })
        } else {
          status = 404
          res.status(status).json({
            status,
            message: 'City not found.'
          })
        }
      })
      .catch(error => {
        console.log(error)
        status = 500
        res.status(status).json({
          status,
          message: 'Error getting city from database.',
          error
        })
      })
  }

}
