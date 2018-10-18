const { createServer } = require('http')

const { port } = require('./environment.js')
const microservices = require('./microservices.js')


const { requestHandler } = microservices()

createServer((request, response) => {
	if (request.url === '/favicon.ico') {
		response.writeHead(200, { 'Content-Type': 'image/x-icon' })
		response.end('')
		return
	}

	request.headers['x-request-uri'] = request.url
	request.url = '/index'

	requestHandler(request, response)
}).listen(port)
