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
const { logger } = require('../../logger/logger.js');

exports.sendEmail = (info) => {
  let oneTimeCode = Math.random().toString(36).substring(2, 12);
  let oneTimeData = new oneTimePassWord({
    email: info.email,
    code: oneTimeCode,
    expireIn: new Date().getTime() + 60 * 1
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
    <h3>${oneTimeCode}</h3>`
  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      logger.errror("mail is not sent");
    } else {
      logger.info('email has been sent');
      return info.response;
    }
  });
};

exports.verifyMail = (token, data) => {
  const link = `http://localhost:${process.env.PORT}/confirmregister/${token}`;
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD // generated ethereal password
    }
  });

  const info = {
    from: "\"Fundoo Notes\" <no-reply@fundoonotes.com>", // sender address
    to: data.email, // list of receivers
    subject: "Verify Mail for your Fundoo Note Account",
    html: `<b>Hello <h2> ${data.firstName} </h2><br><h1> Here is your link to Verify Mail:</h1><br> <button href="${link}"  style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"> <a href="${link}">click me for Verify </a></button></b>` // html body
  };

  // send mail with defined transport object
  const test = transporter.sendMail(info, (err, info) => {
    if (err) {
      logger.error(error);
    } else {
      logger.info("email has been sent");
      return info.response;
    }
  });

}