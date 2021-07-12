const nodemailer = require('nodemailer');
const hbs = require("nodemailer-express-handlebars")

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
            type: 'OAuth2',
            user:'evanskeema@gmail.com',
            pass:'findout123',
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
    subject: "Account Creation",
    template: "welcome",
    context: {
        user: name
    }
});
