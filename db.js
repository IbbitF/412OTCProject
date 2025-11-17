import pg from "pg";

export const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "412Project",  //make sure the database name matches. 
  password: "placeholder", //put in your superuser password, to those who use this.
  port: 5432,
});

db.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err));
