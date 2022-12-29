const express = require("express");
const router = express.Router();
const blogsSubCategory = require("../models/blogsSubCategory.js");
const BlogsCategory = require("../models/blogsCategory.js");
const { v4: uuidv4 } = require("uuid");

router.post("/add", (req, res) => {
  if (req.query.query_id) {
    let id = uuidv4();
    let categoryId = req.query.category_id;
    BlogsCategory.find({}, { _id: categoryId, title: 1 })
      .then((data) => {
        if (data.length === 0) {
          res.status(400).json({
            status: false,
            message: "no data found",
          });
        } else {
          const blogsubCategory = new blogsSubCategory({
            _id: id,
            title: req.body.title,
            category: {
              category_id: data[0].id,
              category_title: data[0].title,
            },
          });

          blogsubCategory
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
  } else {
    res.status(400).json({
      status: false,
      message: "category_id missing",
    });
  }
});

router.get("/get", (req, res) => {
  blogsSubCategory
    .find()
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(500).json({
        message: err,
      })
    );
});

router.delete("/delete", (req, res) => {
  blogsSubCategory
    .deleteOne({ _id: req.query._id })
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(500).json({
        message: err,
      })
    );
});

router.patch("/update", (req, res) => {
  blogsSubCategory
    .updateOne(
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
