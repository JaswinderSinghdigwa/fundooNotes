const userService = require('../service/service.js')
const validation = require('../utilities/validation');
const { logger } = require('../../logger/logger');
const { database } = require('faker/locale/en_BORK');

/*************************************************************************
* Purpose : to recieve request from routes and forward it to service layer
*
* @file : user.controller.js
* @author : Jaswinder Singh<findjassi121212@@gmail.com>
* @version : 1.0
*
**************************************************************************/

class Controller {
  /**
	 * @description Registering new users
	 * @method register is a service class method
	 * @method validate validates inputs using Joi
	 */
  register = (req, res) => {
    try {
      const userRegistrationData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      };
      const validationResult = validation.ValidationRegister.validate(userRegistrationData)
      if (validationResult.error) {
        logger.error('Wrong Input Validations');
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: validationResult.error.message
        });
      }
      userService.register(userRegistrationData, (error, data) => {
        if (error) {
          logger.error('User with this email Id is alreday exists');
          return res.status(400).json({
            success: false,
            message: 'User already exist',
          });
        } else {
          logger.info('Registration is done successfully !');
          return res.status(200).json({
            success: true,
            message: 'Registration is done successfully !',
            data: data,
          });
        }
      });
    } catch (error) {
      logger.error('Some error occurred !');
      return res.status(500).json({
        success: false, 
        message: "Some error occurred !",
      });
    }
  }

  /**
	 * @description User login API
	 * @method login is service class method
	 */
  login = (req, res) => {
    try {
      const userLoginData = {
        email: req.body.email,
        password: req.body.password
      };

      const validationResult= validation.ValidationLogin.validate(userLoginData);
      if (validationResult.error) {
        logger.error(validationResult.error);
        res.status(400).send({
          success: false,
          message: validationResult.error.message
        });
      }

      userService.login(userLoginData, (error, data) => {
        if (error) {
					logger.error(error.message);
          return res.status(400).json({
            success: false,
            message: error.message,
          });
        }
        return res.status(200).json({
          success: true,
          message: 'Login Successfull !',
          data: data
        });
      });
    }
    catch (error) {
      logger.error('Some error occurred !');
      return res.status(500).json({
        success: false,
        message: 'Some error occurred !', 
        data: null
      });
    }
  };

  /**
	 * @description Sends resetpassword links to user's emailId
	 * @param req holds user email id
	 * @method forgotPassword is service class method
	 */
  forgotPassword = (req, res) => {
    try {
      const userData = {
        email: req.body.email
      };
      const validationResult = validation.validationforgotPassword.validate(userData);

      if (validationResult.error) {
        logger.error(error.message);
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
        });
      }

      userService.forgotPassword(userData, (error, data) => {
        if (error) {
          logger.error(error.message);
          return res.status(400).send({
            success: false,
            message: 'failed to send email',
          });
        }else {
          return res.status(200).send({
            success: true,
            message: 'Email sent successfully',
            data : data
          });
        }
      });
    } catch (error) {
      logger.error('Some error occurred !');
      return res.status(500).send({
        success: false,
        message: 'Some error occurred !'
      });
    }
  }

  /**
	 * @description New password will get updated after verifying token successfully
	 * @param req holds emailId and newPassword
	 * @param res sends the response 
	 */
   resetPassword = (req, res) => {
		try {
			const resetPasswordData = {
				email: req.body.email,
				password: req.body.password,
        code: req.body.code
			};
      const validationResult = validation.validateReset.validate(resetPasswordData);
			if (validationResult.error) {
				const response = { success: false, message: validationResult.error.message };
				return res.status(400).send(response);
			}

			userService.resetPassword(resetPasswordData, (error, data) => {
				if (error) {
					logger.error(error.message);
					const response = { success: false, message: error.message };
					return res.status(400).send(response);
				}

				else if (!data) {
					logger.error('Authorization failed');
					const response = { success: false, message: 'Authorization failed' };
					return res.status(401).send(response);
				}
				else {
					const response = { success: true, message: 'Password has been changed !', data: resetPasswordData };
					logger.info('Password has benn changed !');
					res.status(200).send(response);
				}
			});
		}
		catch (error) {
			logger.error('Some error occurred !');
			const response = { success: false, message: 'Some error occurred !' };
			res.status(500).send(response);
		}
	}
}

module.exports = new Controller();