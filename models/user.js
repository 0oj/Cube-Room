const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  googleId: String,
  githubId: String,
  twitterId: String,
  wcaId: String,
  WCAID: String,
  linkedinId: String,
  facebookId: String,
  emails: [String],
  thumbnail: String,
  provider: String,
  online: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
