<template>
    <main>
        <div class="genreList">
            <GenreList />
        </div>

        <div class="movie-list mt-10">
            <div class="top-picks">
                <h1 class="text-lg md:text-3xl mb-2">Top Pick's For You</h1>
                <Carousel :items-to-show="carouselItemsToShow" :wrap-around="true">
                    <Slide v-for="movie in movies" :key="movie.id">
                        <div class="carousel__item m-0 md:m-5">
                            <MovieCard :movie="movie" />
                        </div>
                    </Slide>

                   
                </Carousel>
            </div>

            <div class="popular mt-10">
                <h1 class="text-lg md:text-3xl mb-2">Most Popular</h1>
                <Carousel :items-to-show="carouselItemsToShow" :wrap-around="true">
                    <Slide v-for="movie in popular" :key="movie.id">
                        <div class="carousel__item m-5">
                            <MovieCard :movie="movie" />
                        </div>
                    </Slide>

                </Carousel>
            </div>


            <div class="popular mt-10">
                <h1 class="text-lg md:text-3xl mb-2">Top Rated</h1>
                <Carousel :items-to-show="carouselItemsToShow" :wrap-around="true">
                    <Slide v-for="movie in topRated" :key="movie.id">
                        <div class="carousel__item m-5">
                            <MovieCard :movie="movie" />
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
import GenreList from './GenreList.vue';


export default defineComponent({
    components: { MovieCard, GenreList, Carousel, Slide, Navigation, },
    data() {
        return {
            movies: [],
            popular: [],
            topRated: [],
            carouselItemsToShow: 3.5
        }
    },

//     computed: {
//     nowPlayingMovies() {
//       return this.$store.state.nowPlaying.movies; // Access the state directly
//     },
//   },
//   created() {
//     this.$store.dispatch('nowPlaying/fetchNowPlayingMovies');
//   },

    mounted() {
        this.fetchTopPickMovie()
        this.fecthMostPopular()
        this.fecthTopRated()

        window.addEventListener('resize', this.handleResize)
        this.handleResize()
    },

    beforeDestroy(){
        window.removeEventListener('resize', this.handleResize)
    },

    methods: {
        handleResize() {
            this.carouselItemsToShow = window.innerWidth >= 768 ? 5.5 : 3.5
        },

        fetchTopPickMovie() {

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: API_ENDPOINTS.KEY
                }
            };

            axios.get(API_ENDPOINTS.NOW_PLAYING, options)
                .then(response => {
                    const data = response.data;
                    this.movies = data.results;
                    console.log(data.results);
                })

                .catch(err => {
                    console.log('Error fetching movie', err);
                })
        },

        fecthMostPopular() {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: API_ENDPOINTS.KEY
                }
            };

            axios.get(API_ENDPOINTS.MOST_POPULAR, options)
                .then(response => {
                    const data = response.data;
                    this.popular = data.results;
                    console.log(data.results);
                })

                .catch(err => {
                    console.log('Error fetching movie', err);
                })
        },

        fecthTopRated() {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: API_ENDPOINTS.KEY
                }
            };

            axios.get(API_ENDPOINTS.TOP_RATED, options)
                .then(response => {
                    const data = response.data;
                    this.topRated = data.results;
                    console.log(data.results);
                })

                .catch(err => {
                    console.log('Error fetching movie', err);
                })
        }
    }
})
</script>

<style>
.carousel__item {
    margin: 10px;
    text-align: left !important;
}

@media screen and (max-width: 780px) {
    .carousel__item {
    margin: 2px;
    text-align: left !important;
} 
}
</style>