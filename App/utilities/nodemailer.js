/**
 * @description used to send email to the user
 * @param {*} email
 * @param {*} subject
 * @returns
 */
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const oneTimePassWord = require('../models/otp.model.js');

exports.sendEmail = (info) => {
    let oneTimeCode = Math.random().toString(36).substring(2, 12);
    let oneTimeData = new oneTimePassWord({
        email: info.email,
        code: oneTimeCode,
        expireIn: new Date().getTime() + 60 * 1000
    })
    oneTimeData.save();
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const message = {
        from: process.env.EMAIL,
        to: info.email,
        subject: 'Fundoo notes otp code',
        html: `Enter this otp to reset your password
    <h3>${oneTimePassWord}</h3>`
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log("mail is not sent",err);
        } else {
            console.log('email has been sent', info.response);
            return info.response;
        }
    });
};