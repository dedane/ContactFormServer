const nodemailer = require('nodemailer');
const hbs = require("nodemailer-express-handlebars")

var transporter = nodemailer.createTransport({
    host: 'gmail.com',
    port: 465,
    secure: true, //ssl
    auth: {
            user:'evanskeema@gmail.com',
            pass:'findout123'
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
