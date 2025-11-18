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

app.post("/create-account", async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  // Basic validation
  if (!username || !password || !confirmPassword) {
    return res.render("createAccount", { error: "All fields are required." });
  }

  if (password !== confirmPassword) {
    return res.render("createAccount", { error: "Passwords do not match." });
  }

  try {
    //Check if username already exists
    const existing = await db.query(
      "SELECT * FROM Users WHERE username = $1",
      [username]
    );

    if (existing.rows.length > 0) {
      return res.render("createAccount", { error: "Username already taken." });
    }

    //Insert new user
    await db.query(
      "INSERT INTO Users (username, password) VALUES ($1, $2)",
      [username, password]
    );

    //Redirect to login after successful signup
    res.redirect("/login");

  } catch (err) {
    console.error(err);
    res.render("createAccount", { error: "Server error occurred." });
  }
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
