const { Router } = require("express");
const { Genre } = require("../db");
const axios = require("axios");
const router = Router();
const { API_KEY } = process.env;


router.get("/" ,async(req , res) => {
// me traigo los datos de la api para guardarlos en la db y sacarlos de la db. Esto lo deberia hacer 1 sola vez.
    try {
        const rawg = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)  
        rawg.data.results.forEach((g) => {
            Genre.findOrCreate({
                where:{
                    id: g.id,
                    name: g.name
                },
            });
        });
        
        const allGenre = await Genre.findAll();
        res.json(allGenre);
    } catch (error) {
        res.status(404).json({ error: "Genre not found" })
    };
});

module.exports = router;