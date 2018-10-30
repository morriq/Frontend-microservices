import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const { applicationsApiUrl } = require('./../../environment.js')

Vue.use(Vuex)

export default function createStore() {
	return new Vuex.Store({
		state: {
			items: []
		},
		actions: {
			fetchItems({ commit }) {

				const instance = axios.create({
					baseURL: applicationsApiUrl,
					timeout: 1000
				});

				return instance.get('/user-applications/fake?limit=500')
					.then(({ data }) => {
						commit('setItems', data.Applications)
					})
			}
		},
		mutations: {
			setItems(state, items) {
				state.items = items
			}
		}
	})
}
