const express = require("express");

const app = express();

const port = process.env.PORT || 3000;

const users = [];

app.listen(port, () => {
  console.log(`server hosted on https://localhost:${port}`);
});

app.use(express.urlencoded());
app.use(express.json());

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  if (req.body.name && req.body.password) {
    const user = { name: req.body.name, password: req.body.password };
    users.push(user);
    res.status(201).json({ message: "User login" });
  } else {
    res.json({ err: "Please enter data" });
  }
});
