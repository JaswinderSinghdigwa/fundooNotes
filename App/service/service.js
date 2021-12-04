const userModel = require('../models/note.model.js')
const helper = require('../utilities/helper');

class userService {
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

  userLogin = (InfoLogin, callback) => {
    userModel.loginModel(InfoLogin, (error, data) => {
      if (data) {
        let passwordResult = helper.comparePassword(InfoLogin.password, data.password);
        if (!passwordResult) {
          return callback("some error ocured !!!", null);
        }
        const token = helper.token(data);
        return callback(null, token);
      } else {
        return callback(error, null);
      }
    });
  }
}
module.exports = new userService();