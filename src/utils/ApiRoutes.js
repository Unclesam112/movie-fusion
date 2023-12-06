// apiEndpoints.js

const API_ENDPOINTS = {
    KEY: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzY0YzQ2YWI4NjQyN2Q1YzM2ZWNmOTU3MGIwMjQ0OSIsInN1YiI6IjY0OTZjODYzZWI3OWMyMDBjNTZkNDIwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B1why-oEZuEzU5xSfBffmEPZt7_xwFrVoaPUi_O26Ds',
    NOW_PLAYING: 'https://api.themoviedb.org/3/movie/now_playing',
    MOST_POPULAR: 'https://api.themoviedb.org/3/movie/popular',
    MOVIE_GENRE: ' https://api.themoviedb.org/3/genre/movie/list',
    TOP_RATED: 'https://api.themoviedb.org/3/movie/top_rated',
    ACTION_MOVIE: 'https://api./themoviedb.org/3/discover/movie?with_genres=28',
    SCI_FI_MOVIE: 'https://api./themoviedb.org/3/discover/movie?with_genres=878',
    ROMANCE_MOVIE: 'https://api./themoviedb.org/3/discover/movie?with_genres=10749',
    BASE_URL: 'https://api.themoviedb.org/3/movie/'
};

export default API_ENDPOINTS;
