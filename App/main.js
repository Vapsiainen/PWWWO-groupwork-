const express = require("express"),
  app = express(),
  http = require("http");
  const httpStatus = require("http-status-codes");
  contactController = require("./controllers/contactController"),
  indexController = require("./controllers/indexController"),
  layouts = require("express-ejs-layouts");

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

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
