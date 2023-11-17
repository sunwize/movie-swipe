require('dotenv').config();
const express = require('express')
const app = express()
const port = 4000
const fetch = require('node-fetch');

express()
.get("/movie" , async (req,res)=> {
    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`
        }
    };

    const response = await fetch(url, options)
    .then(res => res.json());

    res.json(response.results);
})


.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
