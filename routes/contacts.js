const router = require("express").Router();
const mongoose = require('mongoose');
const Contacts = require('../models/contacts');


router.post("/contactus", (req, res) => {
    
        let contact = new Contacts({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        })
        contact.save()
     /*  if (addedContact) {
           // mailer.welcomeMail(req.body.email, req.body.name)
           console.log('welcome ABOARD');
        } */
        .then(result => {

            res.status(200).json({
               // msg: "Welcome Onboard",
               // data: addedContact
               _id: result._id,
               name: result.name,
               email: result.email,
               message: result.message,
            })
        })
       
     .catch (err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
});

module.exports = router;