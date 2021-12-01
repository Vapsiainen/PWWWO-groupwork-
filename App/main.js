// Yksinkertainen serveri

// Routet tähän, esimerkki kirjan sivulla 55.

"use strict";

const http = require("http");
const httpStatus = require("http-status-codes");

const port = 3000;
const app = http.createServer();

app.on("request", (req, res) => {
    console.log("Received an incoming request.");
    res.writeHead(httpStatus.StatusCodes.OK, {
        "Content-Type": "text/html"
    });

    let responseMessage = "<h1>Welcome!</h1>";
    res.write(responseMessage);
    res.end();
    console.log(`Sent a response: ${responseMessage}`);
});

app.listen(port);
console.log(`The server has started and is listening on port ${port}`);