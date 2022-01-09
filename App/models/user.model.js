var Promise = require("bluebird");
const bcrypt = Promise.promisifyAll(require("bcrypt"));
const mongoose = require('mongoose');
const { logger } = require('../../logger/logger')
const oneTimePassWord = require('./otp.model')
const utilities = require('../utilities/global.helper')

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
    },
    googleLogin: { type: Boolean },
     verified: {
    type: Boolean,
    default: false
  }
},
    {
        timestamps: false   
    })
userSchema.pre('save', async function (next) { // this line
    const user = this;
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
    register = (userDetails) => {
        return new Promise((resolve,reject)=>{
        const newUser = new user();
        newUser.firstName = userDetails.firstName;
        newUser.lastName = userDetails.lastName;
        newUser.email = userDetails.email;
        newUser.password = userDetails.password;

        newUser.save()
        .then((data)=>{
            resolve(data)
        }).catch((error)=>{
            reject(error)
        })
    })
    };

    /**
    * @description: Authenticates user information from the database
    * @param {*} loginData
    * @param {mongoose method} findone
    * */

    UserLogin = (loginData) => {
        //To find a user email in the database
        return new Promise((resolve,reject)=>{
        user.findOne({ email: loginData.email })
        .then((data)=>{
            if(!data){
                logger.info("data is not found");
            }
            else if(data.verified == true){

                logger.info('Email id found');  
                resolve(data)
            }
            else{
                logger.error(`email is not verified yet ${data.email}`);
                reject("email is not verified yet");
            }
        }).catch((error)=>{
            logger.error('Find error while loggin user');
            reject(error)
        })
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
            }else if(!data){
                logger.info("data is not found");
            } 
            else {
                return callback(null, data);
            }
        });
    }

    /**
  * @description mongoose function for Reset password
  * @param {*} email
  * @param {*} callback
  */
    resetPassword = (userData, callback) => {
        oneTimePassWord.findOne({ code: userData.code }, (error, data) => {
            if (data) {
                if (userData.code == data.code) {
                    utilities.hashpassword(userData.password, (err, hash) => {
                        if (hash) {
                            userData.password = hash;
                            user.updateOne({ email: userData.email }, { '$set': { "password": userData.password } }, (error, data) => {
                                if (data) {
                                    return callback(null, data)
                                }
                                else {
                                    return callback(error, null)
                                }
                            })
                        } else {
                            return callback(err, null)
                        }
                    })
                } else {
                    return callback("code not found", null)
                }
            } else {
                return callback("Otp doesnt match", null)
            }
        })
    }

    confirmRegister = (data, callback) => {
    user.findOneAndUpdate({email: data.email},{verified: true},(error, data) => {
        if (error) {
          logger.error("data not found in database");
          return callback(error, null);
        } else {
          logger.info("data found in database");
          return callback(null, data);
        }
      }
    );
  };
}
module.exports = new userModel();
