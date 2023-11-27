<template>
    <main>


        <div class="Genre-list">
            <div class="top-picks">
                <Carousel :items-to-show="8.5" :wrap-around="true" class="hidden md:block lg:block">
                    <Slide v-for="genre in genres" :key="genre.id">
                        <div class="carousel__item m-5">
                            <GenreButton :genre="genre"/>
                        </div>
                    </Slide>

                    <template #addons>
                        <Navigation />
                    </template>
                </Carousel>

                <Carousel :items-to-show="3" :wrap-around="true" class="md:hidden">
                    <Slide v-for="genre in genres" :key="genre.id">
                        <div class="carousel__item m-5">
                            <GenreButton :genre="genre"/>
                        </div>
                    </Slide>

                   
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
import GenreButton from './GenreButton.vue';



export default defineComponent({
    components: { MovieCard, Carousel, Slide, Navigation, GenreButton},
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