const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const pokemonRoutes = require("./pokemon"); // Import the routes

// ✅ Set EJS as the view engine
app.set("view engine", "ejs");

// ✅ Explicitly define the views directory
app.set("views", path.join(__dirname, "views"));

// ✅ Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

app.use("/", pokemonRoutes); // ✅ Use the imported router

const port = process.env.PORT || 3000; // ✅ Correct PORT setup
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
