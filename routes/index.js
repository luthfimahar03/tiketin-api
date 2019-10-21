const route = require('express').Router()

route.get('*', (req, res) => {
    res.status(404).send({
        code: 404,
        status: 'Not Found',
        message: `Can't ${req.method} the route: '${req.url}'!`,
        error: true
    })
})

module.exports = route