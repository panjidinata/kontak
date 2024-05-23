const express = require("express");
const app = express();
const port = 3000;

const Database = require("better-sqlite3");
const db = new Database("kontak.db", { verbose: console.log });

const { faker } = require("@faker-js/faker");
faker.seed(123);

let contacts = [];

for (let i = 0; i < 10; i++) {
  const randName = faker.person.fullName();
  const randEmail = faker.internet.email();

  contacts.push({ fullname: randName, email: randEmail });
}

db.exec("DROP TABLE IF EXISTS kontak");
db.exec("CREATE TABLE IF NOT EXISTS kontak (full_name TEXT, email TEXT)");
let stmt = db.prepare("SELECT * FROM kontak");

const insert = db.prepare(
  "INSERT INTO kontak (full_name, email) VALUES (@fullname, @email)",
);

const insertMany = db.transaction((data) => {
  for (const person of data) insert.run(person);
});

insertMany(contacts);

listContact = stmt.all();

console.log(listContact);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/view/index.html");
});

app.get("/contact", (req, res) => {
  res.json("list contact");
});

app.post("/contact", (req, res) => {
  res.json("add contact");
});

app.get("/contact/:id", (req, res) => {
  res.json("contact detail");
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
