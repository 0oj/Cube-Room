const express = require('express');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const port = process.env.PORT || 10003;

var app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use('/auth', require('./routes/auth'))

mongoose.connect(keys.mongodb.dbURI, () => console.log('Conected to MongoDB'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(port, () => console.log(`Listening at port ${port}`))
