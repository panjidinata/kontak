const express = require("express");
const app = express();
const methodOverride = require("method-override");
const port = 3000;

const Database = require("better-sqlite3");
const db = new Database("kontak.db", { verbose: console.log });

const { faker } = require("@faker-js/faker");
faker.seed(123);

let contacts = [];

for (let i = 0; i < 10; i++) {
  const randFirst = faker.person.firstName();
  const randLast = faker.person.lastName();

  const randEmail = faker.helpers.unique(faker.internet.email, [
    randFirst,
    randLast,
  ]);

  contacts.push({ firstName: randFirst, lastName: randLast, email: randEmail });
}

db.exec("DROP TABLE IF EXISTS kontak");
db.exec(
  "CREATE TABLE IF NOT EXISTS kontak (kontak_id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, email TEXT)",
);
let stmt = db.prepare("SELECT * FROM kontak");

const insert = db.prepare(
  "INSERT INTO kontak (first_name, last_name, email) VALUES (@firstName, @lastName, @email)",
);

const insertMany = db.transaction((data) => {
  for (const person of data) insert.run(person);
});

insertMany(contacts);

listContact = stmt.all();

console.log(listContact);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      let method = req.body._method;
      console.log(method, req.body._method);
      delete req.body._method;
      return method;
    }
  }),
);

app.set("view engine", "pug");

app.get("/", (req, res) => {
  const stmt = db.prepare("SELECT * FROM kontak");
  let result = stmt.all();

  res.render("index", { contacts: result });
});

app.post("/contact", (req, res) => {
  console.log(req.body);

  const stmt = db.prepare(
    "INSERT INTO kontak (first_name, last_name, email) values (?,?,?)",
  );
  let result = stmt.run(
    req.body.formFirstName,
    req.body.formLastName,
    req.body.formEmail,
  );

  res.json(result);
});

app.delete("/contact", (req, res) => {
  const stmt = db.prepare("DELETE FROM kontak WHERE kontak_id = ?");
  let result = stmt.run(req.body.contactId);
  console.log(req.body.contactId);

  res.redirect(303, "/");
});

app.put("/contact", (req, res) => {
  const stmt = db.prepare(
    "UPDATE kontak SET first_name = ?, last_name = ?, email = ? WHERE kontak_id = ?",
  );
  let result = stmt.run(
    req.body.formFirstName,
    req.body.formLastName,
    req.body.formEmail,
    req.body.formContactId,
  );

  res.redirect(303, "/");
});

app.get("/contact/:id", (req, res) => {
  const stmt = db.prepare(
    "SELECT first_name, last_name, email FROM kontak WHERE kontak_id = ?",
  );
  let result = stmt.get(req.params.id);
  res.json(result);
});

app.get("/contacts", (req, res) => {
  const stmt = db.prepare("SELECT * FROM kontak");
  let result = stmt.all();
  res.json(result);
});

app.listen(port, () => {
  console.log("listening on port: " + port);
});
