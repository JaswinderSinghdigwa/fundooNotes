/**
 * @module       utilities
 * @file         helper.js
 * @description  it contains the Hashing and Token
 * @author       Jaswinder Singh digwa
 */

var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class helperClass {

  hashing = (password, callback) => {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        return callback(err,null);
      } else {
        return callback(null, hash);
      }
    });
  }

  token = (data) => {
    const dataForToken = {
      firstName: data.firstName,
      lastName: data.lastName,
      password : data.password,
      email: data.email
    };
    return jwt.sign({ dataForToken }, process.env.JWT_SECRET, { expiresIn: '1H' });
  }
  
  comparePassword = (password, result) => {
    return bcrypt.compareSync(password, result);
  }
 
};

module.exports = new helperClass();
