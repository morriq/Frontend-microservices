import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const { port, hostname } = require('./../../environment.js')

Vue.use(Vuex)

export default function createStore() {
	return new Vuex.Store({
		state: {
			items: []
		},
		actions: {
			fetchItems({ commit }) {
				return axios.get(`http://localhost:${port}/mock`)
					.then(({ data }) => {
						commit('setItems', data)
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
