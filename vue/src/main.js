import Vue from 'vue'
import App from './App.vue'
import Members from './Members.vue';

Vue.component('members', Members)

new Vue({
  el: '#app',
  render: h => h(App)
})
