const userModel = require('../models/user.model')
const helper = require('../utilities/global.helper');
const { logger } = require('../../logger/logger');
const nodemailer = require('../utilities/rabbitMqmail');
const mailer = require('../utilities/nodemailer')
const rabbitMQ = require("../Connector/rabbitMq");
const jwt = require('jsonwebtoken')
const utilities = require('../utilities/global.helper')
const { usertoken } = require('../utilities/global.helper');

class userService {

  /**
     * @description: Function sends new user info to model
     * @param {*} userData
     * @param {*} callback
     */

  register = (user) => {
    return new Promise((resolve, reject) => {
      let userRegister = userModel.register(user);
      userRegister.then((data) => {
        // Send Welcome Mail to User on his Mail
        nodemailer.sendWelcomeMail(user);
        const secretkey = process.env.JWT_SECRET;
        utilities.jwtTokenVerifyMail(data, secretkey, (err, token) => {
          if (token) {
            rabbitMQ.sender(data, data.email);
            mailer.verifyMail(token, data);
            resolve(token)
          } else {
            resolve(null)
          }
        })
        resolve(data);
      }).catch((error) => {
        reject(error)
      })
    })
  }

  /**
   * @description: Function gets data from model, whether it is valid or not.
   * @param {*} loginData
   * @param {*} authenticateUser
   */

  login = (InfoLogin) => {
    return new Promise((resolve, reject) => {
      let result = userModel.UserLogin(InfoLogin)
      result.then((data) => {
        let passwordResult = helper.comparison(InfoLogin.password, data.password);
        if (!passwordResult) {
          logger.info(error);
          resolve("password is not hashed");
        }
        const usertoken = helper.userToken(data);
        logger.info(' token generated');
        resolve(usertoken);
      }).catch((error) => {
        logger.error(error);
        reject(error);
      })
    })
  }


  /** 
    @description: Function gets data from model, whether it is valid or not.
     * @param {*} email
     * @param {*} callback
     */

  forgotPassword = (user, callback) => {
    userModel.forgotPassword(user, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else if (!data) {
        logger.log("!!! Some Error in your code")
      }
      else {
        return callback(null, mailer.sendEmail(data));
      }
    });
  }

  /**
  * @description it acts as a middleware between controller and model for reset password
  * @param {*} inputData
  * @param {*} callback
  * @returns
  */
  resetPassword = (resetPasswordInfo, callback) => {
    userModel.resetPassword(resetPasswordInfo, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    });
  }

  confirmRegister = (data, callback) => {
    const decode = jwt.verify(data.token, process.env.JWT_SECRET);
    if (decode) {
      rabbitMQ
        .receiver(decode.email)
        .then((val) => {
          userModel.confirmRegister(JSON.parse(val), (error, data) => {
            if (data) {
              return callback(null, data);
            } else {
              return callback(error, null);
            }
          });
        })
        .catch((error) => {
          logger.error(error);
        });
    }
  };
}

module.exports = new userService();