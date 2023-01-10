// express app
const express = require("express");
const app = express();
const port = 8000;

// config
const config = require("./config/key");

// body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded
app.use(bodyParser.json()); // application/json

// cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

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

// auth
const auth = require("./middleware/auth");

// routers
app.get("/", (req, res) => {
    res.send("Hello, Node.js!");
});

app.get("/api/hello", (req, res) => {
    res.send("Hello, World!");
});

app.post("/api/users/register", (req, res) => {
    const user = new User(req.body);
    /* "pre next" here */
    user.save((err, user) => {
        if (err) {
            res.json({success: false, err});
        } else {
            res.status(200).json({success: true});
        }
    });
});

app.post("/api/users/login", (req, res) => {
    // find req email in the db
    User.findOne({email: req.body.email}, (err, user) => {
        if (!user) {
            res.json({
                loginSuccess: false,
                message: "user not found"
            });
        } else {
            // if req email found, check req password
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch) {
                    res.json({
                        loginSuccess: false,
                        message: "wrong password"
                    });
                } else {
                    // if req password is correct, generate token
                    user.generateToken((err, user) => {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            // save token at cookie
                            res.cookie("x_auth", user.token).status(200).json({
                                loginSuccess: true,
                                userId: user._id
                            });
                        }
                    });
                }
            });
        }
    });
});

app.get("/api/users/auth", auth, (req, res) => {
    // middleware passed => auth true
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    });
});

app.get("/api/users/logout", auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id}, {token: ""}, (err, user) => {
        if (err) {
            res.json({success: false, err});
        } else {
            res.status(200).send({success: true});
        }
    });
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});