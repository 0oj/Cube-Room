const express = require('express');

const port = process.env.PORT || 10003;

var app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use('/auth', require('./routes/auth'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(port, () => console.log(`Listening at port ${port}`))
