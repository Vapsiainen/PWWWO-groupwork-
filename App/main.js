"use strict";

const express = require("express"),
  layouts = require("express-ejs-layouts"),
  http = require("http"),
  httpStatus = require("http-status-codes"),
  contactController = require("./controllers/contactController"),
  indexController = require("./controllers/indexController"),
  errorController = require("./controllers/errorController");

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use('/public', express.static('public'));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());


// R O U T E T
app.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
})

app.get("/contact", contactController.getContactPage);
app.get("/index", indexController.getIndexPage);

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});


app.use(errorController.logErrors);
app.use(errorController.respond404);
app.use(errorController.respond500);


app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
