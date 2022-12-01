const express = require("express");
const router = express.Router();
const Products = require("../models/products");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");

router.post("/add", (req, res) => {
  let id = uuidv4();

  const products = new Products({
    _id: id,
    title: req.body.title,
    image: req.body.image,
    description: req.body.description,
    overview: req.body.overview,
    the_challenge: req.body.the_challenge,
    solution: req.body.solution,
  });

  products
    .save()
    .then((data) => res.status(200).json({ data: data, success: true }))
    .catch((err) =>
      res.status(500).json({
        message: err,
      })
    );
});

router.get("/get-products", (req, res) => {
  Products.find()
    .then((data) => res.status(200).json({ data: data, success: true }))
    .catch((err) =>
      res.status(500).json({
        message: err,
      })
    );
});

router.delete("/delete", (req, res) => {
  Products.deleteOne({ _id: req.query._id })
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(500).json({
        message: err,
      })
    );
});

router.patch("/update", (req, res) => {
  Products.updateOne(
    { _id: req.query._id },
    {
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      blog_html: req.body.blog_html,
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
