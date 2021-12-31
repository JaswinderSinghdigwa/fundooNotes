const userModel = require('../models/user.mdl')
const helper = require('../utilities/global.helper');
const { logger } = require('../../logger/logger');
const nodemailer = require('../utilities/nodemailer.js');
const { token } = require('../utilities/global.helper');

class userService {

  /**
     * @description: Function sends new user info to model
     * @param {*} userData
     * @param {*} callback
     */

  register =  (user) => {
    return new Promise((resolve,reject)=>{
    let userRegister = userModel.register(user);
      userRegister.then((data)=>{
        resolve(data);
      }).catch((error)=>{
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
    return new Promise((resolve,reject)=>{
      let result = userModel.UserLogin(InfoLogin)
      result.then((data)=> {
        let passwordResult = helper.comparePassword(InfoLogin.password, data.password);
        if (!passwordResult) {
          logger.error(error);
          resolve("password is not hashed");
        }
        const token = helper.token(data);
        logger.info(' token generated');
        resolve(token);
      }).catch((error)=>{
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