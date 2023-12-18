<!-- MovieRatings.vue -->
<template>
    <div>
      <h1>{{ movieTitle }}</h1>
      <div v-if="ratings.length > 0">
        <div v-for="rating in ratings" :key="rating.Source">
          <span>{{ rating.Source }}:</span>
          <span v-if="rating.Source === 'Internet Movie Database'">
            <span v-html="getRatingIcon(rating.Value)"></span>
          </span>
        </div>
      </div>
      <div v-else>
        <p>No ratings available.</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
import API_ENDPOINTS from '../utils/ApiRoutes';

  export default {
    data() {
      return {
        apiKey: 'YOUR_TMDB_API_KEY',
        movieId: 'MOVIE_ID',
        movieTitle: 'Movie Ratings',
        ratings: [],
      };
    },
    mounted() {
      this.fetchMovieRatings();
    },
    methods: {
      async fetchMovieRatings() {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${this.movieId}/ratings?api_key=${ API_ENDPOINTS.KEY }`
          );
          this.ratings = response.data.Ratings;
        } catch (error) {
          console.error('Error fetching movie ratings:', error);
        }
      },
      getRatingIcon(value) {
        // Implement logic to determine which Iconify icon class to use based on the rating value
        // You may want to use different icons for different rating ranges
        // This is just an example, replace it with your actual logic
        if (parseFloat(value) >= 7.5) {
          return '<Icon class="iconify" icon="ph:star-fill" />'; // Replace with the appropriate class
        } else {
          return '<Icon class="iconify" icon="ph:star-half-fill" />'; // Replace with the appropriate class
        }
      },
    },
  };
  </script>
  
  <style>
  /* Add styles if needed */
  </style>
  