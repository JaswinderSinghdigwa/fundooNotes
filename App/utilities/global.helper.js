/**
 * @module       utilities
 * @file         helper.js
 * @description  it contains the Hashing and Token
 * @author       Jaswinder Singh digwa
 */

var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class helperClass {

  hashing = (password,callback) => {
    bcrypt.hash(password, 10)
      .then((hash)=> {
        return callback(null,hash);
      }).catch((err)=> {
        callback(err,null);
      });
  }

  token = (data) => {
    const dataForToken = {
      id : data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      password : data.password,
      email: data.email
    };
    return jwt.sign({ dataForToken }, process.env.JWT_SECRET, { expiresIn: '24H' });
  }
  
  validateToken = (req, res, next) => {
    const Bearertoken = req.headers.authorization;
    const Arr = Bearertoken.split(" ");
    const token = Arr[1];
    try {
      if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
          if (error) {
            return res.status(400).send({ success: false, message: 'Invalid Token' });
          } else {
            req.user = decoded;
            next();
          }
        });
      } else {
        return res.status(401).send({ success: false, message: 'Authorisation failed! Invalid user' });
      }
    } catch (error) {
      return res.status(500).send({ success: false, message: 'Something went wrong!' });
    }
  }
  
  comparePassword = (password, result) => {
    return bcrypt.compareSync(password, result);
  }
 
};

module.exports = new helperClass();