const express = require("express");
const app = express();
const errorMidlerware = require("./middleware/error")


app.use(express.json())

// Routes
const product = require("./routes/productRoute");
const user = require("./routes/userRoute")

app.use("/api/v1", product);
app.use("/api/v1", user)

// Midleware
app.use(errorMidlerware);


module.exports = app;
