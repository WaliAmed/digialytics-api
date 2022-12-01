const express = require("express");
const router = express.Router();
const Blogs = require("../models/blogs.js");
const { v4: uuidv4 } = require("uuid");

router.post("/add", (req, res) => {
  let id = uuidv4();

  const blog = new Blogs({
    _id: id,
    title: req.body.title,
    image: req.body.image,
    description: req.body.description,
    blog_html: req.body.blog_html,
    time_to_read: req.body.time_to_read,
  });

  blog
    .save()
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(500).json({
        message: err,
      })
    );
});

router.get("/get-blogs", (req, res) => {
  Blogs.find()
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(500).json({
        message: err,
      })
    );
});

router.delete("/delete", (req, res) => {
  Blogs.deleteOne({ _id: req.query._id })
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(500).json({
        message: err,
      })
    );
});

router.patch("/update", (req, res) => {
  Blogs.updateOne(
    { _id: req.query._id },
    {
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      blog_html: req.body.blog_html,
      time_to_read: req.body.time_to_read,
    }
  )
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(500).json({
        message: err,
      })
    );
});

module.exports = router;
