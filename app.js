const express = require("express");
const app = express();
const path = require("path");
const bodyparser = require("body-parser");
const routes = require("./router/myrouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); //index.ejs

app.use("/css", express.static(path.resolve(__dirname, "public/css")));

app.use(bodyparser.urlencoded({ extended: false }));

app.use("/", routes);

//start the server
app.listen(4002, () => {
  console.log("server started at port 4002");
});

module.exports = app;
