import Vue from 'vue'
import axios from 'axios'

import App from './App.vue'

var http = axios.create()
Vue.prototype.$http = http

var events = new Vue()
Vue.prototype.$events = events

new Vue({
  el: '#app',
  render: h => h(App)
})
