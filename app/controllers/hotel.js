const hotelModel = require("../models/hotel")
module.exports = {
    getHotel: (req, res) => {
        let id_city = req.query.id
        let {minPrice, maxPrice, name} = req.query
        let data = {id_city, minPrice, maxPrice, name }

        hotelModel.getHotel(data)
            .then(resultQuery => {
                res.json({
                    status: 200,
                    message: "success getting all hotel",
                    data: resultQuery
                })
            })
            .catch(err => {
                console.log(err)
                res.json({
                    status: 500,
                    message: err
                })
            })
    },
}