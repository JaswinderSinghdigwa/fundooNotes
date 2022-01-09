const mongoose = require('mongoose');
const oneTimePasswordSchema = mongoose.Schema({
  email: String,
  code: String,
  expireIn: Number
}, {
  timestamps: true
});
const oneTimePassWord = mongoose.model('oneTimePassword', oneTimePasswordSchema, 'oneTimePassword');
module.exports = oneTimePassWord; 