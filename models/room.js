const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  name: String,
  members: [String]
});

const Room = mongoose.model('room', RoomSchema);

module.exports = Room;
