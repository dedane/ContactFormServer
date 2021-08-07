const router = require("express").Router();
const mongoose = require('mongoose');
const Contacts = require('../models/contacts');
let sendMail = require("../config/mailer");


router.post("/contactus", async(req, res) => {
    try {
        let contact = new Contacts({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        })
        let addedContact = contact.save()
      
        .then(() => {
            if (addedContact) {
                sendMail(addedContact)
                console.log('welcome ABOARD', addedContact);
            } 
            res.status(200).json({
            msg: "Welcome Onboard",
               data: addedContact
               
            })
        })
        .catch(err => {
            console.log(err);
        })
    }   
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
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