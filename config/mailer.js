const nodemailer = require('nodemailer');
const hbs = require("nodemailer-express-handlebars")

var transporter = nodemailer.createTransport({
    host: ' smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
            
            user:'info@choosingme.co.ke',
            pass: 'N@sieku123' 
    }
});



const sendMail = (name, email, message) => {
    let mailOptions = {
        from: email,
        to: 'info@choosingme.co.ke',
        subject: name,
        text: message,
        
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
                return console.log(error);
        }
        else{
            console.log('Message Sent', info.messageId);
        }
    });

}
module.exports = sendMail



