const express = require('express');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const User = require('./models/user');

const port = process.env.PORT || 10003;

var app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}))

app.use(passport.initialize());
app.use(passport.session());

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongodb.dbURI, () => console.log('Conected to MongoDB'))

app.use('/auth', require('./routes/auth'))
app.use(require('./routes/dashboard'))
app.use(require('./routes/room'))


var server = app.listen(port, () => console.log(`Listening at port ${port}`))

var io = socket(server)

io.on('connection', socket => {
  socket.on('online', id => User.findByIdAndUpdate(id, {online: true}, (err, user) => io.sockets.emit('update', {id: user._id, whatToUpdate: 'online', updateTo: true})))
  socket.on('offline', id => User.findByIdAndUpdate(id, {online: false}, (err, user) => io.sockets.emit('update', {id: user._id, whatToUpdate: 'online', updateTo: false})))
})
