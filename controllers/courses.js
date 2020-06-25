const express = require("express");
const mongoose = require("mongoose");
var nodemailer = require('nodemailer');
var uniqid = require('uniqid');
var date = new Date();
var timestamp = date.getTime();
// const moment = require('moment');
const users = mongoose.model("DKUser");
const router = express.Router();
let utility = require("./utility");
// const CourseModel = mongoose.model("Course");
// const users = mongoose.model('MyUser');
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: 'digi.kites@gmail.com',
    pass: 'Digitalkites123'
  }
});

router.get("/", (req, res) => {
  res.send("course controller");
});

router.get("/getUser", (req, res) => {
  console.log("I came here");
  res.send(req.param("User") + req.param("Pass"));
  // res.send("course controller");
});
let Time = timestamp
// Time = moment().format("MMM D, YYYY hh:mm:ss")
router.put("/Registration", async (req, res, next) => {
  console.log(req.param("Email"));
  console.log(req.param("User"));
  console.log(req.param("Pass"));
  let uid = uniqid()
  const exists = await users.exists({ email: req.param("Email")});
  if (exists) {
    return res.status(200).json({ status: 'Redirect to Login!' });
  }
  else{
  await users.create({ email: req.param("Email"), username: req.param("User"), password: req.param("Pass"), userId: uid, status: false, time: Time });
  }
  console.log(Time + "Time");
  Email: String
  Email = req.param("Email")
  const exist = await users.exists({ userId: uid });
  if (exist) {
    var encryptedMail = utility.encrypt(uid);
    var mailOptions = {
      from: 'digi.kites@gmail.com',
      to: Email,
      subject: 'Sending Email using Node.js',
      text: 'That was easy!....now click on this link\n http://localhost:3000/course/Validate?e=' + encryptedMail
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.status(200).json({ status: 'A verification link will be sent to the gmail please check!!' });
  }
  else {
    res.status(200).json({ status: 'Registration Failed' });
  }
});


router.get('/Login', async (req, res, next) => {
  Email: String
  Email = req.param("Email")
  console.log(Email);
  const exists = await users.exists({ email: Email, password: req.param("password"), status: true });
  const Nverified = await users.exists({ email: Email, password: req.param("password"), status: false });
  if (exists) {
    return res.status(200).json({ status: 'Login Success' });
  }
  else if (Nverified) {
    return res.status(200).json({ status: 'Please complete registration' });
  }
  else {
    res.status(200).json({ status: 'Login Failed or User does not exists!' });
  }
});

router.get('/Validate', async (req, res, next) => {
  uid: String
  uid = req.param("e")
  // console.log(uid);
  uid = (utility.decrypt(uid));
  // console.log(uid);
  let verficationtime = timestamp
  // verficationtime = moment().format("MMM D, YYYY hh:mm:ss")
  console.log(verficationtime + "verificationtime");
  let s = await users.findOne({ userId: uid }, { time: 1, _id: 0 })
  // console.log(s.time)
  var seconds = Math.abs(new Date(s.time) - new Date(verficationtime)) / 1000;
  console.log(seconds);
  var minutes = Math.floor(seconds / 60) % 60;
  console.log(minutes);
  let isExisitingUser = await users.exists({ userId: uid });

  if (minutes <= 30 && isExisitingUser) {
    users.updateOne({ userId: uid },
      { $set: { status: true } }, function (err, res) {
        if (err) throw err;
        console.log("succesfully updated");
        // db.close();
      });
    res.status(200).json({ status: 'Registration Success' });
  }
  else {
    res.status(404).json({ status: 'link expired' });
  }
});

module.exports = router;