const router = require("express").Router();
//const mongoose = require('mongoose');
//const Contacts = require('../models/contacts');
const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const { response } = require("express");





router.post("/contactus", async(req, res) => {
    const CLIENT_ID = '777269441434-a35f9bpelh4u0tpo7aa8jd82ln4hqeef.apps.googleusercontent.com';
    const CLIENT_SECRET = 'ybwnWsmeV8rT7_hBcgi0N0-f';
    const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
    const REFRESH_TOKEN = '1//04_jX4b9uoPt9CgYIARAAGAQSNwF-L9IrY40s0EgsttH3pHIc-asbM_5dPLidBgO1ozH73xdv6zTsgtggM4B7mBxX7tMVpzXzyY0';

    const oAuth2Client =  new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
    async function sendMail() {
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
    var textBody = `FROM: ${req.body.name}; EMAIL: ${req.body.email}; MESSAGE: ${req.body.message}`;
    var htmlBody = `<h2> Mail from Contact Form </h2><P>from: ${req.body.name} <a href='mailto: ${req.body.email}'>${req.body.email}</a></p>`;
    const mailOptions = {
        from: 'evanskeema@gmail.com',
        to: 'Prinasieku@gmail.com',
        subject: 'Mail from contact Form',
        text: textBody,
        html: htmlBody
        
    }
    transport.sendMail(mailOptions, (err,info) =>{
         if(err) {
             console.log(err);
             response.json({ message: "an error occured"})
         }
        
        })
    
        }
    
    catch(error) {
        return error
    }
    }
    
});
/*
router.post("/contactus", async (req, res) => {
    try {
      const { name, email, message } = req.body
      const contact = {
        from: ` <${email}>`,
        message: `<${name}> <${message}>`
      }
      await sendMail(contact)
  
      res.redirect('/example#contact-success');
    } catch (error) {
      res.redirect('/example#contact-error')
    }
  })
*/
module.exports = router;