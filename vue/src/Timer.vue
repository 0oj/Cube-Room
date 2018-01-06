<template>
  <div id="timer" tabindex="1">
    {{getTime}}
  </div>
</template>

<script>
  var socket = io.connect();

  export default {
    name: 'timer',
    data () {
      return {
        start: 0,
        elapsed: 0,
        counter: null
      }
    },
    created(){
      socket.on('solved', data => {
        if (data.roomID === room._id) {
          $.ajax({
            url: '/user?id=' + data.userID,
            success(user){
              alert(`${user.username} solved in ${(data.time/1000).toFixed(2)}secs`)
            }
          })
        }
      })
    },
    mounted(){
      $(window).keyup(this.startTimer);
    },
    methods: {
      startTimer(e){
        if (e.keyCode === 32){
          this.start = performance.now()
          this.counter = setInterval(() => {
            this.elapsed = performance.now() - this.start;
          })
          $(window).unbind('keyup')
          $(window).keydown(this.stopTimer)
        }
      },
      stopTimer(e){
        if (e.keyCode === 32) {
          clearInterval(this.counter);
          socket.emit('solved', {
            userID: userID,
            roomID: room._id,
            time: this.elapsed
          })

          $(window).unbind('keydown')
        }
      }
    },
    computed: {
      getTime(){
        let millis = this.elapsed.toFixed(0);
        let minutes = Math.floor(millis / (1000 * 60) % 60);
        let seconds = Math.floor(millis / 1000 % 60);
        let hundreths = Math.floor(millis /10 % 100);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        hundreths = hundreths < 10 ? '0' + hundreths : hundreths;

        return minutes + ':' + seconds + ':' + hundreths;
      }
    }
  }
</script>

<style scoped>
  #timer{
    flex-grow: 5;
    height: 492px;
    border: 1px solid #ff5353;
    margin: 10px;
    margin-top: 15px;
    margin-bottom: 0px;
  }
</style>
