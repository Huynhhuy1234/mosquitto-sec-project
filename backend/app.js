const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// =======================
// CONNECT MYSQL (RETRY)
// =======================
let db;

function connectWithRetry() {
  db = mysql.createConnection({
    host: "mysql_db",
    user: "root",
    password: "root_password",
    database: "mqtt_db"
  });

  db.connect((err) => {
    if (err) {
      console.log("❌ MySQL chưa sẵn sàng, retry sau 5s...");
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log("✅ Connected to MySQL");
    }
  });
}

connectWithRetry();

// =======================
// TEST API
// =======================
app.get("/", (req, res) => {
  res.send("Backend running");
});

// =======================
// 1. ADD USER
// =======================
app.post("/add-user", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "INSERT INTO users (username, password_hash) VALUES (?, ?)",
    [username, password],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("User added");
    }
  );
});

// =======================
// 2. ADD DEVICE + AUTO ACL
// =======================
app.post("/add-device", (req, res) => {
  const { username, device_id } = req.body;

  // tìm user
  db.query(
    "SELECT id FROM users WHERE username = ?",
    [username],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.length === 0) return res.status(404).send("User not found");

      const user_id = result[0].id;

      // thêm device
      db.query(
        "INSERT INTO devices (device_id, owner_id) VALUES (?, ?)",
        [device_id, user_id],
        (err) => {
          if (err) return res.status(500).send(err);

          // tạo ACL full quyền
          const topic = `sensor/${device_id}/#`;

          db.query(
            "INSERT INTO acl (username, topic, rw) VALUES (?, ?, 3)",
            [username, topic],
            (err) => {
              if (err) return res.status(500).send(err);
              res.send("Device + ACL added");
            }
          );
        }
      );
    }
  );
});

// =======================
// 3. ADD ACL
// =======================
app.post("/add-acl", (req, res) => {
  const { username, topic, rw } = req.body;

  db.query(
    "INSERT INTO acl (username, topic, rw) VALUES (?, ?, ?)",
    [username, topic, rw],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("ACL added");
    }
  );
});

// =======================
// 4. UPDATE ACL
// =======================
app.put("/update-acl", (req, res) => {
  const { id, rw } = req.body;

  db.query(
    "UPDATE acl SET rw = ? WHERE id = ?",
    [rw, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("ACL updated");
    }
  );
});

// =======================
// 5. LIST FULL DATA
// =======================
app.get("/full-data", (req, res) => {
  const query = `
    SELECT 
      u.username,
      d.device_id,
      a.topic,
      a.rw
    FROM users u
    LEFT JOIN devices d ON u.id = d.owner_id
    LEFT JOIN acl a ON u.username = a.username
  `;

  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// =======================
app.listen(3000, () => {
  console.log("🚀 Backend running on 3000");
});
