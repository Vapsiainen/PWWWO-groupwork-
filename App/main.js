const express = require("express"),
  app = express(),
  http = require("http");
  const httpStatus = require("http-status-codes");
  contactController = require("./controllers/contactController"),
  indexController = require("./controllers/indexController"),
  employeesController = require("./controllers/employeesController")
  layouts = require("express-ejs-layouts");

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

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

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

app.get("/contact", contactController.getContactPage);
app.get("/index", indexController.getIndexPage)
app.get("/employees", employeesController.getAllEmployees,
    (req, res, next) => {
        res.render("employees", {employees: req.data})
    });

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
 });

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

