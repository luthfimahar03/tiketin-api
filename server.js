require('dotenv').config()

const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const routes = require('./routes')

const server = express()
const port = process.env.SERVER_PORT || 9600

async function start() {
	try {
		server.use(express.urlencoded({ extended: true }))
		server.use(express.json())
		server.use(cors())
		server.use(fileUpload())
		server.use(logger('dev'))
		server.use(routes)

		// started
		server.listen(port, () => {
			console.log(`Server running on http://localhost:${port}\n`)
		})
	} catch (err) {
		console.error('An error occured during start server:', err)
	}
}

start()
