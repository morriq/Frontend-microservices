const {renderToNodeStream } = require('react-dom/server.js')
const entryServer = require('./src/entry-server.js')
const React = require('react')
const { createServer } = require('http')
const { Contacts, createStore, Provider } = require('./build/static/ssr/main.js');

const { port } = require('./environment.js')

const reactElement = React.createElement(Contacts)


createServer((request, response) => {

  entryServer(request)
    .then(state => {
    	const p = React.createElement(Provider, { store : createStore(state) }, reactElement)

      const foo = renderToNodeStream(p)


      foo.on('end', () => {
        response.end()
      })

			foo.pipe(response)
    })

}).listen(port)
