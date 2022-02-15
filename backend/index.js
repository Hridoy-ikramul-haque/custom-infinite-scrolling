const bodyParser = require("body-parser");
const cors = require("cors");
const mySql = require("mysql2");
const express = require("express");
const app = express();

const db = mySql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "student",
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/getInfo", (req, res) => {
  const sqlFetch = "SELECT * FROM information";
  db.query(sqlFetch, (err, result) => {
    // console.log("Error: ", err);
    // console.log("Result: ", result);
    res.send(result);
  });
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
