const express = require("express");
const router = express.Router();
const Blogs = require("../models/blogs.js");
const BlogsSubCategory = require("../models/blogsSubCategory.js");
const { v4: uuidv4 } = require("uuid");
const e = require("express");

router.post("/add", (req, res) => {
  let id = uuidv4();

  if (req.query.sub_category_id) {
    let categoryId = req.query.sub_category_id;

    BlogsSubCategory.find({}, { _id: categoryId, title: 1, category: 1 })
      .then((data) => {
        if (data.length > 0) {
          const blog = new Blogs({
            _id: id,
            title: req.body.title,
            image: req.body.image,
            description: req.body.description,
            sub_category: data[0],
          });

          blog
            .save()
            .then((data) => res.status(200).json(data))
            .catch((err) =>
              res.status(500).json({
                message: err,
              })
            );
        } else {
          res.status(400).json({
            status: false,
            message: "sub_category_id not found",
          });
        }
      })
      .catch((err) =>
        res.status(500).json({
          message: err,
        })
      );
  } else {
    res.status(400).json({
      status: false,
      message: "sub_category_id missing",
    });
  }
});

router.get("/get", (req, res) => {
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
