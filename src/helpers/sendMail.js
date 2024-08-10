"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// node i nodemailer
// sendMail(to:string, subject:string, message:string):

const nodemailer = require('nodemailer')

module.exports = function (to, subject, message) {

    // Set Passive:
    return true

    //? GoogleMail (gmail):
    // Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords
    const mailSettings = {
        service: 'Gmail',
        user: 'farukoncu78@gmail.com',
        pass: 'svnp jnlo vcri ftkh'
    }

    // Connect to mailServer:
    const transporter = nodemailer.createTransport({
        service: mailSettings.service,
        auth: {
            user: mailSettings.user,
            pass: mailSettings.pass,
        }
    })
    // SendMail:
    transporter.sendMail({
        from: mailSettings.user,
        to: to,
        subject: subject,
        text: message,
        html: message,
    }, (error, info) => {
        error ? console.log(error) : console.log(info)
    })
}