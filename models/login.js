const mongoose = require("mongoose"),
    bcrypt = require("bcrypt"),
    loginSchema = mongoose.Schema({
        email: {
            type: String,
            required: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
        }
    });

loginSchema.methods.getInfo = function() {
    return `Email: ${this.email} Password: ${this.password}`;
};
loginSchema.methods.findLocalLogin = function() {
    return this.model("Login")
        .find({ email: this.email })
        .exec();
};

loginSchema.pre("save", function(next) {
    let user = this;
    bcrypt
        .hash(user.password, 10)
        .then(hash => {
            user.password = hash;
            next();
        })
        .catch(error => {
            console.log(`Error in hashing password: ${error.message}`);
            next(error);
        });
});

loginSchema.methods.passwordComparison = function(inputPassword) {
    let user = this;
    return bcrypt.compare(inputPassword, user.password);
};

module.exports = mongoose.model("Login", loginSchema);