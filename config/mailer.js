var transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true, //ssl
    auth: {
            user:'pri@choosingme.co.ke',
            pass:''
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
