const { verify } = require('jsonwebtoken')
const { jwtSecret } = require('../../config')
const HttpError = require('../../helpers/HttpError')

module.exports = {
    access: (req, res, next) => {
        try {
            let authToken = req.headers.authorization
            
            if (!authToken)
                throw new HttpError(401, 'Unauthorized', `Authorization token has not been set`)
            
            try {
                authToken = authToken.split(/\s+/)[1]
                res.locals.data = verify(authToken, jwtSecretKey)
                next()
            } catch (err) {
                throw new HttpError(401, 'Unauthorized', `Invalid Token`)
            }
        } catch (err) {
            HttpError.handle(res, err)
        }
    }
}