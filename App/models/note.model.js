var Promise = require("bluebird");
const bcrypt = Promise.promisifyAll(require("bcrypt"));
const mongoose = require('mongoose');
const { logger } = require('../../logger/logger')
const Otp = require('../models/otp.model')
const utilities = require('../utilities/helper')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    })
userSchema.pre('save', async function (next) { // this line
    const user = this;
    console.log(user.isModified);
    console.log(user.isModified());
    console.log(user.isModified('password'));
    if (!user.isModified('password'))
        return next();
    user.password = await bcrypt.hashSync(user.password, 8);
    next();
});

const user = mongoose.model('User', userSchema);

class userModel {

    /**
     * @description: Adds data to the database
     * @param {object} userDetails
     * @param {function} callback
     */
    registerUser = (userDetails, callback) => {
        const newUser = new user();
        newUser.firstName = userDetails.firstName;
        newUser.lastName = userDetails.lastName;
        newUser.email = userDetails.email;
        newUser.password = userDetails.password;

        newUser.save((error, data) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, data);
            }
        });
    };

    /**
    * @description: Authenticates user information from the database
    * @param {*} loginData
    * @param {mongoose method} findone
    * */

    loginModel = (loginData, callBack) => {
        //To find a user email in the database
        user.findOne({ email: loginData.email }, (error, data) => {
            if (error) {
                console.log("3333", error);
                logger.error('Find error while loggin user');
                return callBack(error, null);
            } else if (!data) {
                logger.error('Invalid User');
                return callBack("Invalid Credential", null);
            } else {
                logger.info('Email id found');
                return callBack(null, data);
            }
        });
    }

    /**
     * @description mongoose function for forgot password
     * @param {*} email
     * @param {*} callback
     */
    forgotPassword = (data, callback) => {
        user.findOne({ email: data.email }, (err, data) => {
          if (err) {
            logger.error('User with email id doesnt exists');
            return callback('User with email id doesnt exists', null);
          } else {
            return callback(null, data);
          }
        });
        }

    /**
  * @description mongoose function for Reset password
  * @param {*} email
  * @param {*} callback
  */
    resetPassword = (userData) => {
        return new Promise((resolve, reject) => {
            Otp.findOne({ code: userData.code })
                .then((data) => {
                    if (userData.code == data.code) {
                        utilities.hashing(userData.password)
                            .then((hash) => {
                                userData.password = hash;
                                user.updateOne({ email: userData.email }, { '$set': { "password": userData.password } })
                                    .then((data) => {
                                        resolve(data)
                                    }).catch((error) => {
                                        reject(error)
                                    })
                            }).catch((error) => {
                                rejct(error)
                            })
                    } else {
                        reject(null)
                    }
                }).catch((error) => {
                    reject("Otp doesnt match", null)
                });
        });
    }
}
module.exports = new userModel();
