const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");
const cors = require("cors");
var multer = require("multer");
var upload = multer();

app.use(bodyParser.json());
app.use(cors());

// for parsing multipart/form-data
app.use(upload.array());

//Routes Import
const form = require("./routes/formSubmit");
app.use("/form", form);

const newsLetter = require("./routes/newsLetterSubmit");
app.use("/newsLetter", newsLetter);

const Blogs = require("./routes/blogs");
app.use("/blogs", Blogs);

const Products = require("./routes/products");
app.use("/products", Products);

//Routes
app.get("/", (req, res) => {
  res.send(`Digialytics Api!`);
});

//Connect to DB
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connected to DB!");
    app.listen(process.env.API_PORT);
  })
  .catch((err) => console.log(err));
