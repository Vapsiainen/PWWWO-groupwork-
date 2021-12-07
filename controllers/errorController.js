"use strict";

const httpStatus = require("http-status-codes");

exports.logErrors = (error, req, res, next) => {
    console.error(error.stack);
    next(error);
};

exports.respond404 = (req, res) => {
    let errorCode = httpStatus.StatusCodes.NOT_FOUND;
    res.status(errorCode);
    res.sendFile(`./public/html/${errorCode}.html`, {
        root: "./"
    });
};

exports.respond500 = (error, req, res, next) => {
    let errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(errorCode);
    res.sendFile(`./public/html/${errorCode}.html`, {
        root : "./"
    });
};
