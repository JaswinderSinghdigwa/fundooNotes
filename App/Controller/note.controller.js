const userService = require('../service/service.js')
const validation = require('../utilities/validation');
const { logger } = require('../../logger/logger');
class Controller {

  /**
     * @description : Function created to add user into database
     * @param {*} req
     * @param {*} res
     * @returns
     */

  register = (req, res) => {
    try {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      };

      const registerValidation = validation.ValidationRegister.validate(user)
      if (registerValidation.error) {
        logger.error('Wrong Input Validations');
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: registerValidation
        });
      }

      userService.registerUser(user, (error, data) => {
        if (error) {
          return res.status(400).json({
            success: false,
            message: 'User already exist',
          });
        } else {
          logger.info('User registered');
          return res.status(200).json({
            success: true,
            message: "User Registered",
            data: data,
          });
        }
      });
    } catch (error) {
      logger.error('Internal server error');
      return res.status(500).json({
        success: false, message: "Error While Registering",
        data: null,
      });
    }
  }

  /**
    * @description: Function created to verify user login info
    * @param {*} req
    * @param {*} res
    */

  login = (req, res) => {
    try {
      const userLoginInfo = {
        email: req.body.email,
        password: req.body.password
      };

      const loginValidation = validation.ValidationLogin.validate(userLoginInfo);
      if (loginValidation.error) {
        logger.error(loginValidation.error);
        res.status(400).send({
          success: false,
          message: loginValidation.error.message
        });
      }

      userService.userLogin(userLoginInfo, (error, data) => {
        if (error) {
          return res.status(400).json({
            success: false,
            message: 'Unable to login. Please enter correct info',
            error
          });
        }
        return res.status(200).json({
          success: true,
          message: 'User logged in successfully',
          data: data
        });
      });
    }
    catch (error) {
      console.log("In Catch", error);
      return res.status(500).json({
        success: false,
        message: 'Error while Login', error,
        data: null
      });
    }
  };

  /**
     * description controller function for forgot password
     * @param {*} req
     * @param {*} res
     * @returns
     */

   forgotPassword = (req, res) => {
    try {
      const userCredential = {
        email: req.body.email
      };
      const validationforgotPassword = validation.validationforgotPassword.validate(userCredential);

      if (validationforgotPassword.error) {
        logger.error('Wrong Input Validations');
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: validationforgotPassword
        });
      }

      userService.forgotPassword(userCredential, (error, result) => {
        if (error) {
          return res.status(400).send({
            success: false,
            message: 'failed to send email',
            error
          });
        } else {
          return res.status(200).send({
            success: true,
            message: 'Email sent successfully',
            result
          });
        }
      });
    } catch (error) {
      logger.error('Internal server error');
      return res.status(500).send({
        success: false,
        message: 'Internal server error',
        result: null
      });
    }
  }
   /**
     * description controller function for Reset password
     * @param {*} req
     * @param {*} res
     * @returns
     */

  resetPassword=(req, res) => {
    try {
      const userData = {
        email: req.body.email,
        password: req.body.password,
        code:req.body.code
      };

      const resetVlaidation = validation.validateReset.validate(userData);
      if (resetVlaidation.error) {
        logger.error('Invalid password');
        res.status(422).send({
          success: false,
          message: 'Invalid password'
        });
        return;
      }

      userService.resetPassword(userData, (error, userData) => {
        if (error) {
          logger.error(error);
          return res.status(400).send({
            message: error,
            success: false
          });
        } else {
          logger.info('Password reset succesfully');
          return res.status(200).json({
            success: true,
            message: 'Password reset succesfully',
            data: userData
          });
        }
      });
    } catch (error) {
      console.log("3333",error);
      logger.error('Internal server error');
      return res.status(500).send({
        success: false,
        message: 'Internal server error',
        data: null
      });
    }
  }
}

module.exports = new Controller();