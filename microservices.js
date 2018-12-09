const Tailor = require('node-tailor')
const filterReqHeadersFn = require('node-tailor/lib/filter-headers.js')


module.exports = ({ agent }, tracer) => {
	return new Tailor({
		handledTags: ['script'],
		filterRequestHeaders(attributes, request) {
			return {
				...filterReqHeadersFn(attributes, request),
				'Custom-header': 12312312312
			}
		},
		fetchContext: async () => {
			const [ services, error ] = await agent.service.list()
				.then((result) => [ result ])
				.catch((error) => [, error ])

			error && 'do spana i zabic serwer'

			const urls = Object.values(services)
				.map(({ Address, Port }) => 'http://' + Address + ':' + Port)

			return Promise.resolve(
				Object.keys(services)
					.reduce((prev, curr, index) => ({
						...prev,
						[curr]: {
							src: urls[index]
						}
					}), {})
			)
		},
		tracer
	})
}
