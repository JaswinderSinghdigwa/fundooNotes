/*************************************************************************
* Purpose : to recieve request from routes and forward it to service layer
*
* @file : user.controller.js
* @author : Jaswinder Singh<findjassi121212@@gmail.com>
* @version : 1.0
*
**************************************************************************/
const service = require('../service/user.service.js')
const validation = require('../utilities/validation');
const { logger } = require('../../logger/logger');

class Controller {
  /**
	 * @description Registering new users
	 * @method register is a service class method
	 * @method validate validates inputs using Joi
	 */
  register =  (req, res) => {
    try {
      const userRegistrationInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      };
      const validationResult = validation.ValidationRegister.validate(userRegistrationInfo)
      if (validationResult.error) {
        logger.error('Failed To Validated Input');
          const response = { success: false, message: validationResult.error.message };
          return res.status(400).send(response);
      }
    const userRegisterService = service.register(userRegistrationInfo);
      userRegisterService.then((data)=>{
        logger.info('Successfully Resgistration is done');
        const response = { sucess : true, message : "Resgistration is done Successfully"}
        return res.status(200).json(response)
      }).catch((error)=>{
        logger.error('User with this email Id is alreday exists');
        const response = { sucess: false, message: "User is already exist", error : error }
        return res.status(400).json(response)
      })
      }
     catch (error) {
      if (error.name === 'MongoError' && error.code === 11000) {
        logger.error('User with this email Id is alreday exists');
        const response = { success: false, message: 'User with this email Id is alreday exists' };
        return res.status(409).send(response);
      }
      logger.error('Some error occured while registering');
      const response = { success: false, message: 'Some error occured while registering' };
      return res.status(500).send(response);
    }
  }

  /**
	 * @description User login API
	 * @method login is service class method
	 */
  login = (req, res) => {
    try {
      const LoginData = {
        email: req.body.email,
        password: req.body.password
      };
      const validationResult= validation.ValidationLogin.validate(LoginData);
      if (validationResult.error) {
        logger.error(validationResult.error);
        logger.error(validationResult.error);
        const response = { success: false, message: 'failed to validated Input' };
        return res.status(400).send(response);
      }
      service.login(LoginData) 
        .then((data)=>{
          if(!data){
            const response = { success: false, message: 'Authorization failed' };
            return res.status(401).send(response);
          }
            const response = { success: true, message: 'Token gernerator Successfully' , data:data}
            return res.status(200).json({response})
        }).catch((error)=>{
            const response = {success: false,message: 'Login Failed !',error,}
            return res.status(400).json({response})
          })
        }catch(err){
          const response = { success: false, message: 'Some error occured while registering' };
          return res.status(500).send(response);
      }
    }

  /**
	 * @description Sends resetpassword links to user's emailId
	 * @param req holds user email id
	 * @method forgotPassword is service class method
	 */
  forgotPassword = (req, res) => {
    try {
      const userInfo = {
        email: req.body.email
      };
      const validationResult = validation.validationforgotPassword.validate(userInfo);
      if (validationResult.error) {
        logger.error(error.message);
        const response = { success: false, message: 'failed to validated Input' };
        return res.status(400).send(response);
      }

      service.forgotPassword(userInfo, (error, data) => {
        if (error) {
          logger.error('failed to send email');
          const response = { success: false, message: 'failed to send email' };
          return res.status(400).send(response);
        }else {
          const response = { success: true, message: 'Email sent successfully' };
          return res.status(200).send(response);
        }
      });
    } catch (error) {
      logger.error('Some error occurred !');
      const response = { success: false, message: 'Some error occured while registering' };
      return res.status(500).send(response);
    }
  }

  /**
	 * @description New password will get updated after verifying token successfully
	 * @param req holds emailId and newPassword
	 * @param res sends the response 
	 */
   resetPassword = (req, res) => {
		try {
			const resetPasswordInfo = {
				email: req.body.email,
				password: req.body.password,
        code: req.body.code
			};
      const validationResult = validation.validateReset.validate(resetPasswordInfo);
			if (validationResult.error) {
				const response = { success: false, message: validationResult.error.message };
				return res.status(400).send(response);
			}

			service.resetPassword(resetPasswordInfo, (error, data) => {
				if (error) {
					logger.error(error.message);
					const response = { success: false, message: 'Falied to reset Password' };
					return res.status(400).send(response);
				}

				else if (!data) {
					logger.error('Authorization failed');
					const response = { success: false, message: 'Authorization failed' };
					return res.status(401).send(response);
				}
				else {
					const response = { success: true, message: 'Password has been changed !', data: resetPasswordInfo };
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

  confirmRegister = (req, res) => {
      const data = {
        token: req.params.token}
      service.confirmRegister(data, (error, data) => {
        if (error) {
          return res.status(404).json({
            success: false,
            message: "error"
          });
        } else {
          return res.status(200).json({
            success: true,
            message: "Email Successfully Verified",
            data: data
          });
        }
      });
    }
  };

module.exports = new Controller();