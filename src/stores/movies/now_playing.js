import axios from 'axios';

const state = {
  movies: [],
};

const getters = {
  getNowPlayingMovies: (state) => state.movies,
};

const actions = {
  async fetchNowPlayingMovies({ commit }) {
    const url = 'https://api.themoviedb.org/3/movie/now_playing';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzY0YzQ2YWI4NjQyN2Q1YzM2ZWNmOTU3MGIwMjQ0OSIsInN1YiI6IjY0OTZjODYzZWI3OWMyMDBjNTZkNDIwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B1why-oEZuEzU5xSfBffmEPZt7_xwFrVoaPUi_O26Ds',
      },
    };

    try {
      const response = await axios.get(url, options);
      const data = response.data;
      commit('setNowPlayingMovies', data.results);
    } catch (error) {
      console.error('Error fetching now playing movies', error);
    }
  },
};

const mutations = {
  setNowPlayingMovies: (state, movies) => (state.movies = movies),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
