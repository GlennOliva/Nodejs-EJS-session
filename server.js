const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const pokemonRoutes = require("./pokemon"); // Import the routes

app.set("view engine", "ejs"); // ✅ Fix view engine setup
app.use(express.static(path.join(__dirname, "public"))); // ✅ Fix static files

app.use("/", pokemonRoutes); // ✅ Use the imported router

const port = process.env.PORT || 3000; // ✅ Correct PORT setup
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
