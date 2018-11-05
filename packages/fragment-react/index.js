const { createServer } = require('http');

const { presets } = require('./.babelrc.js');

require('@babel/register')({
    presets
});

const renderStream = require('./render-stream.js');
const { port } = require('./environment.js');

createServer(async (request, response) => {

    const { stream } = await renderStream(request);

    stream.pipe(response)

  stream.on('end', () => {
    response.end();
  });

}).listen(port);
