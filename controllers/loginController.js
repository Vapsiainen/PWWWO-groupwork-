const User = require("../models/login"),
    getLoginParams = body => {
        return {
            email: body.email,
            password: body.password
        };
    };


module.exports = {
    login: (req, res) => {
        res.render("login");
    },
    authenticate: (req, res, next) => {
        User.findOne({
            email: req.body.email
        })
            .then(user => {
                if (user && user.password === req.body.password) {
                    res.locals.redirect = "/index";
                    session=req.session;
                    console.log(req.session)
                    res.locals.user = user;
                    next();
                } else {
                    req.flash(
                        "error",
                        "Your email or password is incorrect. Please try again or contact your system administrator!"
                    );
                    res.locals.redirect = "/";
                    next();
                }
            })
            .catch(error => {
                console.log(`Error logging in user: ${error.message}`);
                next(error);
            });
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },

    logout: (req, res, next) => {
        req.logout();
        req.flash("success", "You have been logged out!");
        res.locals.redirect = "/";
        next();
      }
}

