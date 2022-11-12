const express = require("express");
const router = express.Router();
const NewsLetter = require("../models/newsLetterSubmit");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");

const mail = async (id, email, subject, html = false) => {
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
      text: `id: ${id}, Email: ${email}`, //, // plaintext body
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

router.post("/send", (req, res) => {
  let id = uuidv4();
  if (mail(id, req.body.email, "News Letter")) {
    const newsLetter = new NewsLetter({
      _id: id,
      email: req.body.email,
    });

    newsLetter
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
