<template>
  <div>
    <div class="top-picks mt-8">
      <h1 class=" md:text-lg mb-2 flex">Top Rated Actors
        <Icon icon="mingcute:right-fill" width="20" color="red" class="mt-1 ml-4" />
      </h1>
      <Carousel :items-to-show="carouselItemsToShow" :wrap-around="true">
        <Slide v-for="actor in topRatedActors" :key="actor.id">
          <div class="carousel__item" @click="goToCast(actor.id)">
           <div class="border border-red-200 rounded-md p-1">
              <div class="border border-gray-300 rounded-md  p-1">
                <img :src="getImageUrl(actor.profile_path)" :alt="actor.name" class="w-28 h-28 object-cover rounded md:rounded-md" />
              </div>
           </div>
            <div class="card-content">
              <h2 class="card-title mt-4 text-xs text-gray-500 hidden md:block lg:block">{{ actor.name }}</h2>

            </div>
          </div>
        </Slide>
      </Carousel>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
import API_ENDPOINTS from '../utils/ApiRoutes';
import { defineComponent } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import { Icon } from '@iconify/vue';

export default defineComponent({
  components: { Carousel, Slide, Navigation, Icon},
  data() {
    return {
      topRatedActors: [],
      carouselItemsToShow: 7,
    };
  },
  mounted() {
    this.fetchTopRatedActors();
  },
  methods: {
    getImageUrl(path) {
      return path ? `https://image.tmdb.org/t/p/w300${path}` : 'https://via.placeholder.com/500';
    },
    handleResize() {
            this.carouselItemsToShow = window.innerWidth >= 786 ? 2.5 : 1.5
        },

    async fetchTopRatedActors() {
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: API_ENDPOINTS.KEY
          }
        };

        const apiUrl = `https://api.themoviedb.org/3/person/popular?language=en-US&page=1`;

        const response = await axios.get(apiUrl, options);
        this.topRatedActors = response.data.results;
        console.log(response.data.results);
      } catch (error) {
        console.error('Error fetching top-rated actors:', error);
      }
    },

    goToCast(id) {
      this.$router.push(`/cast/details/${id}`)
    }

  },
});
</script>
  
