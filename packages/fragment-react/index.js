const renderToNodeStream = require('react-dom/server.js')
const createApp = require('./src')
const entryServer = require('./src/entry-server.js')
const React = require('react')
const { createServer } = require('http')

const { presets } = require('./.babelrc.js')

require('@babel/register')({
    presets
})

const { port } = require('./environment.js')

createServer((request, response) => {

  entryServer(request)
    .then(state => {
      const markup = (
        <div id="contacts">
          <style>
            { `.recommendation {
							width: 250px;
							padding: 10px;
							margin: 10px;
							box-shadow: 0 0 10px black;
							display: inline-block;
							}
						`}
          </style>
          {createApp(state)}
        </div>
      )

      const foo = renderToNodeStream(markup)


      foo.on('end', () => {
        response.end()
      })

      response.pipe(foo)
    })

}).listen(port)
