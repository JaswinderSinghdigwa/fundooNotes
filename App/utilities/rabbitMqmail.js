const nodemailer = require('nodemailer');

class sendMail {
    sendWelcomeMail = (data) => {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL, // generated ethereal user
                pass: process.env.PASSWORD // generated ethereal password
            }
        });

        // send mail with defined transport object
        transporter.sendMail({
            from: "\"Fundoo Notes\" <no-reply@fundoonotes.com>", // sender address
            to: data.email, // list of receivers
            subject: "Welcome - Fundoo notes account", // Subject line
            text: `Hello ${data.firstName}.`, // plain text body
            html: `<b>Hello ${data.firstName} <br> <h2> Welcome to Fundoo notes.</h2> <br>Your account Has been created successfully<br></b>` // html body
        });
    }
}

module.exports = new sendMail()