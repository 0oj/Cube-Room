<template>
  <div id="timer" tabindex="1">
    {{count/100}} s
  </div>
</template>

<script>
  export default {
    name: 'timer',
    data () {
      return {
        count: 0,
        counter: null
      }
    },
    created(){
      var socket = io.connect();
    },
    mounted(){
      $(window).keyup(this.startTimer);
    },
    methods: {
      startTimer: function(e){
        console.log('startTimer');
        if (e.keyCode === 32){
          this.counter = setInterval(() => this.count++, 10);
          $(window).unbind('keyup')
          $(window).keydown(this.stopTimer)
        }
      },
      stopTimer: function(e){
        console.log('stopTimer');
        if (e.keyCode === 32) {
          clearInterval(this.counter)
        }
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
