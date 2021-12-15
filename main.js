require('dotenv').config();
const express = require("express"),
  layouts = require("express-ejs-layouts"),
  methodOverride = require("method-override"),
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
const db = mongoose.connection;


let URL = process.env.DB_URL;
mongoose.connect(URL, {
  useNewUrlParser: true
});

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

app.use
  (methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

//SESSIONS AND COOKIES
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


// R O U T E T
app.get("/", loginController.login);
app.get("/logout", loginController.logout);
app.get("/contact", contactController.getContactPage);
app.get("/index", indexController.getIndexPage);
app.get("/employees", employeesController.index, employeesController.indexView);
app.get("/employees/new", employeesController.new);
app.post("/employees/create", employeesController.create, employeesController.redirectView);
app.post("/employees/:id/edit", employeesController.edit, employeesController.showView);
app.post("/employees/:id/update", employeesController.update, employeesController.redirectView);
app.delete("/employees/:id/delete", employeesController.delete, employeesController.redirectView);
app.get("/employees/:id", employeesController.show, employeesController.showView);

app.post("/", loginController.authenticate, loginController.redirectView);

app.use(errorController.logErrors);
app.use(errorController.respond404);
app.use(errorController.respond500);

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
