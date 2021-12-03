const mongoose = require("mongoose"),
    employeeSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true
        }
    });

employeeSchema.methods.getInfo = function () {
    return `Name: ${this.name} Email: ${this.email}`;
};
employeeSchema.methods.findLocalLogin = function () {
    return this.model("Login")
        .find({ name: this.name })
        .exec();
};


module.exports = mongoose.model("Employee", employeeSchema);