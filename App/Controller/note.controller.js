const userService = require('../service/service.js')
const validation = require('../utilities/validation');
const jwt = require('jsonwebtoken');

class Controller {
  register = (req, res) => {
    try {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      };

      const registerValidation = validation.Validation(user);
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
      console.log(error);
      return res.status(500).json({
        success: false, message: "Error While Registering",
        data: null,
      });
    }
  }

  login = (req, res) => {
    try {
      const userLoginInfo = {
        email: req.body.email,
        password: req.body.password
      };
      const loginValidation = validation.ValidationLogin.validate(userLoginInfo);
      if (loginValidation.error) {
        res.status(400).send({
          success: false,
          message: loginValidation.error.message
        });
      }

      userService.userLogin(userLoginInfo, (error, dataToken) => {
        if (error) {
          console.log("error error", error);
          return res.status(400).json({
            success: false,
            message: 'Unable to login. Please enter correct info',
            error
          });
        } else {
          return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            token: dataToken,
          });
        }
      });
    }
    catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'Error while Login', error,
        data: null
      });
    }
  };

  dashboardControl = (req, res, next) => {
    console.log("bearerHeader", req.token);
    jwt.verify(req.token, process.env.JWT_SECRET, function (err, data) {
      if (err) {
        console.log("error", err);
        res.sendStatus(403);
      } else {
        console.log("bearerHeader");
        next();
        res.json({
          text: "this is protected",
          data: data
        });
      }
    });
  }
}
module.exports = new Controller();