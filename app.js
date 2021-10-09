const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();

const port = process.env.PORT || 3000;

const users = [];

app.listen(port, () => {
  console.log(`server hosted on https://localhost:${port}`);
});

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).json({ message: "User login" });
  } catch {
    res.status(500);
  }
});
