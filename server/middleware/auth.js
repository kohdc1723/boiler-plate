const User = require("../models/User");

let auth = (req, res, next) => {
    // get token from cookie
    let token = req.cookies.x_auth;
    // decode token and find user
    User.findByToken(token, (err, user) => {
        // if error, throw error
        if (err) throw err;

        // if user not found, auth fail
        if (!user) {
            res.json({
                isAuth: false,
                error: true
            });
        } else {
            // if user found, auth success
            req.token = token;
            req.user = user;
            next();
        }
    });
};

module.exports = auth;