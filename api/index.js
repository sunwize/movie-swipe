require('dotenv').config();
const express = require('express');
const helmet = require("helmet");
const cors = require("cors")
const app = express();
const port = 4000;
const fetch = require('node-fetch');

express()
.use(helmet())
.use(express.json())
.use(cors())

.get("/movies" , async (req,res)=> {
    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`
        }
    }
    const response = await fetch(url, options).then(res => res.json());
    res.json(response.results);
})

.get("/movies/related/:id", async (req, res) => {
    const url = `https://api.themoviedb.org/3/movie/${req.params.id}/recommendations`;
    const options = {
        method: 'GET', 
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`
        }
    }
    const response = await fetch(url, options).then(res => res.json());
    res.json(response.results);
})

.get("*", (req, res) => {
    res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
    });
})

.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
