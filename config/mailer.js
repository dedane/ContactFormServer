const nodemailer = require('nodemailer');
const hbs = require("nodemailer-express-handlebars")

var transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
            type: 'OAuth2',
            user:'evanskeema@gmail.com',
            
            clientId :process.env.CLIENTID,
            clientSecret: process.env.CLIENTSECRET,
            expires: 1484314697598
    },
    tls: {
        rejectUnauthorized: false
    }
});

exports.welcomeMail = (email, name) => transporter.sendMail({
    from: 'Vue Mailer',
    to: email,
    subject: "  Email received",
    text: "Hey there thank you for reaching out we will be in touch",
    html: '<b>Hey there! </b><br> Thank you for sending the messege we will get back to you<br />',
    context: {
        user: name
    }
});



