const mongoose = require("mongoose"),
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

loginSchema.methods.getInfo = function () {
    return `Email: ${this.email} Password: ${this.password}`;
};
loginSchema.methods.findLocalLogin = function () {
    return this.model("Login")
        .find({ email: this.email })
        .exec();
};

module.exports = mongoose.model("Login", loginSchema);