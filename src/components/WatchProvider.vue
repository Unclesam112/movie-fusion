<!-- WatchProviderButton.vue -->
<template>
    <div>
        <div v-if="watchProviders">
            <h3 class="text-2xl">Available On</h3>
            <div>
                <button v-for="provider in watchProviders.buy" :key="provider.id" @click="redirectToProvider(provider.link)"
              
                    class="watch-provider-button">
                    <img
            :src="'https://image.tmdb.org/t/p/original' + provider.logo_path"
            :alt="provider.provider_name"
            class="watch-provider-logo my-2"
          />
                </button>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import API_ENDPOINTS from '../utils/ApiRoutes';


export default {
    data() {
        return {
            watchProviders: [],
            movieId: this.$route.params.id, // Replace with the actual movie ID
        };
    },
    methods: {
        async getWatchProviders() {
            try {

                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: API_ENDPOINTS.KEY
                    }
                };
                const apiUrl = `https://api.themoviedb.org/3/movie/${this.movieId}/watch/providers`;

                const response = await axios.get(apiUrl, options);

                if (response.data.results ) {
                    this.watchProviders = response.data.results.US; // Replace 'US' with the desired region code
                    console.log(response.data.results.US );
                } else {
                    this.watchProviders = [];
                }
            } catch (error) {
                console.error('Error fetching watch providers:', error);
            }
        },
        redirectToProvider(link) {
            window.open(link, '_blank'); // Open the provider link in a new tab
        },
    },
    mounted() {
        this.getWatchProviders();
    },
};
</script>
  
<style scoped>
/* Add styling for the buttons */
.watch-provider-button {
  margin: 5px;
  padding: 0; /* Remove padding for better alignment */
  cursor: pointer;
}

.watch-provider-logo {
  width: 60px; /* Adjust the width as needed */
  height: auto; /* Maintain the aspect ratio */
  display: block; /* Prevent unwanted space below the image */
}
</style>
  