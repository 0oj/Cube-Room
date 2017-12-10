var Timer = new Vue({
  el: '#wrapper',
  data: {
    count: 0,
    counter: null
  },
  mounted: function(){
    $('#wrapper').keyup(this.startTimer);
  },
  methods: {
    startTimer: function(e){
      console.log('startTimer');
      if (e.keyCode === 32){
        this.counter = setInterval(() => this.count++, 10);
        $('#wrapper').unbind('keyup')
        $('#wrapper').keyup(this.stopTimer)
      }
    },
    stopTimer: function(e){
      console.log('stopTimer');
      if (e.keyCode === 32) {
        clearInterval(this.counter)
      }
    }
  }
})
