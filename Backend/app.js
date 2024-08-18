const express = require("express");
const app = express();
const errorMidlerware = require("./midlewaare/error")


app.use(express.json())

// Routes
const product = require("./routes/productRoute");
app.use("/api/v1", product);

// Midleware
app.use(errorMidlerware);


module.exports = app;
