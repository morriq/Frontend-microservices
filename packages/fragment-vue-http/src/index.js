import Vue from 'vue';

import createStore from './app/store.js';
import Applications from './app/Applications.vue';


export default function createApp() {
	const store = createStore();

	const app = new Vue({
		store,
		render: h => h(Applications)
	});

	return { app, store };
}
