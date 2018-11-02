const { createReadStream } = require('fs')
const { parse } = require('url')
const { createServer } = require('http')

const { presets } = require('./.babelrc.js')

require('@babel/register')({
  presets
})

const renderStream = require('./render-stream.js')
const { port, getUrl } = require('./environment.js')

createServer(async (request, response) => {
	const { pathname } = parse(request.url)

	const bundle = '/dist/bundle.js'
	const pathToBundle = `.${bundle}`

	switch(pathname) {
		case bundle:
			response.writeHead(200, { 'Content-Type': 'application/javascript' })
			createReadStream(pathToBundle)
				.pipe(response)
			break
		default:
			response.writeHead(200, {
				'Content-Type': 'text/html',
				'Link': `<${getUrl(bundle)}>; rel="fragment-script"`
			})

			const { stream } = await renderStream()

			stream.pipe(response)
	}
}).listen(port)
