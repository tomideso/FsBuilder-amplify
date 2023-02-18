/* Amplify Params - DO NOT EDIT
	
Amplify Params - DO NOT EDIT */

var express = require("express");
var bodyParser = require("body-parser");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

var builder = require("./builder");

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/**********************
 * Example get method *
 **********************/

app.get("/item", async function (req, res) {
  // const { build } = req.query;
  // const response = await builder.makeBuild();
  // res.download(response);
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

// app.get("/item/*", function (req, res) {
//   // Add your code here
//   res.json({ success: "get call succeed!", url: req.url });
// });

/****************************
 * Example post method *
 ****************************/

app.post("/item", async function (req, res) {
  const { build } = req.body;
  console.log("build", build);
  if (build && build.length) {
    console.log("here", build);

    const response = await builder.makeBuild(build);
    return res.download(response);
    // return res.send("hello");
  }

  // Add your code here
  res.status(400).send({ error: "Request requires build" });
});

app.listen(3000, function () {
  console.log("App started");
});

module.exports = app;
