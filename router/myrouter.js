const express = require("express");

const myroute = express.Router();

const conncetion = require("../db/dbConnection");

//display all task
myroute.get("/tasks", (req, resp) => {
  conncetion.query("select * from task", function (err, data, fields) {
    if (!err) {
      console.log(data);
      resp.render("showtasks", { taskdata: data });
    }
  });
});

myroute.get("/tasks", (req, resp) => {
  resp.render("inserttasks");
});

//insert task into table and go back to showtask page
myroute.post("/inserttasks", (req, resp) => {
  conncetion.query(
    "insert into task values(?,?,?,?,?)",
    [
      req.body.tid,
      req.body.AssignedTo,
      req.body.Status,
      req.body.DueDate,
      req.body.Priority,
      req.body.Comments,
    ],
    function (err, data, fileds) {
      if (!err) {
        console.log("data inserted", data);
        resp.redirect("/tasks");
      } else {
        resp.status(500).send("no data added");
      }
    }
  );
});

//display object in the form for update
myroute.get("/edittask/:id", (req, resp) => {
  conncetion.query(
    "select * from task where tid=?",
    [req.params.id],
    function (err, data, fields) {
      resp.render("edittask", { task: data[0] });
    }
  );
});

//update tasks
myroute.post("/updatetasks", (req, resp) => {
  conncetion.query(
    "update task set AssignedTo=?,Status=?,DueDate=?,Priority=?,Comments=? where tid=?",
    [
      req.body.AssignedTo,
      req.body.Status,
      req.body.DueDate,
      req.body.Priority,
      req.body.Comments,
      req.body.tid,
    ],
    function (err, data, fileds) {
      if (!err) {
        console.log("data updated", data);
        resp.redirect("/tasks");
      } else {
        resp.status(500).send("no data updated");
      }
    }
  );
});

myroute.delete("/deletetask", (req, resp) => {
  conncetion.query(
    "delete task where tid=?"[req.params.id],
    function (err, data, fields) {
      resp.render("edittasks", { task: data[0] });
    }
  );
});
module.exports = myroute;
