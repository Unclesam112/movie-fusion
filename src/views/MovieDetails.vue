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
                                <p class="ml-2 text-sm font-bold text-white dark:text-white">4.95</p>
                                <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                                <a href="#" class="text-sm font-medium text-white hover:no-underline dark:text-white">10th
                                    Nov 2023</a>
                            </div>

                        </div>
                    </div>
                </transition>

                <div class="video-box mx-20 hidden md:block lg:block">
                    <h1 class="text-lg text-white mt-0">Watch Trailers on Youtube</h1>
                    <div class="videos " v-if="videos.length">

                        <Carousel :items-to-show="3.5" :wrap-around="true">
                            <Slide v-for="video in videos.slice(0, 4)" :key="video.id">
                                <div class="carousel__item">
                                    <iframe class="" :src="getVideoUrl(video.key)" frameborder="0" allowfullscreen></iframe>
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

    <main class="info my-10 mx-20">


        <div class="sm:hidden">
            <label for="tabs" class="sr-only">Select your country</label>
            <select id="tabs"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Profile</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
            </select>
        </div>
        <ul
            class="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
            <li class="w-full">
                <a href="#"
                    class="inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
                    aria-current="page">Description</a>
            </li>
            <li class="w-full">
                <a href="#"
                    class="inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Cast</a>
            </li>
            <li class="w-full">
                <a href="#"
                    class="inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">More</a>
            </li>

        </ul>

        <div class="overview p-10" v-if="movie">
            <p class="text-md py-5 text-gray-700">{{ movie.overview }}</p>
            <div class="date text-gray-700">
                <span class="text-bold text-gray-900">Release Date:</span> {{ formatReleaseDate(movie.id) }}
            </div>

            <hr class="my-10" />
            <div class="genre">
                <h1 class="text-2xl">Genres:</h1>

                <div class="flex gap-4 my-4 ">
                    <button type="button" v-for="genre in movie.genres" :key="genre.id"
                        class="text-gray-900 bg-white text-gray-500 border  border-red-500 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-full">
                        {{ genre.name }}
                    </button>
                </div>

            </div>

            <div class="video-box mx-20 md:hidden lg:hidden">
                    <h1 class="text-2xl text-gray-900 mt-0">Watch Trailers on Youtube</h1>
                    <div class="videos " v-if="videos.length">

                        <Carousel :items-to-show="3.5" :wrap-around="true">
                            <Slide v-for="video in videos.slice(0, 4)" :key="video.id">
                                <div class="carousel__item">
                                    <iframe class="" :src="getVideoUrl(video.key)" frameborder="0" allowfullscreen></iframe>
                                </div>
                            </Slide>

                            <template #addons>
                                <Navigation />
                            </template>
                        </Carousel>

                    </div>
                </div>
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


export default defineComponent({
    components: { navbarVue, Carousel, Slide, Navigation, },
    data() {
        return {
            movie: {},
            videos: []
        }
    },

    computed: {
        formattedDate() {
            const date = this.movie.release_date// Convert Firestore timestamp to JavaScript Date
            const formatDate = format(date, 'MMMM d, yyyy');
            return formatDate
        }
    },

    mounted() {
        this.fetchVideos()
        this.fetchMovieDetails()
    },

    methods: {
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
                    this.movie = data
                    console.log(data);
                })

                .catch(err => {
                    console.log('Error fetching movie', err);
                })
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


    }
})
</script>

<style scoped>
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