/**
 * @description used to send email to the user
 * @param {*} email
 * @param {*} subject
 * @returns
 */
const nodemailer = require('nodemailer');
require('dotenv').config();
const Otp=require('../models/otp.mdl.js');

exports.sendEmail = (data) => {
    let otpcode = Math.random().toString(36).substring(2, 12);
    let otpData = new Otp({
        email: data.email,
        code: otpcode,
        expireIn: new Date().getTime() + 60 * 1000
    })
    otpData.save();
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.pass
        }
    });

    const message = {
        from: process.env.EMAIL,
        to: data.email,
        subject: 'Fundoo notes otp code',
        html: `Enter this otp to reset your password
    <h3>${otpcode}</h3>`
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