const userModel = require('../models/note.model.js')
const helper = require('../utilities/helper');
const { logger } = require('../../logger/logger');
const nodemailer = require('../utilities/nodemailer.js');

class userService {

  /**
     * @description: Function sends new user info to model
     * @param {*} userData
     * @param {*} callback
     */

  registerUser = (user, callback) => {
    userModel.registerUser(user, (err, data) => {
      if (err) {
        console.log("error->service", err);
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

  userLogin = (InfoLogin, callback) => {
    userModel.loginModel(InfoLogin, (error, data) => {
      if (data) {
        let passwordResult = helper.comparePassword(InfoLogin.password, data.password);
        if (!passwordResult) {
          logger.error(error);
          return callback("some error ocured !!!", null);
        }
        const token = helper.token(data);
        logger.info(' token generated ');
        return callback(null, token);
      } else {
        logger.error(error);
        return callback(error, null);
      }
    });
  }

  /** 
    @description: Function gets data from model, whether it is valid or not.
     * @param {*} user
     * @param {*} callback
     */

forgotPassword = (email, callback) => {
  userModel.forgotPassword(email, (error, data) => {
    if (error || !data) {
      console.log("error",error);
      logger.error(error);
      return callback(error, null);
    } else {
      return callback(null, nodemailer.sendEmail(data));
    }
  });
}

resetPassword = (userData, callback) => {
  if (error) {
    logger.error(error);
    return callback(error, null);
  } else {
    return callback(null, data);
  }
});
}

module.exports = new userService();