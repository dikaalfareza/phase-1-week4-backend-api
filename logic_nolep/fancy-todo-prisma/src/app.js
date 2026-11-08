const express = require("express");
const router = require("./routes/index")

const app = express();

app.use(express.json());

app.use(router)

app.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = app;