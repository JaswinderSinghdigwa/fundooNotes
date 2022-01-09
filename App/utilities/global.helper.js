/**
 * @module       utilities
 * @file         helper.js
 * @description  it contains the Hashing and Token
 * @author       Jaswinder Singh digwa
 */

var bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

class helperClass {

  hashpassword = (password, callback) => {
    bcrypt.hash(password, 10)
      .then((hashpassword) => {
        return callback(null, hashpassword);
      }).catch((err) => {
        callback(err, null);
      });
  }

  userToken = (data) => {
    const decodedtoken = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      email: data.email
    };
    return jsonwebtoken.sign({ decodedtoken }, process.env.JWT_SECRET, { expiresIn: '24H' });
  }

  decodeToken = (req, res, next) => {
    const Bearertoken = req.headers.authorization;
    const Arr = Bearertoken.split(" ");
    const token = Arr[1];
    if (token) {
      const header = req.headers.authorization;
      const myArr = header.split(" ");
      const token = myArr[1];
      try {
        if (token) {
          jsonwebtoken.verify(token, process.env.JWT_SECRET, (error, decoded) => {
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
  }
  comparison = (password, passResult) => {
    return bcrypt.compare(password, passResult);
  }

  jwtTokenVerifyMail = (payload, secretkey, callback) => {
    jsonwebtoken.sign(
      { email: payload.email },
      secretkey,
      { expiresIn: "50h" },
      (err, token) => {
        if (err) {
          return callback("token not generated", null);
        } else {
          return callback(null, token);
        }
      }
    );
  };
};
module.exports = new helperClass();
