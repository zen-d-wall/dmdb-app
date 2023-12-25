import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	headers: { Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}` },
});

export const apiKey = process.env.REACT_APP_TMDB_API_KEY;
