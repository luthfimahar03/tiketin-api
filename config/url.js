require('dotenv').config()
const base_url = `${process.env.SERVER_URL}:${process.env.SERVER_PORT}`
const promoImgPath = 'uploads/promo/'

module.exports = {
	promoImgPath,
	promoImgSrc: `${base_url}/${promoImgPath}`
}
