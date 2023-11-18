import axios from "axios";

export const api = axios.create({
    baseURL:'http://localhost:4000'
});

export const getPopularMovies = async () => {
    const res = await api.get('/movies');
    return res.data;
}

export const getRelatedMovies = async (movieId) => {
    const res = await api.get(`/movies/related/${movieId}`);
    return res.data;
}

