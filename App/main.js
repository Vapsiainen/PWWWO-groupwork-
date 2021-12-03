"use strict";

const express = require("express"),
  layouts = require("express-ejs-layouts"),
  http = require("http"),
  httpStatus = require("http-status-codes"),
  contactController = require("./controllers/contactController"),
  indexController = require("./controllers/indexController"),
  employeesController = require("./controllers/employeesController")
  errorController = require("./controllers/errorController");

const app = express();

const mongoose = require('mongoose');
Employee = require("./models/employees");

mongoose.connect("mongodb+srv://pwwwo:cH9zeRJ8z0AegIQr@pwwwo-cluster.velp1.mongodb.net/company_db", {
  useNewUrlParser: true
});
const db = mongoose.connection;


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
app.get("/employees", employeesController.getAllEmployees,
    (req, res, next) => {
        res.render("employees", {employees: req.data})
    });

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});


app.use(errorController.logErrors);
app.use(errorController.respond404);
app.use(errorController.respond500);

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
 });

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

