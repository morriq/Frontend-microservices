import { renderToNodeStream } from 'react-dom/server';

import entryServer from './src/entry-server.js'


module.exports = (request) => {
	return entryServer(request)
		.then(({ state, markup }) => ({
			stream: renderToNodeStream(markup),
			state
		}));
};
