<template>
    <main>
        <div class="navbar hidden sm:block">
            <navbarVue class="bg-black text-white" />
        </div>

        <div class="previous">
            <previousNavVue />
        </div>


        <div class="relative w-full h-screen" v-if="movieCollection.length">
            <img :src="getBackgroundImageUrl(movieCollection[0].backdrop_path)" alt="Background Image"
                class="w-full h-full object-cover backdrop-image" />
            <div class="absolute inset-0 overlay">

                <transition name="fade" mode="out-in">
                    <div :key="movieCollection[0].id" class="grid grid-cols md:grid-cols-2 gap-10  md:px-20 md:py-5 p-5">
                        <div class="col-sapn-1 mt-28">
                            <h1 class="title text-6xl text-white line-clamp-3">{{ movieCollection[0].title }}</h1>
                            <!-- ... rest of your content ... -->
                            <button type="button"
                                class="py-1 px-4 mr-2 my-4 mb-2 text-sm font-medium focus:outline-none text-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">16+</button>

                            <div class="flex items-center my-5">
                                <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <p class="ml-2 text-sm font-bold text-white dark:text-white"> {{ formattedRating }} </p>
                                <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                                <a href="#" class="text-sm font-medium text-white hover:no-underline dark:text-white"> {{
                                    formatReleaseDate(movieCollection.release_date) }}</a>
                            </div>

                            <p class="text-white text-md line-clamp-2">
                                {{ movieCollection[0].overview }}
                            </p>


                            <div class="flex gap-8">
                                <button @click="goToDetails(movieCollection.id)"
                                    class="bg-red-700 my-10 text-white rounded-md flex py-2 px-8 shadow-lg">
                                    See Movie
                                    <Icon icon="solar:play-bold" class="mt-1 ml-1" />
                                </button>

                                <button type="button"
                                    class="w-10 h-10 mr-2 my-10 mb-2 text-sm font-medium text-gray-900 focus:outline-none rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                    <Icon icon="teenyicons:add-outline" width="20" color="white" class="mx-auto" />
                                </button>
                            </div>
                        </div>

                        <div class="col-span-1 col-end md:p-20 md:pt-10 mx-auto">
                            <img :src="getImageUrl(movieCollection[0].poster_path)"
                                class="hidden md:hidden lg:block object-cover" alt="">
                        </div>
                    </div>
                </transition>
            </div>
        </div>

        <div class="bar w-full bg-black">
            <div class="flex nav-list gap-8 text-center sm:text-left px-5 md:mx-20 py-5">
                <p class="nav-items text-white">ACTION</p>
                <p class="nav-items text-white">ADVENTURE</p>
                <p class="nav-items text-white">SCI-FI</p>
                <p class="nav-items text-white">CRIME</p>
            </div>
        </div>

        <div class="movies mx-5 md:px-16 py-10">
            <h1 class="text-4xl text-gray-900 pb-4">My Collections</h1>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div class="col" v-for="movie in movieCollection" :key="movie.id">
                    <MovieCardVue :movie="movie"/>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { collection, addDoc, updateDoc, getDocs, doc } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import axios from 'axios';
import API_ENDPOINTS from '../utils/ApiRoutes';
import navbarVue from '../components/layout/navbar.vue';
import MovieCardVue from '../components/MovieCard.vue';
import { Icon } from '@iconify/vue';
import previousNavVue from '../components/layout/smallDevice-layout/previousNav.vue';



export default {
    data() {
        return {
            movieCollection: [],
            currentMovie: {},
        }
    },

    components: { navbarVue, MovieCardVue, Icon, previousNavVue},

    mounted() {
        this.fetchUserMovieIds()
        // Set up a timer to fetch movie data every 5 minutes (adjust as needed)
        setInterval(() => {
            this.fetchUserMovieIds();
        }, 5 * 60 * 1000); // 5 minutes in milliseconds
    },

    methods: {

        getImageUrl(path) {
            return path ? `https://image.tmdb.org/t/p/w300${path}` : 'https://via.placeholder.com/500';
        },

        getBackgroundImageUrl(path) {
            return path ? `https://image.tmdb.org/t/p/w1280${path}` : 'https://via.placeholder.com/500';
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

        async fetchUserMovieIds() {
            try {
                const currentUser = auth.currentUser;

                if (currentUser) {
                    const querySnapshot = await getDocs(collection(db, 'Users'));

                    const userData = querySnapshot.docs.find(doc => doc.data().email === currentUser.email)?.data();

                    if (userData) {
                        const movieIds = userData.movieCollection || [];

                        const moviePromises = movieIds.map(async (movieId) => {
                            const id = movieId.movieId;

                            if (id) {
                                const options = {
                                    method: 'GET',
                                    headers: {
                                        accept: 'application/json',
                                        Authorization: API_ENDPOINTS.KEY,
                                    },
                                };

                                try {
                                    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, options);
                                    const randomIndex = Math.floor(Math.random() * response.data.length);
                                    this.currentMovie = response.data[randomIndex];
                                    return response.data;
                                } catch (err) {
                                    console.log('Error fetching movie', err);
                                    return null; // or handle the error as needed
                                }
                            } else {
                                console.log('Movie ID is undefined');
                                return null; // or handle the absence of ID as needed
                            }
                        });

                        const movies = await Promise.all(moviePromises);
                        this.movieCollection = movies.filter(movie => movie !== null); // Remove null entries
                        console.log(this.movieCollection);
                    } else {
                        console.log('User not found');
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }


        // async fetchMoviesDetails(movieIds) {

        //     try {
        //         if(!movieIds || movieIds.length === 0) {
        //         console.warn('Movie IDs are undefined')
        //         return []
        //     }

        //     await new Promise(resolve => setTimeout(resolve, 1000));
        //         // Fetch movie details from TMDB using movieIds
        //         const apiKey = API_ENDPOINTS.KEY; // Replace with your TMDB API key
        //         const baseUrl = API_ENDPOINTS.BASE_URL;

        //         const moviePromises = movieIds.map(async (movieId) => {
        //             const url = `${baseUrl}${movieId}?api_key=${apiKey}`;
        //             const response = await axios.get(url);
        //             return response.data;

        //         });


        //         // Wait for all promises to resolve
        //         const movies = await Promise.all(moviePromises);
        //         return movies

        //     } 
        //     catch (error) {
        //         console.error('Error fetching movie details from TMDB:', error);
        //         return [];
        //     }
        // },

        // async fetchMovies() {
        //     try {
        //         const movieIds = await this.fetchUserMovieIds()
        //         const movies = await this.fetchMoviesDetails(movieIds)

        //         this.movieCollection = movies
        //     }

        //     catch(err) {
        //         console.log(err);
        //     }
        // }

    }
}
</script>

<style scoped>


.overlay {
    background: rgba(0, 0, 0, 0.73);
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
    filter: blur(8px); /* Adjust the blur effect */
    animation: fadeIn 1.5s ease; /* Adjust the animation duration and timing function */
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@media screen and (max-width: 780px) {
    .backdrop-image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    filter: blur(2px); /* Adjust the blur effect */
    animation: fadeIn 1.5s ease; /* Adjust the animation duration and timing function */
}
}

</style>