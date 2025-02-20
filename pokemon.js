const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();
const API_URL = process.env.API_URL || "https://pokeapi.co/api/v2/pokemon"; // Default if not in .env


// router.get("/", async (req, res) => {
//     try {
//         let page = parseInt(req.query.page) || 1; // Ensure `page` is defined
//         let limit = 10;
//         let offset = (page - 1) * limit;

//         const response = await axios.get(`${API_URL}?limit=${limit}&offset=${offset}`);

//         return res.render("home", { 
//             pokemonList: response.data.results,
//             page,  // ✅ Ensure `page` is passed
//             nextPage: response.data.next ? true : false 
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Error fetching Pokémon data" });
//     }
// });

// Fetch Pokémon list
router.get("/", async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1; // Get current page
        let limit = 12; // Fetch only 10 Pokémon per page
        let offset = (page - 1) * limit; // Calculate offset

        const response = await axios.get(`${API_URL}?limit=${limit}&offset=${offset}`);

        return res.render("home", { 
            pokemonList: response.data.results,
            page,  
            offset,  // ✅ Pass offset to the template
            nextPage: response.data.next ? true : false 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching Pokémon data" });
    }
});



// Fetch Pokémon details
router.get("/pokemon/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const response = await axios.get(`${API_URL}/${name}`);
    return res.render("details", { pokemon: response.data }); // ✅ Fix res.sender() typo
  } catch (error) {
    console.error(error);
    return res.status(404).render("notFound", { name }); // ✅ Render notFound if Pokémon doesn't exist
  }
});

// Search Pokémon
router.get("/search", async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return res.redirect("/");

    const response = await axios.get(`${API_URL}/${name.toLowerCase()}`);
    return res.render("searchResults", { pokemon: response.data });
  } catch (error) {
    console.error(error);
    return res.status(404).render("notFound", { name });
  }
});

module.exports = router;
