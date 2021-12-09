const express = require("express"),
  layouts = require("express-ejs-layouts"),
  http = require("http"),
  httpStatus = require("http-status-codes"),
  expressSession = require("express-session"),
  connectFlash = require("connect-flash"),
  cookieParser = require("cookie-parser"),
  contactController = require("./controllers/contactController"),
  indexController = require("./controllers/indexController"),
  employeesController = require("./controllers/employeesController"),
  errorController = require("./controllers/errorController"),
  loginController = require("./controllers/loginController"),
  Employee = require("./models/employees");

const app = express();

const mongoose = require('mongoose');

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
app.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    },
    resave: false,
    saveUninitialized: false
  })
);
app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});


app.use(cookieParser());

app.get("/", loginController.login);
app.post("/", loginController.authenticate, loginController.redirectView);

app.get("/contact", contactController.getContactPage);
app.get("/index", indexController.getIndexPage);
app.get("/employees", employeesController.getAllEmployees,
  (req, res, next) => {
    res.render("employees", { employees: req.data })
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
