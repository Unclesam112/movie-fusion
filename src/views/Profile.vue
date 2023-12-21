<template>
    <main>
        <div class="navbar hidden sm:block">
            <navbarVue class="" />
        </div>

        <div class="previousnav">
            <previousNavVue />
        </div>


        <div class="profile-image mt-4">
            <div class="flex justify-center">
                <!-- <img src="../assets/img/bg-1.jpg" 
                    alt=""> -->

                <Icon icon="carbon:user-avatar-filled"
                    class="w-28 h-28 rounded-full object-cover border border-2-gray-500" />
            </div>
            <div class="user-name text-center" v-if="userInfo">
                <h1 class="text-2xl my-2">{{ userInfo.username }}</h1>
            </div>

            <div class="edit flex justify-center">
                <button class="bg-gray-700 px-3 text-white flex">Edit
                    <Icon icon="ph:pencil" class="mt-1 mx-1" />
                </button>
            </div>
        </div>


        <div class="tab mx-2 my-8">
            <div class="flex justify-around">
                <router-link to="/my-collections" class="collection grid text-center">
                    <h1 v-if="userCollections"> {{ userCollections.length }}</h1>
                    <p>Collections</p>
                </router-link>

                <div class="collection grid text-center">
                    <h1>0</h1>
                    <p>Favourites</p>
                </div>

                <div class="collection grid text-center">
                    <h1>0</h1>
                    <p>MyList</p>
                </div>
            </div>
        </div>



        <ul
            class="w-full text-lg font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li class="w-full px-4 py-4 border-b border-gray-200 rounded-t-lg dark:border-gray-600">Profile</li>
            <li class="w-full px-4 py-4 border-b border-gray-200 dark:border-gray-600">Settings</li>
            <li class="w-full px-4 py-4 border-b border-gray-200 dark:border-gray-600">About</li>
            <li class="w-full px-4 py-4 rounded-b-lg text-red-700" @click.prevent="logout">Logout</li>
        </ul>


        <div class="bottomnav">
            <bottomNavVue />
        </div>
    </main>
</template>

<script>
import { collection, addDoc, updateDoc, getDocs, doc, query, where, } from 'firebase/firestore';
import { signOut } from 'firebase/auth'
import { auth, db } from '@/firebase';
import axios from 'axios';
import API_ENDPOINTS from '../utils/ApiRoutes';
import navbarVue from '../components/layout/navbar.vue';

import MovieCardVue from '../components/MovieCard.vue';
import { Icon } from '@iconify/vue';
import bottomNavVue from '../components/layout/bottomNav.vue';
import previousNavVue from '../components/layout/smallDevice-layout/previousNav.vue';

export default {
    data() {
        return {
            movieCollection: [],
            currentMovie: {},
            activeTab: 1,
            userInfo: [],
            userCollections: []
        }
    },

    components: { navbarVue, MovieCardVue, Icon, bottomNavVue, previousNavVue },

    mounted() {
        this.fetchUserMovieIds(),
            this.getCollections()
    },

    methods: {

        getImageUrl(path) {
            return path ? `https://image.tmdb.org/t/p/w300${path}` : 'https://via.placeholder.com/500';
        },

        getBackgroundImageUrl(path) {
            return path ? `https://image.tmdb.org/t/p/w1280${path}` : 'https://via.placeholder.com/500';
        },



        async fetchUserMovieIds() {
            try {
                const currentUser = auth.currentUser;

                if (currentUser) {
                    const querySnapshot = await getDocs(collection(db, 'Users'));

                    const userData = querySnapshot.docs.find(doc => doc.data().email === currentUser.email)?.data();
                    this.userInfo = userData;
                    console.log('user', userData);

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
                        const movieCollections = userData.movieCollection || {};

                        // Extract collection names
                        const collectionNames = Object.keys(movieCollections);

                        this.userCollections = collectionNames
                        console.log('Collections:', collectionNames);
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

        async logout() {
            try {
                await signOut(auth);
                this.$router.push('/welcome')
            }

            catch (e) {
                console.error('Logout error');
            }
        }

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
