const express = require("express");
const router = express.Router();
const BlogsCategory = require("../models/blogsCategory.js");
const { v4: uuidv4 } = require("uuid");

router.post("/add", (req, res) => {
  let id = uuidv4();

  BlogsCategory.find({}, { title: req.body.title })
    .then((data) => {
      if (data.length > 0) {
        res.status(500).json({
          status: false,
          message: "Please enter a unique title.",
        });
      } else {
        const blogCategory = new BlogsCategory({
          _id: id,
          title: req.body.title,
        });

        blogCategory
          .save()
          .then((data) => res.status(200).json(data))
          .catch((err) =>
            res.status(500).json({
              message: err,
            })
          );
      }
    })
    .catch((err) =>
      res.status(500).json({
        message: err,
      })
    );
});

router.get("/get", (req, res) => {
  BlogsCategory.find()
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(500).json({
        message: err,
      })
    );
});

router.delete("/delete", (req, res) => {
  BlogsCategory.deleteOne({ _id: req.query._id })
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(500).json({
        message: err,
      })
    );
});

router.patch("/update", (req, res) => {
  BlogsCategory.updateOne(
    { _id: req.query._id },
    {
      title: req.body.title,
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
