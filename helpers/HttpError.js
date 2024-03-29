class HttpError extends Error {
    constructor(code, status, message) {
        super(JSON.stringify({ code, status, message, error: true }))
        Error.captureStackTrace(this, this.constructor)
    }

    static handle(res, err) {
        if (err instanceof this) {
            const error = JSON.parse(err.message)
            console.error(error)
            return res.status(error.code).send(error)
        }

        console.error(err)
        res.status(500).send({
            code: 500,
            status: 'Internal server error!',
            message: 'An error occured in server!',
            error: true
        })
    }
}

module.exports = HttpError