<template>
  <div id="members">
    <h1>Members</h1>
    <ul>
      <li v-for="member in members">
        <img class="member-thumbnail" :src="member.thumbnail" alt="Member thumbnail">
        <h4 v-if="you(member.id)" class="member-username">You</h4>
        <h4 v-else class="member-username">{{ member.username }}</h4>
        <span class="member-online" :class="{online: member.online}">&#9679;</span>
        <p class="member-status">{{member.status}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'members',
    data () {
      return {
        members: [],
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
      }
    },
    created(){
      var socket = io.connect();

      room.members.forEach(id => {
        $.ajax({
          url: '/user?id=' + id,
          success: user => {
            this.members.push({
              id: user._id,
              username: user.username,
              thumbnail: user.thumbnail,
              online: user.online,
              status: 'idle'
            })
          }
        })
      })

      socket.on('update', user => {
        this.members.forEach(member => {
          if(member.id === user.id){
            member[user.whatToUpdate] = user.updateTo;
          }
        })
      })
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
    flex-grow: 1;
    margin-left: 10px;
    display: inline-block;
    max-width: 350px;
    float: left;
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
  .member-online{
    margin: 0px;
    font-size: 1.4em;
    color: #ed3c3c;
    position: relative;
    right: 20px;
  }
  h1{
    padding-left: 10px;
  }
  .online{
    color: #93e83f;
    margin: 1px solid black;
  }
  .member-status{
    font-size: 1em;
    color: white;
    margin: 0px;
    display: inline;
    position: relative;
    right: 20px;
    bottom: 5px;
    color: rgb(240, 240, 240);
  }
</style>
