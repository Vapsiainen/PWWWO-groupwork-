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
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    user.passwordComparison(req.body.password).then(passwordsMatch => {
                        if (passwordsMatch) {
                            res.locals.redirect = "/index";
                            session = req.session;
                            console.log(req.session)
                            res.locals.user = user;
                        } else {
                            req.flash("error", "Failed to log in user account: Incorrect email or password!");
                            res.locals.redirect = "/";
                        }
                        next();
                    });
                } else {
                    req.flash("error", "Failed to log in user account: User account not found.");
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
        //req.logout();
        res.render("login");
        next();
    }
};