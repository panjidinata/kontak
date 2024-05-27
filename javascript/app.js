const express = require("express");
const app = express();
const methodOverride = require("method-override");
const port = 3000;

const Database = require("./db.js");
const db = new Database("kontak.db");

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

if (db.isEmpty()) {
  db.insertMany(contacts);
}

app.set("view engine", "pug");

app.get("/", (req, res) => {
  let result = db.allContact();

  res.render("index", { contacts: result });
});

app.post("/contact", (req, res) => {
  console.log("create contact");

  data = {
    firstName: req.body.formFirstName,
    lastName: req.body.formLastName,
    email: req.body.formEmail,
  };

  let result = db.insertOne(data);

  res.json(result);
});

app.delete("/contact", (req, res) => {
  console.log("delete contact");
  let result = db.deleteContact(req.body.contactId);

  res.redirect(303, "/");
});

app.put("/contact", (req, res) => {
  console.log("update contact");
  let data = {
    contactId: req.body.formContactId,
    firstName: req.body.formFirstName,
    lastName: req.body.formLastName,
    email: req.body.formEmail,
  };

  let result = db.updateContact();

  res.redirect(303, "/");
});

app.get("/contact/:id", (req, res) => {
  const stmt = db.prepare(
    "SELECT first_name, last_name, email FROM kontak WHERE kontak_id = ?",
  );
  let result = stmt.get(req.params.id);
  res.json(result);
});

app.get("/api/v1/contacts", (req, res) => {
  let result = db.allContact();
  res.json(result);
});

app.listen(port, () => {
  console.log("listening on port: " + port);
});
