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

  resetPassword = (userData, callback) => {
    helper.getEmailFromToken(userData.token, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        const inputData = {
          email: data.dataForToken.email,
          password: userData.password
        };
        userModel.resetPassword(inputData, (error, data) => {
          if (error) {
            logger.error(error);
            return callback(error, null);
          } else {
            return callback(null, data);
          }
        });
      }
    });
  }
};

module.exports = new helperClass();
