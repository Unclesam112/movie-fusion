<template>
    <div class="navbar">
        <navbarVue class="bg-gray-900" />
    </div>

    <div class="my-8  breadcrumb mx-4 mx-auto md:pl-20">
            <breadcrumbVue />
        </div>

    <main class="px-5">
        <div class="genre my-10" v-if="genreName">
            <h1 class="text-left text-gray-900 text-4xl">{{ genreName.name }}</h1>
        </div>



        <div class="top-picks mt-10">
            <!-- <h1 class="text-lg md:text-2xl mb-2">Top Pick's For You</h1> -->
            <!-- <Carousel :items-to-show="carouselItemsToShow" :wrap-around="true">
                <Slide v-for="movie in movies" :key="movie.id">
                    <div class="carousel__item m-0 md:m-5">
                        <MovieCard :movie="movie" />
                    </div>
                </Slide>

            </Carousel> -->


            <div class="grid grid-cols-3  md:grid-cols-6 gap-2">
                <div class="col my-5" v-for="movie in movies" :key="movie.id">
                    <MovieCard :movie="movie" />
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios'
import navbarVue from '../components/layout/navbar.vue'
import API_ENDPOINTS from '../utils/ApiRoutes'
import MovieCard from '../components/MovieCard.vue';
import { defineComponent } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import breadcrumbVue from '../components/layout/breadcrumb.vue';


export default defineComponent({
    components: { navbarVue, MovieCard, Carousel, Slide, Navigation, breadcrumbVue},

    data() {
        return {
            movies: [],
            genre: {},
            genreName: null,
            carouselItemsToShow: 3.5
        }
    },

    mounted() {
        this.fetchGenre(),
            this.fetchGenreName()
              this.handleResize()
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize)
    },

    methods: {
        handleResize() {
            this.carouselItemsToShow = window.innerWidth >= 768 ? 5.5 : 2.5
        },

        async fetchGenre() {
            try {

                const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false';
                const genreId = this.$route.params.id;
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: API_ENDPOINTS.KEY
                    }
                };
                const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`, options)
                this.movies = response.data.results;
                console.log(response.data)
            }

            catch (error) {
                console.error('Error Fetching Genre:', error)
            }
        },

        async fetchGenreName() {
            try {
                const genreId = this.$route.params.id;
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: API_ENDPOINTS.KEY
                    }
                };
                const response = await axios.get(API_ENDPOINTS.MOVIE_GENRE, options)
                const genre = response.data.genres.find(genre => genre.id == genreId)
                this.genreName = genre
                console.log(genre);
            }

            catch (error) {
                console.error('Error Fetching Genre:', error)
            }
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