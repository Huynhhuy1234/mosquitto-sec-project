const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "mysql_db",
  user: "root",
  password: "root_password",
  database: "mqtt_db"
});

// test API
app.get("/", (req, res) => {
  res.send("Backend running");
});

// add user
app.post("/add-user", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("User added");
    }
  );
});

// add ACL
app.post("/add-acl", (req, res) => {
  const { username, topic } = req.body;

  db.query(
    "INSERT INTO acl (username, topic, rw) VALUES (?, ?, 1)",
    [username, topic],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("ACL added");
    }
  );
});

// list user
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.listen(3000, () => console.log("Backend running on 3000"));
