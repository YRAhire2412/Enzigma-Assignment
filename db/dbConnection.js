const mysql = require("mysql");

const mysqlconnection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "enzigma",
  port: 3306,
});

mysqlconnection.connect((err) => {
  if (!err) {
    console.log("connection done");
  } else {
    console.log("connection fail " + JSON.stringify(err));
  }
});
module.exports = mysqlconnection;
