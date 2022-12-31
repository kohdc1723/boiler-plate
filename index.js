const express = require("express");
const app = express();
const port = 8000;

const connectionString = "mongodb+srv://kohdc1723:dkoh8A01261746!@boiler-plate.xvk2nl4.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect(connectionString).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log(err);
});

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});