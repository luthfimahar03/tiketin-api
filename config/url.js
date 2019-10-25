require('dotenv').config()
const base_url = `${process.env.SERVER_URL}:${process.env.SERVER_PORT}`
const rootPath = 'uploads/'

const promoImgPath = `${rootPath}promo/`
const hotelImgPath = `${rootPath}hotels/`
const hotelRoomImgPath = `${hotelImgPath}rooms/`
const carsImgPath = `${rootPath}cars/`
const airlinesImgPath = `${rootPath}airlines/`
const paymentProofFlightPath = `${rootPath}payment-proof/flights/`

module.exports = {
	promoImgPath,
	promoImgSrc: `${base_url}/${promoImgPath}`,
	hotelImgPath,
	hotelImgSrc: `${base_url}/${hotelImgPath}`,
	hotelRoomImgPath,
	hotelRoomImgSrc: `${base_url}/${hotelRoomImgPath}`,
	carsImgPath,
	carsImgSrc: `${base_url}/${carsImgPath}`,
	airlinesImgPath,
	airlinesImgSrc: `${base_url}/${airlinesImgPath}`,
	paymentProofFlightPath,
	paymentProofFlightSrc: `${base_url}/${paymentProofFlightPath}`
}
