/**
 * @module       utilities
 * @file         helper.js
 * @description  it contains the Hashing and Token
 * @author       Jaswinder Singh
 */

var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class helperClass {
  token = (data) => {
    const dataForToken = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email
    };
    return jwt.sign({ dataForToken }, process.env.JWT_SECRET, { expiresIn: '1H' });
  }
  
  comparePassword = (password, result) => {
    return bcrypt.compareSync(password, result);
  }
};

module.exports = new helperClass();
