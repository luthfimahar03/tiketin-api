const { Notification } = require('onesignal-node')
const promoModel = require('../models/promo')
const url = require('../../config/url')
const oneSignal = require('../../config/onesignal')

let status = 200

module.exports = {

  getPromoList: (req, res) => {
    promoModel
      .getPromoList()
      .then(result => {
        if (result.length >= 1) {
          status = 200
          for (let i = 0; i < result.length; i++) {
            result[i].feature_image_url = url.promoImgSrc + result[i].feature_image
          }
          res.status(status).json({
            status,
            message: 'Success getting all promo.',
            data: result
          })
        } else {
          status = 404
          res.status(status).json({
            status,
            message: 'Promo not found.'
          })
        }
      })
      .catch(error => {
        console.log(error)
        status = 500
        res.status(status).json({
          status,
          message: 'Error getting all promo from database.',
          error
        })
      })
  },

  getPromoDetail: (req, res) => {
    const id = req.params.id
    promoModel
      .getPromoDetail(id)
      .then(result => {
        if (result.length >= 1) {
          status = 200
          for (let i = 0; i < result.length; i++) {
            result[i].feature_image_url = url.promoImgSrc + result[i].feature_image
          }
          res.status(status).json({
            status,
            message: 'Success getting promo detail.',
            data: result
          })
        } else {
          status = 404
          res.status(status).json({
            status,
            message: 'Promo not found.'
          })
        }
      })
      .catch(error => {
        console.log(error)
        status = 500
        res.status(status).json({
          status,
          message: 'Error getting promo detail from database.',
          error
        })
      })
  },

  addPromo: (req, res) => {
    const { title, content, valid_from, valid_until } = req.body
    const featureImage = req.files.feature_image

    let randomstring = require("randomstring")
    let randomCode = randomstring.generate({
      length: 6,
      charset: 'alphanumeric'
    })
    const feature_image = `${randomCode}_${featureImage.name}`

    featureImage.mv(url.promoImgPath + feature_image, function (err) {
      if (err) res.send(err)
      else console.log("success")
    })

    let data = { title, feature_image, content, valid_from, valid_until }

    promoModel
      .addPromo(data)
      .then(result => {
        status = 200
        const id = result.insertId
        data = { id, ...data }
        
        oneSignal.sendNotification(new Notification({
          headings: {
            en: `Promo Baru! ${title}`
          },
          contents: {
            en: content
          },
          included_segments: ['Active Users', 'Inactive Users']
        })).then(response => {
          console.log('Notification sent!')
        }).catch(err => {
          console.log(err)
        })
        
        res.status(status).json({
          status,
          message: 'Success add promo.',
          data
        })
      })
      .catch(error => {
        console.log(error)
        status = 500
        res.status(status).json({
          status,
          message: 'Error add promo to database.',
          error
        })
      })
  },

  /*
  editCategory: (req, res) => {
    const id = req.params.id

    categoryModel.getCategoryNameForEdit(id)
      .then(result => {
        const name = req.body.name
        const data = { name: name }
        let nameAll = result.map(v => v.name)

        if (nameAll.includes(name)) {
          status = 403
          res.status(status).json({
            status,
            message: 'category name already exists'
          })
        } else {
          categoryModel.editCategory(data, id)
            .then(result => {
              status = 200
              res.status(status).json({
                status,
                message: 'success editing category data',
                data
              })
            })
            .catch(err => {
              status = 400
              console.log(err)
              res.status(status).json({
                status,
                message: 'error editing category data'
              })
            })
        }

      })
      .catch(err => {
        console.log(err)
        status = 500
        res.status(status).json({
          status,
          message: 'error editing category data'
        })
      })
  },

  deleteCategory: (req, res) => {
    const { id } = req.params
    const data = { id }

    categoryModel.deleteCategory(data)
      .then(result => {
        status = 200
        res.json({
          status,
          message: 'success deleting category data',
          data
        })
      })
      .catch(err => {
        status = 500
        console.log(err)
        res.status(status).json({
          status,
          message: 'error deleting category data'
        })
      })
  }
  */

}
