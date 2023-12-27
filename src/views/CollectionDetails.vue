<template>
    <div class="navbar hidden sm:block">
        <navbarVue class="" />
    </div>

    <div class="previousNav">
        <previousNavVue />
    </div>

    <main class="px-5">
        <div class="genre flex justify-between mt-5">
            <h1 class="text-left text-gray-900 text-2xl">{{ userCollection.name }}</h1>
            <Icon icon="ph:pencil" width="20" />
        </div>

        <div class="sort my-4 flex">
            <h1 class="text-gray-500 text-sm ">Sort by</h1>

            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
                class="my-0 text-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mx-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button">Recent<svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 10 6">
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




        <div v-for="movie in collectionMovies" :key="movie.id"
            class=" my-2 flex items-center bg-white rounded-lg  md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <!-- <MovieCardVue :movie="movie"/> -->
            <img :src="getImageUrl(movie.backdrop_path)" :alt="movie.title" class="w-28 card-image rounded md:rounded-md" />
            <div class="flex flex-col justify-between pt-1.5 leading-normal">
                <h5 class="mb-2 text-sm px-2 font-medium tracking-tight text-gray-900 dark:text-white truncate w-48">{{
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


export default defineComponent({
    components: { navbarVue, MovieCard, Carousel, Slide, Navigation, breadcrumbVue, Icon, BottomNav, previousNavVue },

    data() {
        return {
            movies: [],
            genre: {},
            genreName: null,
            carouselItemsToShow: 3.5,
            userCollection: [],
            collectionMovies: []
        }
    },

    mounted() {
        this.handleResize()
        this.fetchCollectionDetails()
        // this.fetchCollectionAndMovieDetails()
        // this.fetchMovieDetailsFromTMDB()
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize)
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


        async fetchCollectionDetails() {
            try {

                const collectionName = this.$route.params.name
                const currentUser = auth.currentUser;
                if (currentUser) {
                    // Query for the user with the matching email
                    const userQuery = query(collection(db, 'Users'), where('email', '==', currentUser.email));
                    const querySnapshot = await getDocs(userQuery);

                    if (!querySnapshot.empty) {
                        // Found the user with the matching email
                        const userData = querySnapshot.docs[0].data();
                        const movieCollections = userData.movieCollection || [];

                        // Find the collection with the provided name
                        const targetCollection = movieCollections.find(collection => collection.name === collectionName);

                        if (targetCollection) {
                            // Fetch all details of the collection, including movie ids
                            const collectionDetails = {
                                name: targetCollection.name,
                                movies: targetCollection.movies,
                            };

                            for (const movie of collectionDetails.movies) {
                                const options = {
                                    method: 'GET',
                                    headers: {
                                        accept: 'application/json',
                                        Authorization: API_ENDPOINTS.KEY
                                    }
                                };

                                try {
                                    axios.get(`https://api.themoviedb.org/3/movie/${movie.movieId}`, options)
                                    .then(response => {
                                        const data = response.data;
                                        // Extract relevant movie details from the TMDB response
                                        const movieDetails = response.data;
                                        this.collectionMovies.push(movieDetails);
                                        console.log(data);
                                    })
                                    .catch(err => {
                                        console.log('Error fetching movie', err);
                                    });


                                } catch (error) {
                                    console.error('Error fetching movie details from TMDB:', error);
                                    throw error;
                                }

                                console.log(movie.movieId);
                            }


                            this.userCollection = collectionDetails

                            console.log('Collection details:', collectionDetails,);
                            return collectionDetails;
                        } else {
                            console.log('Error: Collection not found');
                        }
                    } else {
                        console.log('Error: User document not found');
                    }
                }
            } catch (error) {
                console.error('Error fetching collection details:', error);
            }
        },


        // Method to fetch collection details and TMDB movie details
        // async fetchCollectionAndMovieDetails() {
        //     const collectionNameToFetch = this.$route.params.name; // Replace with the desired collection name

        //     try {
        //         // Fetch collection details (including movie IDs)
        //         const collectionDetails = await this.fetchCollectionDetails(collectionNameToFetch);

        //         if (collectionDetails && collectionDetails.movies) {
        //             // Fetch TMDB movie details for each movie ID in the collection
        //             const tmdbMovieDetailsPromises = collectionDetails.movies.map(async movie => {
        //                 try {
        //                     const tmdbMovieDetails = await this.fetchMovieDetailsFromTMDB(movie.movieId);
        //                     return tmdbMovieDetails;
        //                 } catch (error) {
        //                     // Handle errors for individual movie fetches
        //                     console.error(`Error fetching TMDB details for movie ID ${movie.movieId}:`, error);
        //                     return null;
        //                 }
        //             });

        //             // Wait for all TMDB movie details to be fetched
        //             const tmdbMovieDetails = await Promise.all(tmdbMovieDetailsPromises);

        //             // Filter out any null values (failed fetches)
        //             const validTmdbMovieDetails = tmdbMovieDetails.filter(details => details !== null);

        //             // Combine TMDB movie details with the original collection details
        //             this.collectionWithMovieDetails = {
        //                 ...collectionDetails,
        //                 tmdbMovieDetails: validTmdbMovieDetails,
        //             };

        //             console.log('Collection details with TMDB movie details:', this.collectionWithMovieDetails);
        //         }
        //     } catch (error) {
        //         console.error('Error fetching collection and movie details:', error);
        //     }
        // },


        // async fetchMovieDetailsFromTMDB(movieId) {
        //     const options = {
        //         method: 'GET',
        //         headers: {
        //             accept: 'application/json',
        //             Authorization: API_ENDPOINTS.KEY
        //         }
        //     };

        //     try {
        //         axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, options)
        //         .then(response => {
        //             const data = response.data;
        //             console.log(data);
        //         })

        //         .catch(err => {
        //             console.log('Error fetching movie', err);
        //         })

        //         // Extract relevant movie details from the TMDB response
        //         const movieDetails =  response.data;
        //         this.collectionMovies = movieDetails

        //         return movieDetails;
        //     } catch (error) {
        //         console.error('Error fetching movie details from TMDB:', error);
        //         throw error;
        //     }
        // },


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