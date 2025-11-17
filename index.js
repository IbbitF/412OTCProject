import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "./db.js";

const app = express();
const port = 3000;

//Required for ES modules to work with __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");

//Connects the static files to styling
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req, res) => {
  res.render("login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await db.query(
      "SELECT * FROM Users WHERE username = $1 AND password = $2",
      [username, password]
    );

    if (result.rows.length > 0) {
      //Successful
      res.redirect("/dashboard?user=" + result.rows[0].id);
    } else {
      //Failure
      res.render("login", { error: "Invalid username or password." });
    }
  } catch (err) {
    console.error(err);
    res.render("login", { error: "Server error occurred." });
  }
});

app.get("/dashboard", async (req, res) => {
  const userId = req.query.user;

  res.render("dashboard", { userId });
});

app.get("/create-account", (req, res) => {
  res.render("createAccount");
});

// Temporary placeholder routes for other pages
app.get("/dashboard", (req, res) => res.render("dashboard"));
app.get("/browse", (req, res) => res.render("browse"));
app.get("/add-medicine", (req, res) => res.render("addMedicine"));
app.get("/my-medicine", (req, res) => res.render("myMedicine"));

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
