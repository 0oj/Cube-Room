<template>
  <div id="members">
    <h1>Members</h1>
    <ul>
      <li v-for="member in members">
        <img class="member-thumbnail" v-bind:src="member.thumbnail" alt="Member thumbnail">
        <h4 class="member-username">{{ member.username }}</h4>
        <p class="member-id">{{ member.id }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
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

  export default {
    name: 'members',
    data () {
      return {
        members: members
      }
    }
  }

</script>

<style scoped>
  li{
    list-style-type: none;
    margin: 4px;
    padding: 4px;
    border: 1px solid white;
  }
  ul{
    padding-left: 0px;
    padding: 5px;
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
    border-right: 1px solid white;
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
