// express app
const express = require("express");
const app = express();
const port = 8000;

// config
const config = require("./config/key");

// body-parser
const bodyParser = require("body-parser");
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// application/json
app.use(bodyParser.json());

// mongoose
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect(config.mongoUri).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log(err);
});

// User schema
const User = require("./models/User");

app.get("/", (req, res) => {
    res.send("Hello, Node.js!");
});

app.post("/register", (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.json({
                success: false,
                err
            })
        } else {
            return res.status(200).json({
                success: true,
            })
        }
    });
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});