<template>
    <main class="">
        <navbarVue class="nav" />

        <div class="p-5 py-5 btn">
            <button type="button"
                class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-gray-900 border border-2-gray-900 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                TV Shows
            </button>


            <button type="button"
                class="mx-2 px-3 py-2 text-xs font-medium text-center inline-flex items-center text-gray-900 border border-2-gray-900  rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

                Movies
            </button>

            <button type="button"
                class="px-3 py-2 text-xs font-medium text-center inline-flex items-center border border-2-gray-900 text-gray-900 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

                Categories
            </button>
        </div>






        <Carousel :items-to-show="1" :wrap-around="true" class="p-4 h-50">
            <Slide v-for="movie in currentMovie" :key="movie.id">
                <div class="relative w-full h-50 p-2">
                    <img :src="getBackgroundImageUrl(movie.backdrop_path)" alt="Background Image"
                        class="w-full rounded-lg h-50 object-cover backdrop-image" />
                    <div class="absolute rounded-lg inset-2 overlay">

                        <transition name="fade" mode="out-in">
                            <div :key="currentMovie.id" class="sm:grid sm:grid-cols md:grid-cols-2 md:px-20 md:py-5 p-5">
                                <div class="col mt-28 absolute bottom-8">
                                    <h1 class="title text-left text-2xl text-white w-64 truncate"> 
                                        <router-link
                                            :to="`/movie/details/${movie.id}`"> {{ movie.title }}</router-link></h1>
                                    <p class="text-xs text-left text-gray-300 font-medium">Action, Thriller, Drama</p>

                                    <div class="text-left mt-2">

                                        <router-link :to="`/movie/details/${movie.id}`" type="button"
                                            class="px-3 py-1 text-xs font-medium text-center inline-flex items-center text-gray-900 bg-white rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <Icon icon="solar:play-bold" class="mr-2" />
                                            Play
                                        </router-link>

                                        <router-link :to="`/movie/details/${movie.id}`" type="button"
                                            class="px-3 mx-2 py-1 text-xs font-medium text-center bg-gray-10 inline-flex items-center text-gray-900 rounded">
                                            <Icon icon="teenyicons:add-outline" class="mr-2" />
                                            My List
                                        </router-link>


                                        <!-- <button type="button"
                                            class="mx-5 w-8 h-8 mr-2 my-0 mb-2 text-sm font-medium text-gray-900 focus:outline-none rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                            <Icon icon="teenyicons:add-outline" width="15" color="white" class="mx-auto" />
                                        </button> -->
                                    </div>

                                </div>
                            </div>
                        </transition>
                    </div>
                </div>

            </Slide>
            <!-- 
            <template #addons>
                <Pagination />
              
            </template> -->
        </Carousel>


        <form>
            <div class="flex p-5 py-0">

                <div id="dropdown"
                    class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                        <li>
                            <button type="button"
                                class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
                        </li>
                        <li>
                            <button type="button"
                                class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
                        </li>
                        <li>
                            <button type="button"
                                class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
                        </li>
                        <li>
                            <button type="button"
                                class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
                        </li>
                    </ul>
                </div>
                <div class="relative w-full">
                    <input type="search" id="search-dropdown"
                        class="block p-2.5 w-full z-20 text-sm text-gray-900 rounded-e-lg border-0 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        placeholder="Search Movie" required>
                    <button type="submit"
                        class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white  rounded-e-lg border-l border-gray-300 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <Icon icon="mingcute:search-line" color="black" />
                        <span class="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </form>
    </main>
</template>
  
<script>
import { Icon } from '@iconify/vue';
import navbarVue from '../navbar.vue';
import axios from 'axios';
import { defineComponent } from 'vue'
import { Carousel, Navigation, Pagination, Slide, } from 'vue3-carousel'
import { initFlowbite } from 'flowbite'


import 'vue3-carousel/dist/carousel.css'
import API_ENDPOINTS from '../../../utils/ApiRoutes';

export default defineComponent({
    components: {
        Icon, navbarVue, Carousel,
        Slide,
        Navigation,
        Pagination
    },
    data() {
        return {
            currentMovie: [],
            tmdbRuntime: null,
            tmdbRating: null,
        };
    },

    computed: {
        formattedDate() {
            const date = this.movie.release_date
            const formatDate = format(date, 'MMMM d, yyyy');
            return formatDate
        },

        formattedRuntime() {
            return this.tmdbRuntime !== null ? this.formatRuntime(this.tmdbRuntime) : '';
        },

        formattedRating() {
            return this.tmdbRating !== null ? this.formatRating(this.tmdbRating) : '';
        },
    },


    mounted() {
        this.fetchRandomMovie();
        setInterval(this.fetchRandomMovie, 100000);
        initFlowbite()
    },
    methods: {
        getImageUrl(path) {
            return path ? `https://image.tmdb.org/t/p/w300${path}` : 'https://via.placeholder.com/500';
        },

        getBackgroundImageUrl(path) {
            return path ? `https://image.tmdb.org/t/p/w1280${path}` : 'https://via.placeholder.com/500';
        },

        fetchRandomMovie() {

            const url = ' https://api.themoviedb.org/3/movie/now_playing';
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: API_ENDPOINTS.KEY
                }
            };

            axios.get(url, options)
                .then(response => {
                    const data = response.data;
                    const randomIndex = Math.floor(Math.random() * data.results.length);
                    this.currentMovie = data.results;
                    this.tmdbRuntime = data.results[randomIndex].runtime;
                    this.tmdbRating = data.results[randomIndex].vote_average;

                })

                .catch(err => {
                    console.log('Error fetching movie', err);
                })
        },


        formatReleaseDate(dateString) {
            try {
                const date = new Date(dateString);
                const options = { day: 'numeric', month: 'long', year: 'numeric' };
                const formattedDate = date.toLocaleDateString(undefined, options);
                return formattedDate.replace(/(\d+)([a-z]+)/i, (_, day, month) => `${this.addSuffix(day)} ${month}`);
            } catch (error) {
                console.error('Error formatting release date:', error);
                return 'Invalid Date';
            }
        },

        formatRuntime(minutes) {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return `${hours}h ${remainingMinutes}m`;
        },

         addSuffix(day) {
            if (day >= 11 && day <= 13) {
                return `${day}th`;
            }
            switch (day % 10) {
                case 1: return `${day}st`;
                case 2: return `${day}nd`;
                case 3: return `${day}rd`;
                default: return `${day}th`;
            }
        },


        formatRating(rating) {
            if (rating !== null && !isNaN(rating)) {
                const formattedRating = (rating).toFixed(1); // Format to one decimal place
                return `${formattedRating}/10`;
            } else {
                return 'N/A'; // or any other default value for cases where the rating is not available or not a valid number
            }
        },

        goToDetails(id) {
            this.$router.push(`/movie/details/${id}`)
        }

    },
});
</script>
  
<style scoped>
.nav {
    display: relative;
    z-index: 2;
}

.carousel__slide {
  scroll-snap-stop: auto;
  flex-shrink: 0;
  margin: 0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateZ(0);
  height: 200px;
}

.overlay {
    background: rgba(0, 0, 0, 0.4);
}
</style>
  
