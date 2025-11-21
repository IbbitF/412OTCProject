//Packages from Node for server setup and postgres integration
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


//made 2 routes just in case to render login as the start
app.get("/", (req, res) => {
  res.render("login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

//posts name and password to database to compare (authorization not to be used in a real website lol)
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

  try {
    //Get coun
    const countResult = await db.query(
      `SELECT COUNT(*) 
       AS saved_count 
       FROM UserMedicine 
       WHERE userID = $1`,
      [userId]
    );

    //Find top brand for this user
    const brandResult = await db.query(
      `SELECT Brand.name, COUNT(*) AS freq
       FROM UserMedicine
       JOIN Medicine ON UserMedicine.medicineID = Medicine.id
       JOIN Brand ON Medicine.brandID = Brand.id
       WHERE UserMedicine.userID = $1
       GROUP BY Brand.name
       ORDER BY freq DESC
       LIMIT 1;`,
      [userId]
    );

    //Get most common type
    const typeResult = await db.query(
      `SELECT Medicine.type, COUNT(*) AS freq
       FROM UserMedicine
       JOIN Medicine ON UserMedicine.medicineID = Medicine.id
       WHERE UserMedicine.userID = $1
       GROUP BY Medicine.type
       ORDER BY freq DESC
       LIMIT 1;`,
      [userId]
    );

    res.render("dashboard", {
      userId: userId,
      savedCount: countResult.rows[0].saved_count,
      topBrand: brandResult.rows.length ? brandResult.rows[0].name : "None",
      commonType: typeResult.rows.length ? typeResult.rows[0].type : "None"
    });

  } catch (err) {
    console.error("Dashboard error:", err);
    res.render("dashboard", {
      userId,
      savedCount: 0,
      topBrand: "N/A",
      commonType: "N/A"
    });
  }
});


//just renders the create account page
app.get("/create-account", (req, res) => {
  res.render("createAccount");
});

//
app.post("/create-account", async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  //Basic validation (the authorization for the website is not valid lol but its just for a project)
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

app.get("/browse", async (req, res) => {
  const userId = req.query.user;  //uses userID from login

  try {
    const result = await db.query(`
      SELECT Medicine.id, Medicine.name AS med_name, Medicine.type, Brand.name AS brand_name
      FROM Medicine
      JOIN Brand ON Medicine.brandID = Brand.id
      ORDER BY Medicine.name ASC;
    `);

    res.render("browse", {
      medicines: result.rows,
      userId: userId 
    });

  } catch (err) {
    console.error(err);
    res.render("browse", { medicines: [], userId });
  }
});

//Takes medicine from ID to autofill the page
//Assigns the medicine to the UserMedicine with the associated userID
app.get("/add-medicine", async (req, res) => {
  const medId = req.query.med;
  const userId = req.query.user;

  if (!medId) {
    return res.render("addMedicine", { medicine: null, userId });
  }

  try {
    const result = await db.query(`
      SELECT Medicine.id, Medicine.name, Medicine.type, Brand.name AS brand
      FROM Medicine
      JOIN Brand ON Medicine.brandID = Brand.id
      WHERE Medicine.id = $1
    `, [medId]);

    res.render("addMedicine", { medicine: result.rows[0], userId });

  } catch (err) {
    console.error(err);
    res.render("addMedicine", { medicine: null, userId });
  }
});

//posts the info from above
app.post("/save-medicine", async (req, res) => {
  const { userID, medicineID, dosage, notes } = req.body;

  try {
    await db.query(
      `INSERT INTO UserMedicine (userID, medicineID, dosageForm, notes)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (userID, medicineID) DO NOTHING`,
      [userID, medicineID, dosage, notes]
    );

    res.redirect("/my-medicine?user=" + userID);

  } catch (err) {
    console.error("Error saving:", err);
    res.send("Error saving medicine");
  }
});

//Simply lists the medicine associated with the UserMedicine ID
app.get("/my-medicine", async (req, res) => {
  const userId = req.query.user;

  try {
    const result = await db.query(`
      SELECT 
        Medicine.name AS med_name,
        Brand.name AS brand_name,
        Medicine.type,
        UserMedicine.dosageForm,
        UserMedicine.notes
      FROM UserMedicine
      JOIN Medicine ON UserMedicine.medicineID = Medicine.id
      JOIN Brand ON Medicine.brandID = Brand.id
      WHERE UserMedicine.userID = $1
      ORDER BY Medicine.name ASC;
    `, [userId]);

    res.render("myMedicines", {
      userId: userId,
      medicines: result.rows
    });

  } catch (err) {
    console.error("Error loading saved medicines:", err);
    res.render("myMedicines", { medicines: [], userId });
  }
});


//Start server (copy pasted from the angela yu web dev course I took)
//tbh most of what i have in here is modeled from that
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
