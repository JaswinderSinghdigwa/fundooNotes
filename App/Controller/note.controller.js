const userService = require('../service/service.js')
const validation = require('../utilities/validation');
const helper = require('../utilities/helper');


class Controller {
  register = (req, res) => {
    try {
      let password = helper.hashedPassword(req.body.password);
      console.log("pswd", password);
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: password
      };

      const registerValidation = validation.ValidationRegister.validate(user);
      if (registerValidation.error) {
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
          return res.status(200).json({
            success: true,
            message: "User Registered",
            data: data,
          });
        }
      });
    } catch (error) {
      // console.log("error >>>>>", error);
      return res.status(500).json({
        success: false, message: "Error While Registering",
        data: null,
      });
    }
  }

  login = (req, res) => {
    try {
      let paswd = (req.body.password);
      const userLoginInfo = {
        email: req.body.email,
        password: paswd
      };

      const loginValidation = validation.ValidationLogin.validate(userLoginInfo);
      if (loginValidation.error) {
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
        } else {
          console.log("data", data);
          let paswordResult = helper.comparePassword(paswd, data.password);
          console.log("paswordResult", paswordResult);
          return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: data
          });
        }
      });
    }
    catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error while Login', error,
        data: null
      });
    }
  };
}
module.exports = new Controller();