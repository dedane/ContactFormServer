const router = require("express").Router();
const mongoose = require('mongoose');
const Contact = require('../models/contacts');


router.post("/ContactUs", async (req, res) => {
    try {
        let contact = new Contact({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        })
        let addedContact = await contact.save();
       if (addedUser) {
            mailer.welcomeMail(req.body.email, req.body.name)
        }

        res.status(200).json({
            msg: "Welcome Onboard",
            data: addedContact
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
});

module.exports = router;