const express = require("express");
const path = require("path");
const cookie_parser = require("cookie-parser");

const app = express();
app.use(express.json({ limit: "10kb" })); // midleware
app.use(express.static("public"));

app.use(cookie_parser());

app.set("view engine", "pug");

app.set("views", path.join(__dirname, "view"));

module.exports = app;
