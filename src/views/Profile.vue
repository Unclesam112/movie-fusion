<template>
    <main>
        <div class="navbar">
            <navbarVue class="" />
        </div>


        <div class="profile-image mt-4">
            <div class="flex justify-center">
                <img src="../assets/img/bg-1.jpg" class="w-28 h-28 rounded-full object-cover border border-2-gray-500"
                    alt="">
            </div>
            <div class="user-name text-center">
                <h1 class="text-2xl">Uncle-D</h1>
            </div>
        </div>


        <div class="info my-10 md:mx-20 mx-2">


            <ul class="text-sm font-medium text-center text-gray-500 rounded-lg  flex  dark:text-gray-400">
                <li class="w-full">
                    <a href="#" @click.prevent="activeTab = 1"
                        :class="{ 'bg-red-0': activeTab === 1, 'text-gray-500': activeTab === 1, 'bg-gray-0': activeTab !== 1, 'text-gray-700': activeTab !== 1, 'transition': true }"
                        class="fade inline-block w-full p-4 text-gray-900 bg-gray-0 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
                        aria-current="page">Collections</a>
                </li>
                <li class="w-full">
                    <a href="#" @click.prevent="activeTab = 2"
                        :class="{ 'bg-red-700': activeTab === 2, 'text-white': activeTab === 2, 'bg-gray-300': activeTab !== 2, 'text-gray-700': activeTab !== 2, 'transition': true }"
                        class="fade inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Watched</a>
                </li>
                <li class="w-full">
                    <a href="#" @click.prevent="activeTab = 3"
                        :class="{ 'bg-red-700': activeTab === 3, 'text-white': activeTab === 3, 'bg-gray-300': activeTab !== 3, 'text-gray-700': activeTab !== 3, 'transition': true }"
                        class="fade text-gray-700 inline-block w-full p-4 bg-white  border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Profile</a>
                </li>

            </ul>
<!-- 
            <div class="overview md:p-0 py-5cd admincd fade my-8" v-show="activeTab === 1" key="1">



            </div>



            <div class="overview md:p-0 py-5cd admincd fade my-6" v-show="activeTab === 2" v-if="movie" key="2">

            </div>

            <div class="overview md:p-0 py-5cd admincd fade my-6" v-show="activeTab === 3" v-if="movie" key="2">


            </div> -->




        </div>


        <div v-for="movie in movieCollection" :key="movie.id"
            class=" mx-2 my-2 flex items-center bg-white rounded-lg  md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <!-- <MovieCardVue :movie="movie"/> -->
            <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" class="w-20 card-image rounded md:rounded-md" />
            <div class="flex flex-col justify-between p-4 pt-2 leading-normal">
                <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white truncate w-62">{{ movie.title }}
                </h5>
                <p class="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400 line-clamp-2">{{ movie.overview }}</p>
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

export default {
    data() {
        return {
            movieCollection: [],
            currentMovie: {},
            activeTab: 1,
        }
    },

    components: { navbarVue, MovieCardVue, Icon },

    mounted() {
        this.fetchUserMovieIds()
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
        },

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
    filter: blur(8px);
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

@media screen and (max-width: 780px) {
    .backdrop-image {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        filter: blur(2px);
        /* Adjust the blur effect */
        animation: fadeIn 1.5s ease;
        /* Adjust the animation duration and timing function */
    }
}
</style>
