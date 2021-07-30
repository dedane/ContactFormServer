let Contact = require("../models/contacts");
let mailer = require("../config/mailer");
exports.contacts = async (req, res) => {
    try {
        let contact = new Contact({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        })
        let addedContact = await contact.save();
       if (addedUser) {
            sendmail(req.body.email, req.body.name)
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
}