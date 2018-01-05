import Vue from 'vue'
import App from './App.vue'
import Members from './Members.vue';

Vue.component('members', Members)

new Vue({
  el: '#app',
  render: h => h(App)
})

var socket = io.connect()

socket.emit('online', userID)
window.onbeforeunload = () => {
  socket.emit('offline', userID)
  return null;
}
