/**
 * @module       utilities
 * @file         helper.js
 * @description  it contains the Hashing and Token
 * @author       Jaswinder Singh
 */

var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class helperClass {
  token = (data ,callback) => {
    jwt.sign(
      {
      id: data._id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email
    },
    process.env.JWT_SECRET,
      (err, data) => {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, data);
        }
      });
  }

  comparePassword = (password, result) => {
    return bcrypt.compareSync(password, result);
  }
};

module.exports = new helperClass();
