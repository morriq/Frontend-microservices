import axios from 'axios'
import React from 'react'

import createApp from './index.js'


export default () => {
	return axios.get('https://applications-tracker-beta.pracuj.pl/user-applications/fake?limit=500')
		.catch(() => ({
			data: {
				results: []
			}
		}))
		.then(({ data }) => data.Applications)
		.then((state) => {
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
			);
			return {
				state,
				markup
			};
		});
};
