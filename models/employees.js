"use strict";

const mongoose = require("mongoose"),
    { Schema } = mongoose,

    employeeSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        department: {
            type: String,
            required: true
        }
    });


employeeSchema.virtual("mame").get(function () {
    return `${this.name.first} ${this.name.last}`;
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