<template>
  <div>
    <h2 class="text-2xl mt-5">Top Rated Actors</h2>
    <div v-if="topRatedActors.length > 0">
      <div class="hidden sm:grid grid-cols-2" >
      <div v-for="actor in topRatedActors" :key="actor.name" @click="goToCast(actor.id)"
        class="actor-card flex justify-center shadow">
        <div class="">
          <img :src="actor.profileImage" :alt="actor.name" class="actor-image text-center mx-auto" />
          <div class="actor-details text-center">
            <h3 class="text-sm">{{ actor.name }}</h3>
            <p class="text-xs">Character: {{ actor.character }}</p>
          </div>
        </div>
      </div>
    </div>

    <Carousel :items-to-show="2.5" :wrap-around="true">
      <Slide v-for="actor in topRatedActors" :key="actor.name" @click="goToCast(actor.id)">
        <div class="carousel__item m-2 md:m-2">
          <div class="">
          <img :src="actor.profileImage" :alt="actor.name" class="actor-image text-center mx-auto" />
          <div class="actor-details text-center">
            <h3 class="text-xs truncate">{{ actor.name }}</h3>
            <!-- <p class="text-xs">Character: {{ actor.character }}</p> -->
          </div>
        </div>
        </div>
      </Slide>
    </Carousel>
    </div>
    <div v-else>
      <p>No top-rated actors available for this movie.</p>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
import API_ENDPOINTS from '../utils/ApiRoutes';
import { defineComponent } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
// Replace with your actual API endpoints file

export default defineComponent({
  data() {
    return {
      topRatedActors: [],
    };
  },

  components: { Carousel, Slide, Navigation,},
  methods: {
    async fetchTopRatedActors() {
      try {

        const movieId = this.$route.params.id;
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: API_ENDPOINTS.KEY
          }
        };


        const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
        const response = await axios.get(apiUrl, options);

        const topRatedActors = response.data.cast.slice(0, 5).map(actor => ({
          name: actor.name,
          id: actor.id,
          character: actor.character,
          profileImage: actor.profile_path
            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
            : null,
        }));

        this.topRatedActors = topRatedActors;
      } catch (error) {
        console.error('Error fetching top-rated actors:', error);
      }
    },

    goToCast(id) {
      this.$router.push(`/cast/details/${id}`)
    }
  },
  mounted() {
    // Example: Fetch top-rated actors for movie with ID 123
    this.fetchTopRatedActors();
  },
});
</script>
  
<style scoped>
.actor-card {
  /* display: ; */
  margin-bottom: 20px;
  padding: 10px;
  /* border: 1px solid #ddd; */
  border-radius: 8px;
  margin: 10px;
}

.actor-card:hover {
  background: rgb(239, 238, 238);
  transition: background 1s ease-in;
  cursor: pointer;
}

.actor-image {
  width: 120px;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
}

.actor-details {}

/* Add additional styling as needed */
</style>
  
