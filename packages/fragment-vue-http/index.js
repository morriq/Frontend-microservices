const { createServer } = require('http')
const { createReadStream } = require('fs')

const renderStream = require('./render-stream.js')
const { port } = require('./environment.js')

createServer((request, response) => {
	if (request.url === '/mock') {
		const file = createReadStream('mock.json')

		file.pipe(response)

		return
	}

	response.writeHead(200, {
		'Content-Type': 'text/html'
	})

	renderStream()
		.on('error', ({ message, stack }) => {
			console.log(message, stack)
		})
		.pipe(response)
}).listen(port)
