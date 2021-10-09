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
    res.status(500).json();
  }
});

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);
  if (!user) {
    return res.status(400).json({ err: "User not found please register" });
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.json({ message: "Logged in !!" });
    } else {
      res.json({ err: "Incorrect Password" });
    }
  } catch {
    res.status(500).json();
  }
});
