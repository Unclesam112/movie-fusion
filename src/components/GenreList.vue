<template>
    <main>


        <div class="Genre-list">
            <div class="top-picks">
                <Carousel :items-to-show="8.5" :wrap-around="true" class="hidden md:block lg:block">
                    <Slide v-for="genre in genres" :key="genre.id">
                        <div class="carousel__item m-5">
                            <button type="button"
                                class="text-gray-900 bg-white text-gray-500 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-full">
                                {{ genre.name }}
                            </button>
                        </div>
                    </Slide>

                    <template #addons>
                        <Navigation />
                    </template>
                </Carousel>

                <Carousel :items-to-show="1.5" :wrap-around="true" class="md:hidden">
                    <Slide v-for="genre in genres" :key="genre.id">
                        <div class="carousel__item m-5">
                            <button type="button"
                                class="text-gray-900 bg-white text-gray-500 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-full">
                                {{ genre.name }}
                            </button>
                        </div>
                    </Slide>

                    <template #addons>
                        <Navigation />
                    </template>
                </Carousel>
            </div>
        </div>

    </main>
</template>

<script>
import axios from 'axios';
import MovieCard from './MovieCard.vue';

import { defineComponent } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import API_ENDPOINTS from '../utils/ApiRoutes.js'



export default defineComponent({
    components: { MovieCard, Carousel, Slide, Navigation, },
    data() {
        return {
            genres: [],

        }
    },

    mounted() {
        this.fetchGenre()
    },

    methods: {
        fetchGenre() {

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: API_ENDPOINTS.KEY
                }
            };

            axios.get(API_ENDPOINTS.MOVIE_GENRE, options)
                .then(response => {
                    const data = response.data;
                    this.genres = data.genres;
                    console.log(data.genres);
                })

                .catch(err => {
                    console.log('Error fetching movie', err);
                })
        },

    
    }
})
</script>


<style></style>