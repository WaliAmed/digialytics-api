const express = require("express");
const router = express.Router();
const Form = require("../models/formSubmit");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");

async function sendMail() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: "wali585858@gmail.com",
      pass: "myusualgmail12345!@#$%",
    },
  });
  // let transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: testAccount.user, // generated ethereal user
  //     pass: testAccount.pass, // generated ethereal password
  //   },
  // });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Wali" <Wali@example.com>', // sender address
    to: "waliamedvd@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

router.post("/create", (req, res) => {
  sendMail();

  const form = new Form({
    _id: uuidv4(),
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
});

module.exports = router;
