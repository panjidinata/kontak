const express = require("express");
const app = express();
const port = 3000;

let listContact = [{ Name: "asdflkj", email: "adsfkjh" }];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/view/index.html");
});

app.get("/contact", (req, res) => {
  res.json(listContact);
});

app.post("/contact", (req, res) => {
  res.json("add contact");
});

app.get("/contact/:id", (req, res) => {
  res.json("param: " + req.params.id);
});

app.put("/contact/:id", (req, res) => {
  res.json("update contact");
});

app.delete("/contact/:id", (req, res) => {
  res.json("delete contact");
});

app.listen(port, () => {
  console.log("listening on port: " + port);
});
