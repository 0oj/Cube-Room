<template>
  <div id="members">
    <h1>Members</h1>
    <ul>
      <li v-for="member in members">
        <img class="member-thumbnail" v-bind:src="member.thumbnail" alt="Member thumbnail">
        <h4 v-if="you(member.id)" class="member-username">You</h4>
        <h4 v-else class="member-username">{{ member.username }}</h4>
        <p class="member-online">{{ online(member.online) }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  var socket = io.connect();

  var members = [];

  memberIDs.forEach(id => {
    $.ajax({
      url: '/user?id=' + id,
      success: user => {
        members.push({
          id: user._id,
          username: user.username,
          thumbnail: user.thumbnail,
          online: user.online
        })
      }
    })
  })

  socket.on('update', user => {
    members.forEach(member => {
      if(member.id === user.id){
        member.online = user.online;
      }
    })
  })


  export default {
    name: 'members',
    data () {
      return {
        members: members,
        userID: userID
      }
    },
    methods: {
      you(id){
        if (id === userID) {
          return true
        }else{
          return false
        }
      },
      online(online){
        if (online) {
          return "online"
        } else {
          return "offline"
        }
      }
    }
  }
</script>

<style scoped>
  li{
    list-style-type: none;
    margin: 4px;
    margin-left: 0px;
    padding: 4px;
    padding-left: 8px;
  }
  ul{
    padding-left: 0px;
    padding: 5px;
    height: 420px;
    overflow-y: auto;
  }
  #members{
    background-color: #ff5353;
    margin-top: 15px;
    color: white;
    width: 320px;
    margin-left: 10px;
  }
  .member-thumbnail{
    float: left;
    height: 48px;
    padding-right: 2px;
    margin-right: 4px;
    border-radius: 50%;
  }
  .member-username{
    margin: 0px;
    font-size: 1.2em;
  }
  .member-id{
    margin: 0px;
    font-size: 1em;
  }
  h1{
    padding-left: 5px;
  }
</style>
