const userModel = require('../models/user.model')
const helper = require('../utilities/helper');
const { logger } = require('../../logger/logger');
const nodemailer = require('../utilities/nodemailer.js');

class userService {

  /**
     * @description: Function sends new user info to model
     * @param {*} userData
     * @param {*} callback
     */

  register = (user, callback) => {
    userModel.register(user, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  }

    /**
     * @description: Function gets data from model, whether it is valid or not.
     * @param {*} loginData
     * @param {*} authenticateUser
     */

  login = (InfoLogin, callback) => {
    userModel.UserLogin(InfoLogin, (error, data) => {
      if (data) {
        let passwordResult = helper.comparePassword(InfoLogin.password, data.password);
        if (!passwordResult) {
          logger.error(error);
          return callback("some error ocured !!!", null);
        }
        const token = helper.token(data);
        logger.info(' token generated');
        return callback(null, token);
      } else {
        logger.error(error);
        return callback(error, null);
      }
    });
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
        } else if(!data) {
          console.log("!!! Some Error in your code",null)
        }
        else{
          return callback(null, nodemailer.sendEmail(data));
        }
      });
    }

     /**
     * @description it acts as a middleware between controller and model for reset password
     * @param {*} inputData
     * @param {*} callback
     * @returns
     */
  resetPassword = (userData, callback) => {
    userModel.resetPassword(userData, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    });
}
}

module.exports = new userService();