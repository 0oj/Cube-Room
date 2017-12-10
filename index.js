const express = require('express');

const port = process.env.PORT || 10003;

var app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(port, () => console.log(`Listening at port ${port}`))
