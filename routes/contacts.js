const router = require("express").Router();
const mongoose = require('mongoose');
const Contacts = require('../models/contacts');
let mailer = require("../config/mailer");


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
                mailer.welcomeMail(req.body.email, req.body.name)
                console.log('welcome ABOARD');
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

module.exports = router;