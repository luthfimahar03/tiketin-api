require('dotenv').config()

const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const routes = require('./routes')
const db = require('./config/db')

const server = express()
const port = process.env.SERVER_PORT || 9600

async function start() {
	try {
		console.log('Starting server...')
		server.use(express.urlencoded({ extended: true }))
		server.use(express.json())
		server.use(cors())
		server.use(fileUpload())
		server.use(logger('dev'))
		server.use(routes)
		
		db.connect(err => {
			if (err) throw err
			else {
				// started
				server.listen(port, () => {
					console.log(`\nServer running on: http://localhost:${port}`)
				})
			}
		})
	} catch (err) {
		console.error('\nAn error occured during start server:', err)
	}
}

start()
