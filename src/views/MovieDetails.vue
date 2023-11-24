<template>
    <main>
        <div class="navbar">
            <navbarVue class="bg-gray-900 text-white" />
        </div>
    </main>


    <main class="h-screen">
        <div class="relative w-full h-full">
            <img :src="getBackgroundImageUrl(movie.backdrop_path)" alt="Background Image"
                class="w-full h-full object-cover backdrop-image" />
            <div class="absolute inset-0 overlay">
                <transition name="fade" mode="out-in">
                    <div :key="movie.id" class="grid grid-cols md:grid-cols-2 gap-10  md:px-20 md:py-5 p-5">
                        <div class="col-sapn-1 mt-28">
                            <h1 class="title text-6xl text-white">{{ movie.original_title }}</h1>
                            <!-- ... rest of your content ... -->
                            <button type="button"
                                class="py-1 px-4 mr-2 text-3xl my-4 mb-2 text-sm font-medium focus:outline-none text-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">16+</button>

                            <div class="flex items-center my-5">
                                <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <p class="ml-2 text-sm font-bold text-white dark:text-white">{{ formattedRating }}</p>
                                <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                                <a href="#" class="text-sm font-medium text-white hover:no-underline dark:text-white">
                                    {{ formatReleaseDate(movie.release_date) }}
                                </a>

                                <a href="#" class="text-sm mx-2 font-medium text-white hover:no-underline dark:text-white">
                                    {{ formattedRuntime }}
                                </a>
                            </div>

                            <div class="button flex gap-4 my-2">
                                <button data-tooltip-target="tooltip-default" type="button"
                                    class="btn bg-red-700 rounded-full p-4">
                                    <Icon icon="ph:heart-fill" color="white" />
                                </button>
                                <div id="tooltip-default" role="tooltip"
                                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    Tooltip content
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>

                                <button class="btn bg-red-700 rounded-full p-4">
                                    <Icon icon="icon-park-solid:tag" color="white" />
                                </button>

                                <button class="btn bg-red-700 rounded-full p-4">
                                    <Icon icon="ph:star-fill" color="white" />
                                </button>

                            </div>

                        </div>
                    </div>
                </transition>

                <div class="video-box mx-20 hidden md:block lg:block">
                    <!-- <h1 class="text-lg text-white mt-0">Watch Trailers on Youtube</h1> -->
                    <div class="videos " v-if="videos.length">

                        <Carousel :items-to-show="3.5" :wrap-around="true">
                            <Slide v-for="video in videos.slice(0, 4)" :key="video.id">
                                <div class="carousel__item">
                                    <iframe class="ml-10" :src="getVideoUrl(video.key)" frameborder="0" height="200"
                                        allowfullscreen></iframe>
                                </div>
                            </Slide>

                            <template #addons>
                                <Navigation />
                            </template>
                        </Carousel>

                    </div>
                </div>
            </div>


        </div>
    </main>

    <main class="info my-10 md:mx-20 mx-5">


        <ul
            class="text-sm font-medium text-center text-gray-500 rounded-lg shadow flex dark:divide-gray-700 dark:text-gray-400">
            <li class="w-full">
                <a href="#" @click.prevent="activeTab = 1"
                    :class="{ 'bg-red-700': activeTab === 1, 'text-white': activeTab === 1, 'bg-gray-300': activeTab !== 1, 'text-gray-700': activeTab !== 1, 'transition': true }"
                    class="fade inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
                    aria-current="page">Description</a>
            </li>
            <li class="w-full">
                <a href="#" @click.prevent="activeTab = 2"
                    :class="{ 'bg-red-700': activeTab === 2, 'text-white': activeTab === 2, 'bg-gray-300': activeTab !== 2, 'text-gray-700': activeTab !== 2, 'transition': true }"
                    class="fade inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Cast</a>
            </li>
            <li class="w-full">
                <a href="#" @click.prevent="activeTab = 3"
                    :class="{ 'bg-red-700': activeTab === 3, 'text-white': activeTab === 3, 'bg-gray-300': activeTab !== 3, 'text-gray-700': activeTab !== 3, 'transition': true }"
                    class="fade inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">More</a>
            </li>

        </ul>

        <div class="overview md:p-0 py-5cd admincd fade my-8" v-show="activeTab === 1" v-if="movie" key="1">
            <h1 class="text-3xl font-bold">Overview</h1>

            <h1 class="text-xl mt-8 my-4 font-bold">{{ movie.tagline }}</h1>
            <p class="text-xl pb-5 text-gray-700">{{ movie.overview }}</p>
            <div class="date text-gray-700 mb-6">
                <span class="font-semibold text-gray-900">Release Date:</span> {{ formatReleaseDate(movie.release_date) }}
            </div>

            <div class="date text-gray-700 mb-6">
                <span class="font-semibold text-gray-900">Budget:</span> ${{ movie.budget }}
            </div>


            <div class="date text-gray-700">
                <span class="font-semibold text-gray-900">Revenue:</span> ${{ movie.revenue }}
            </div>

            <div class="button flex gap-4 my-6">
                <button data-tooltip-target="tooltip-default" type="button" class="btn bg-gray-900 rounded-full p-4">
                    <Icon icon="ph:heart-fill" color="white" />
                </button>
                <div id="tooltip-default" role="tooltip"
                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Tooltip content
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>

                <button class="btn bg-gray-900 rounded-full p-4">
                    <Icon icon="icon-park-solid:tag" color="white" />
                </button>

                <button class="btn bg-gray-900 rounded-full p-4">
                    <Icon icon="ph:star-fill" color="white" />
                </button>

            </div>

            <hr class="my-10" />
            <div class="genre">
                <h1 class="text-2xl">Genres:</h1>

                <div class="flex gap-4 my-4 ">
                    <span v-for="genre in movie.genres" :key="genre.id" class=" ">
                        <GenreButton :genre="genre" />
                    </span>
                </div>

            </div>

            <div class="video-box md:hidden lg:hidden my-8">
                <h1 class="text-2xl text-gray-900 mt-0">Watch Trailers on Youtube</h1>
                <div class="videos" v-if="videos.length">
                    <div class="carousel__item" v-for="video in videos.slice(0, 4)" :key="video.id">
                        <iframe class="w-full my-3" :src="getVideoUrl(video.key)" frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>



        <div class="overview md:p-0 py-5cd admincd fade my-6" v-show="activeTab === 2" v-if="movie" key="2">
            <h1 class="text-3xl font-semibold my-8 text-gray-900">Full Cast & Crew</h1>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
               
                <div class="col" v-for="cast in casts" :key="cast.id">
                    
                    <CastCard :cast="cast" />
                    <h1 class="text-gray-500 text-md text-center">{{ cast.name }}</h1>
                </div>
            </div>
        </div>

        <div class="top-picks mt-10">
            <h1 class="text-lg md:text-2xl mb-2">Related Movies</h1>
            <Carousel :items-to-show="carouselItemsToShow" :wrap-around="true">
                <Slide v-for="movie in relatedMovies" :key="movie.id">
                    <div class="carousel__item m-0 md:m-5">
                        <MovieCard :movie="movie" />
                    </div>
                </Slide>


            </Carousel>
        </div>
    </main>
</template>

<script>
import axios from 'axios'
import navbarVue from '../components/layout/navbar.vue'
import API_ENDPOINTS from '../utils/ApiRoutes'
import { defineComponent } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import { format } from 'date-fns'
import GenreButton from '../components/GenreButton.vue'
import MovieCard from '../components/MovieCard.vue'
import { scrollToTop } from '../utils/scrollToTop.js'
import CastCard from '../components/CastCard.vue'
import { Icon } from '@iconify/vue';


export default defineComponent({
    components: { navbarVue, MovieCard, Carousel, Slide, Navigation, GenreButton, CastCard, Icon },
    data() {
        return {
            movie: {},
            videos: [],
            relatedMovies: [],
            carouselItemsToShow: 3.5,
            activeTab: 1,
            casts: [],
            tmdbRuntime: null,
            tmdbRating: null,
        }
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

    watch: {
        '$route.params.id': 'fetchMovieDetails',
        '$route.params.id': 'fetchMovieCast',
        '$route.params.id': 'fetchVideos',
        '$route.params.id': 'fetchRelatedMovies'
    },

    beforeRouteUpdate(to, from, next) {
        this.fetchMovieDetails();
        this.fetchMovieCast();
        this.fetchVideos();
        this.fetchRelatedMovies()
        next();
    },


    mounted() {
        this.fetchVideos()
        this.fetchMovieDetails()
        this.fetchMovieCast()
        window.addEventListener('resize', this.handleResize)
        this.handleResize()
        this.fetchRelatedMovies()
    },

    methods: {
        handleResize() {
            this.carouselItemsToShow = window.innerWidth >= 768 ? 5.5 : 2.5
        },

        getImageUrl(path) {
            return path ? `https://image.tmdb.org/t/p/w300${path}` : 'https://via.placeholder.com/500';
        },



        getBackgroundImageUrl(path) {
            return path ? `https://image.tmdb.org/t/p/w1280${path}` : 'https://via.placeholder.com/500';
        },

        async fetchMovieDetails(id) {
            const movieId = this.$route.params.id
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: API_ENDPOINTS.KEY
                }
            };

            axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, options)
                .then(response => {
                    const data = response.data;
                    const genreIds = data.genres.map(genre => genre.id)
                    this.movie = data
                    this.tmdbRuntime = response.data.runtime;
                    this.tmdbRating = response.data.vote_average;
                    console.log(data);
                })

                .catch(err => {
                    console.log('Error fetching movie', err);
                })

            scrollToTop();
        },

        async fetchMovieCast() {
            const movieId = this.$route.params.id
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: API_ENDPOINTS.KEY
                }
            };

            axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, options)
                .then(response => {
                    const data = response.data.cast;
                    this.casts = data
                    console.log("Cast:", data);
                })

                .catch(err => {
                    console.log('Error fetching movie', err);
                })

        },

        async fetchRelatedMovies() {
            try {
                const movieId = this.$route.params.id
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: API_ENDPOINTS.KEY
                    }
                };

                const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, options);
                const movieData = movieResponse.data;
                const genreIds = movieData.genres.map(genre => genre.id)
                const relatedMovieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1'`, options)
                const relatedMovieData = await relatedMovieResponse.data.results;
                this.relatedMovies = relatedMovieData
                console.log(relatedMovieData)
            }

            catch (err) {
                console.log(err)
            }
        },


        async fetchVideos() {
            const movieId = this.$route.params.id
            try {
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: API_ENDPOINTS.KEY
                    }
                };
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, options)
                this.videos = response.data.results
                console.log(response.data.results);
            }

            catch (error) {
                console.log('Error fetching movie', error);
            }
        },

        getVideoUrl(key) {
            return `https://www.youtube.com/embed/${key}`
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

        formatRuntime(minutes) {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return `${hours}h ${remainingMinutes}m`;
        },


        formatRating(rating) {
            if (rating !== null && !isNaN(rating)) {
                const formattedRating = (rating).toFixed(1); // Format to one decimal place
                return `${formattedRating}/10`;
            } else {
                return 'N/A'; // or any other default value for cases where the rating is not available or not a valid number
            }
        },

    }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.carousel__item {

    text-align: left !important;
}

.overlay {
    background: rgba(0, 0, 0, 0.6);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.backdrop-image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    filter: blur(0px);
    /* Adjust the blur effect */
    animation: fadeIn 1.5s ease;
    /* Adjust the animation duration and timing function */
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>