const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

app.use(bodyParser.json());

//Routes Import
const form = require("./routes/formSubmit");
app.use("/form", form);

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
