const express = require("express");
const router = express.Router();
const Form = require("../models/formSubmit");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");

const mail = async (id, name, email, subject, message, html = false) => {
  try {
    var smtpConfig = {
      host: "smtp.gmail.com",
      port: 587,
      // secure: true, // use SSL,
      // you can try with TLS, but port is then 587
      auth: {
        user: process.env.MAILING_ACCOUNT,
        pass: process.env.MAILING_PASSWORD,
      },
    };

    var transporter = nodemailer.createTransport(smtpConfig);
    // replace hardcoded options with data passed (somedata)
    var mailOptions = {
      from: process.env.MAILING_ACCOUNT, // sender address
      to: process.env.MAILING_TO_ACCOUNT, // list of receivers
      subject: subject, // Subject line
      text: `id: ${id}, Name: ${name}, Email: ${email}, Message: ${message}`, //, // plaintext body
      html: html === false ? null : html, // You can choose to send an HTML body instead
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return false;
      } else {
        console.log("Message sent: " + info.response);
        return true;
      }
    });
  } catch (error) {
    console.error(error);
  }
};

router.post("/create", (req, res) => {
  let id = uuidv4();
  if (
    mail(id, req.body.name, req.body.email, "Form Submittion", req.body.message)
  ) {
    const form = new Form({
      _id: id,
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      message: req.body.message,
    });

    form
      .save()
      .then((data) => res.status(200).json(data))
      .catch((err) =>
        res.status(500).json({
          message: err,
        })
      );
  }
});

module.exports = router;
