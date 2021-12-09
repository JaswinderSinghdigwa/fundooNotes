var Promise = require("bluebird");
const bcrypt = Promise.promisifyAll(require("bcrypt"));
const mongoose = require('mongoose');
const { logger } = require('../../logger/logger')

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
     * @param {*} userDetails
     * @param {*} callback
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
    * @
    * */

    loginModel = (loginData, callBack) => {
        //To find a user email in the databas
        user.findOne({ email: loginData.email }, (error, data) => {
            if (error) {
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
            if (err || !data) {
                logger.error('User with email id doesnt exists');
                return callback('User with email id doesnt exists', null);
            } else {
                console.log("22222", data);
                return callback(null, data);
            }
        });
    };
}

module.exports = new userModel();
