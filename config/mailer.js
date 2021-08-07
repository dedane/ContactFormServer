const nodemailer = require('nodemailer');
const {google} = require('googleapis')
const hbs = require("nodemailer-express-handlebars")

const CLIENT_ID = '777269441434-a35f9bpelh4u0tpo7aa8jd82ln4hqeef.apps.googleusercontent.com';
const CLIENT_SECRET = 'ybwnWsmeV8rT7_hBcgi0N0-f';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04_jX4b9uoPt9CgYIARAAGAQSNwF-L9IrY40s0EgsttH3pHIc-asbM_5dPLidBgO1ozH73xdv6zTsgtggM4B7mBxX7tMVpzXzyY0';

const oAuth2Client =  new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

/* var transporter = nodemailer.createTransport({
    service: 'Zoho',
    host:  'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
            
            user:'info@choosingme.co.ke',
            pass: 'Ru6nePA5Rypd' 
    }
});



const sendMail = (name, email, message) => {
    const mailOptions = {
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

} */

async function sendMail(email,name,message) {
    try{
    const accessToken = await oAuth2Client.getAccessToken()

    const transport = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: 'prinasieku@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
    }
})
const mailOptions = {
    from: 'evanskeema@gmail.com',
    to: 'Prinasieku@gmail.com',
    subject: 'Mail from contact Form',
    text: `$<message>`,
    
}
const result = await transport.sendMail(mailOptions)
return result
    }
catch(error) {
    return error
}
}



sendMail() 
.then((result) => console.log('Email sent....', result))
.catch((error) => console.log(error.message));
module.exports = sendMail