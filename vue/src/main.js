import Vue from 'vue'
import App from './App.vue'
import Members from './Members.vue';
import Timer from './Timer.vue';


Vue.component('members', Members)
Vue.component('timer', Timer)

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
