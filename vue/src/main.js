import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})

var members = [];

memberIDs.forEach(id => {
  $.ajax({
    url: '/user?id=' + id,
    success: user => {
      members.push({
        id: user._id,
        username: user.username,
        thumbnail: user.thumbnail
      })
    }
  })
})
