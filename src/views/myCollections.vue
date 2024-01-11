<template>
    <div class="navbar hidden sm:block">
        <navbarVue class="bg-gray-900" />
    </div>

    <div class="previousNav">
        <previousNavVue />
    </div>

    <main class="p-2.5 sm:p-20 sm:pt-10 sm:ml-64">
        <breadcrumbVue class="sm:mt-4 mb-8" />

        <div class="grid md:grid-cols-2 gap-8">
            <div class="col hidden sm:block" v-if="userCollections && userCollections.length > 0">
                <div class="col mt-5">
                    <img :src="getRandomImagePath(index)" alt="Random Image" class="w-100 rounded">
                    <h5 class="mb-2 text-5xl py-4 px-2 font-medium tracking-tight text-gray-900 dark:text-white truncate ">
                        {{ userCollections[0].name }}
                    </h5>
                    <div class="flex justify-between">
                        <h1 class="text-left text-gray-900 text-lg">My Movies</h1>
                        <span class="text-sm flex" @click='goToRoute(userCollections[0].name)'>See all
                            <Icon icon="ep:right" width="20" class="ml-2" />
                        </span>
                    </div>

                    <div v-for="movie in collectionMovies.slice(0, 3)" :key="movie.id"
                        class=" my-2 flex items-center bg-white rounded-lg  md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <!-- <MovieCardVue :movie="movie"/> -->
                        <img :src="getImageUrl(movie.backdrop_path)" :alt="movie.title"
                            class="w-28 card-image rounded md:rounded-md" />
                        <div class="flex flex-col justify-between pt-1.5 leading-normal">
                            <h5
                                class="mb-2 text-sm px-2 font-medium tracking-tight text-gray-900 dark:text-white truncate w-48">
                                {{
                                    movie.title }}
                            </h5>
                            <router-link :to="`/movie/details/${movie.id}`" type="button"
                                class="px-3 py-1 text-xs font-medium text-center inline-flex items-center text-gray-900 bg-white rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <Icon icon="solar:play-bold" class="mr-2" />
                                Play
                            </router-link>

                            <!-- <p class="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400 line-clamp-2">{{ movie.overview }}</p> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="genre flex justify-between mt-5">
                    <h1 class="text-left text-gray-900 text-3xl sm:text-2xl">My Collections</h1>
                    <Icon icon="ph:pencil" width="20" class="mt-1.5"/>
                </div>

                <div class="sort my-4 flex">
                    <h1 class="text-gray-500 text-sm ">Sort by</h1>

                    <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
                        class="my-0 text-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mx-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button">Recent<svg class="w-2.5 h-2.5 ms-3" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 4 4 4-4" />
                        </svg>
                    </button>

                    <!-- Dropdown menu -->
                    <div id="dropdown"
                        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <a href="#"
                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                            </li>
                            <li>
                                <a href="#"
                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                            </li>
                            <li>
                                <a href="#"
                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                            </li>
                            <li>
                                <a href="#"
                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign
                                    out</a>
                            </li>
                        </ul>
                    </div>

                </div>
                <div class="" v-if="userCollections.length > 0">
                    <router-link :to="`/collection-details/${collection.name}`"
                        v-for="(collection, index) in userCollections" :key="collection.id"
                        class="pointer p-2 flex justify-between items-center bg-white rounded-lg  md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <!-- <MovieCardVue :movie="movie"/> -->

                        <div class="flex items-center h-auto justify-between pt-1.5 leading-normal">
                            <img :src="getRandomImagePath(index)" alt="Random Image" class="w-28 rounded">
                            <h5
                                class="mb-2 text-md px-2 font-medium tracking-tight text-gray-900 dark:text-white truncate w-48">
                                {{ collection.name }}
                            </h5>
                        </div>

                        <Icon icon="ep:right" width="20" />
                    </router-link>
                </div>

                <div class="" v-else>
                    <h1 class="text-3xl text-gray-300 flex items-center justify-center h-screen">No Collection!</h1>
                </div>
            </div>
        </div>


        <div class="bottom-nav m-2">

            <BottomNav />
        </div>
    </main>
</template>

<script>
import BottomNav from '../components/layout/bottomNav.vue'
import axios from 'axios'
import navbarVue from '../components/layout/navbar.vue'
import API_ENDPOINTS from '../utils/ApiRoutes'
import MovieCard from '../components/MovieCard.vue';
import { defineComponent } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import breadcrumbVue from '../components/layout/breadcrumb.vue';
import { Icon } from '@iconify/vue';
import previousNavVue from '../components/layout/smallDevice-layout/previousNav.vue'
import { collection, addDoc, updateDoc, getDocs, doc, query, where, } from 'firebase/firestore';
import { auth, db } from '@/firebase';

import image1 from '@/assets/Collection/image1.jpg';
import image2 from '@/assets/Collection/image2.jpg';
import image3 from '@/assets/Collection/image3.jpg';
import image4 from '@/assets/Collection/image4.jpg';
import image5 from '@/assets/Collection/image5.jpg';
import image6 from '@/assets/Collection/image6.jpg';



export default defineComponent({
    components: { navbarVue, MovieCard, Carousel, Slide, Navigation, breadcrumbVue, Icon, BottomNav, previousNavVue },

    data() {
        return {
            movies: [],
            genre: {},
            genreName: null,
            carouselItemsToShow: 3.5,
            userCollections: [],
            collectionMovies: [],
            imagePaths: [
                image1,
                image2,
                image3,
                image4,
                image5,
                image6,
            ],
        }
    },

    computed: {

    },

    mounted() {
        this.fetchGenre(),
            this.fetchGenreName()
        this.handleResize()
        this.getCollections()
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize)
    },

    methods: {
        getRandomImagePath(index) {
            const randomIndex = Math.floor(Math.random() * this.imagePaths.length);
            return this.imagePaths[randomIndex];
        },
        handleResize() {
            this.carouselItemsToShow = window.innerWidth >= 768 ? 5.5 : 2.5
        },

        getImageUrl(path) {
            return path ? `https://image.tmdb.org/t/p/w300${path}` : 'https://via.placeholder.com/500';
        },

        getBackgroundImageUrl(path) {
            return path ? `https://image.tmdb.org/t/p/w1280${path}` : 'https://via.placeholder.com/500';
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
        },

        async getCollections() {
            try {
                const currentUser = auth.currentUser;

                if (currentUser) {
                    // Query for the user with the matching email
                    const userQuery = query(collection(db, 'Users'), where('email', '==', currentUser.email));
                    const querySnapshot = await getDocs(userQuery);

                    if (!querySnapshot.empty) {
                        // Found the user with the matching email
                        const userData = querySnapshot.docs[0].data();
                        const movieCollections = userData.movieCollection || [];

                        // Extract collection names
                        const collectionNames = movieCollections;

                        this.userCollections = collectionNames;
                        console.log('Collections:', collectionNames);

                        // Fetch movies from the first collection
                        if (movieCollections.length > 0) {
                            const firstCollection = movieCollections[0];
                            await this.fetchMoviesFromCollection(firstCollection);
                        }

                        return collectionNames;
                    } else {
                        console.log('Error: User document not found');
                        return [];
                    }
                }
            } catch (error) {
                console.error('Error fetching collections:', error);
                return [];
            }
        },

        async fetchMoviesFromCollection(collection) {
            // Assuming collection.movies is an array of movie IDs
            // Assuming collection.movies is an array of objects with a movieId property
            for (const movie of collection.movies) {
                const movieId = movie.movieId; // Extract the movieId property
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: API_ENDPOINTS.KEY,
                    },
                };

                try {
                    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, options);
                    const movieDetails = response.data;
                    this.collectionMovies.push(movieDetails);
                    console.log('Movie details:', movieDetails);
                } catch (error) {
                    console.error('Error fetching movie details from TMDB:', error);
                }
            }

        },

        goToRoute(id) {
            this.$router.push(`collection-details/${id}`)
        },

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
}</style>