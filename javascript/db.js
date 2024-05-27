const Sqlite = require("better-sqlite3");

class Database {
  #db;

  constructor(dFile) {
    this.#db = new Sqlite(dFile, { verbose: console.log });
    this.#db.exec(
      "CREATE TABLE IF NOT EXISTS kontak (kontak_id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, email TEXT)",
    );
  }

  isEmpty() {
    const stmt = this.#db.prepare("SELECT EXISTS (SELECT 1 FROM kontak)");
    let result = stmt.get();

    if (result < 1) {
      return false;
    }

    return true;
  }

  allContact() {
    const stmt = this.#db.prepare("SELECT * FROM kontak");
    let result = stmt.all();
    return result;
  }

  insertMany(data) {
    const stmt = this.#db.prepare(
      "INSERT INTO kontak (first_name, last_name, email) VALUES (@firstName, @lastName, @email)",
    );

    const insert = this.#db.transaction((contacts) => {
      for (const contact of contacts) stmt.run(contact);
    });

    let result = insert(data);

    return result;
  }

  insertOne(data) {
    const stmt = this.#db.prepare(
      "INSERT INTO kontak (first_name, last_name, email) values (@firstName,@lastName,@email)",
    );

    let result = stmt.run({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    });

    return result;
  }

  deleteContact(contactId) {
    const stmt = this.#db.prepare("DELETE FROM kontak WHERE kontak_id = ?");
    let result = stmt.run(contactId);

    return result;
  }

  updateContact(data) {
    const stmt = this.#db.prepare(
      "UPDATE kontak SET first_name = @firstName, last_name = @lastName, email = @email WHERE kontak_id = @contactId",
    );

    let result = stmt.run({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      contactId: data.contactId,
    });

    return result;
  }
}

module.exports = Database;
