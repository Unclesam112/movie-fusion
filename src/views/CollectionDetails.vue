<template>
    <div class="navbar hidden sm:block">
        <navbarVue class="bg-gray-900" />
    </div>

    <div class="previousNav">
        <previousNavVue />
    </div>



    <main class="p-2.5 sm:p-20 sm:pt-10 sm:ml-64">
        <breadcrumbVue class="my-4" />


        <div class="grid md:grid-cols-2 gap-8">
            <div class="col hidden md:block" v-show="collectionMovies.length > 0">
                <div class="px-0 mt-8" v-if="collectionMovies && collectionMovies.length > 0">
                    <div class="image-container">
                        <img :src="getImageUrl(collectionMovies[0].backdrop_path)" :alt="collectionMovies[0].title" 
                            class="sm:w-full w-50 rounded md:rounded-md" />
                        <div class="overlay">
                            <button class="button play-button">
                                <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                                    width="26px">
                                    <path
                                        d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
                                        fill="currentColor"></path>
                                </svg>
                            </button>
                        </div>
                    </div>


                    <h1 class="text-left my-6 text-gray-900 text-2xl">{{ collectionMovies[0].title }}</h1>
                    <p class="text-sm py-2 truncate">{{ collectionMovies[0].overview }}</p>
                    <div class="flex rate">
                        <Icon icon="ph:star-fill" color="gold" />
                        <Icon icon="ph:star-fill" color="gold" />
                        <Icon icon="ph:star-fill" color="gold" />
                        <Icon icon="ph:star-fill" color="gold" />
                        <Icon icon="ph:star-fill" color="gold" />
                    </div>
                </div>
            </div>
            <div class="col">

                <div class="genre flex justify-between mt-5">
                    <h1 class="text-left text-gray-900 text-2xl">{{ userCollection.name }}</h1>
                    <div class="flex gap-6">
                        <Icon v-if="isEdit == true" icon="ph:pencil" color="orange" width="20" @click.prevent="showDeleteButton()" />
                        <Icon icon="iconoir:cancel" v-if="isCancel == true" color="red" width="30" @click.prevent="cancel()" />
                        <Icon v-if="addButton == true" icon="ic:round-plus" color="orange" data-modal-target="authentication-modal"
                            data-modal-toggle="authentication-modal" width="22" class="" type="button" />

                        <!-- Main modal -->
                        <div id="authentication-modal" tabindex="-1" aria-hidden="true"
                            class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                            <div class="relative p-4 w-full max-w-md max-h-full">
                                <!-- Modal content -->
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <!-- Modal header -->
                                    <div
                                        class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                            Search Movies
                                        </h3>
                                        <button type="button"
                                            class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                            data-modal-hide="authentication-modal">
                                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                    stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span class="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <!-- Modal body -->
                                    <div class="p-4 md:p-5">
                                        <form class="space-y-4" action="#">





                                            <label for="default-search"
                                                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                            <div class="relative">
                                                <div
                                                    class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                        <path stroke="currentColor" stroke-linecap="round"
                                                            stroke-linejoin="round" stroke-width="2"
                                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                    </svg>
                                                </div>
                                                <input type="search" id="default-search"
                                                    class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Search Movies & Series" v-model="searchQuery"
                                                    @input="searchMovies" required>
                                                <button type="submit"
                                                    class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                                            </div>


                                        </form>

                                        <ul>
                                            <li v-for="movie in searchResults" :key="movie.id">
                                                <div
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
                                                        <button type="button"
                                                            @click.prevent="addMovieToCollection(movie.id)"
                                                            class="px-3 py-1 text-xs font-medium text-center inline-flex items-center text-gray-900  rounded focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                            <svg class="w-2 h-2 mr-2 text-red-700" aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 18 18">
                                                                <path stroke="currentColor" stroke-linecap="round"
                                                                    stroke-linejoin="round" stroke-width="2"
                                                                    d="M9 1v16M1 9h16" />
                                                            </svg>
                                                            Add to collection

                                                        </button>

                                                        <!-- <p class="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400 line-clamp-2">{{ movie.overview }}</p> -->
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>



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
                <div class="" v-if="collectionMovies.length > 0">
                    <div v-for="movie in collectionMovies" :key="movie.id"
                        class="p-2 my-2 flex items-center bg-white rounded-lg  md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <!-- <MovieCardVue :movie="movie"/> -->
                        <img :src="getImageUrl(movie.backdrop_path)" :alt="movie.title"
                            class="w-28 card-image rounded md:rounded-md" />
                        <div class="flex flex-col justify-between pt-1.5 leading-normal">
                            <h5
                                class="mb-2 text-sm px-2 font-medium tracking-tight text-gray-900 dark:text-white truncate w-48">
                                {{
                                    movie.title }}
                            </h5>
                            <router-link :to="`/movie/details/${movie.id}`" v-if="showDelete == false" type="button"
                                class="px-3 py-1 text-xs font-medium text-center inline-flex items-center text-gray-900  rounded focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <Icon icon="solar:play-bold" class="mr-2" />
                                Play
                            </router-link>
                            <button type="button" v-if="!showDelete == false"
                                @click.prevent="deleteMovieFromCollection(movie.id)"
                                class="px-3 py-1 text-xs font-medium text-center inline-flex items-center text-red-700 bg-white rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <Icon icon="material-symbols:delete" color="red" width="18" />
                                Delete
                            </button>

                            <!-- <p class="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400 line-clamp-2">{{ movie.overview }}</p> -->
                        </div>
                    </div>
                </div>

                <div v-else>
                    <h1 class="text-3xl text-gray-300 flex items-center justify-center h-screen">Collection is empty!</h1>
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
import { collection, addDoc, updateDoc, getDocs, doc, query, where, arrayRemove } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import { toast } from 'vue3-toastify';


export default defineComponent({
    components: { navbarVue, MovieCard, Carousel, Slide, Navigation, breadcrumbVue, Icon, BottomNav, previousNavVue },

    data() {
        return {
            movies: [],
            genre: {},
            genreName: null,
            carouselItemsToShow: 3.5,
            userCollection: [],
            collectionMovies: [],
            showDelete: false,
            isEdit: true,
            isCancel: false,
            addButton: true,
            searchQuery: null,
            searchResults: []
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

        async searchMovies() {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
                    params: {
                        query: this.searchQuery,
                    },
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: API_ENDPOINTS.KEY
                    }
                });

                this.searchResults = response.data.results;
            } catch (error) {
                console.error('Error searching movies:', error);
            }
        },

        async addMovieToCollection(movieId) {
            const movieData = this.$route.params.name
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
                        const collectionIndex = movieCollections.findIndex(collection => collection.name === movieData);
                        if (collectionIndex !== -1) {
                            // Add the movie to the specified collection
                            movieCollections[collectionIndex].movies.push({
                                movieId: movieId
                            });


                            // // Update the user document with the modified movie collection
                            // Update the user document with the modified movie collection
                            await updateDoc(querySnapshot.docs[0].ref, {
                                movieCollection: movieCollections,
                            });



                            toast.success('Movie added to collection');
                            console.log('Movie added to collection successfully.:', collectionIndex);

                            setTimeout(() => {
                                // Your operation is complete
                                // Reload the page
                                window.location.reload();
                            }, 2000);

                        } else {
                            console.log('Error: Collection does not exist');
                        }
                    } else {
                        console.log('Error: Collection does not exist');
                    }

                }
            }

            catch (error) {
                console.error('Error adding movie to collection:', error);
            }
        },

        showDeleteButton() {
            this.showDelete = true;
            this.isEdit = false;
            this.isCancel = true
            this.addButton = false
        },

        cancel() {
            this.isCancel = false;
            this.isEdit = true;
            this.showDelete = false;
            this.addButton = true
        },

        getImageUrl(path) {
            return path ? `https://image.tmdb.org/t/p/w1280${path}` : 'https://via.placeholder.com/500';
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

        async deleteMovieFromCollection(movieId) {
            try {
                const collectionName = this.$route.params.name;
                const currentUser = auth.currentUser;

                if (currentUser) {
                    const userQuery = query(collection(db, 'Users'), where('email', '==', currentUser.email));
                    const querySnapshot = await getDocs(userQuery);

                    if (!querySnapshot.empty) {
                        const userId = querySnapshot.docs[0].id;
                        const userRef = doc(db, 'Users', userId);

                        const userData = querySnapshot.docs[0].data();
                        let movieCollections = userData.movieCollection || [];

                        const targetCollectionIndex = movieCollections.findIndex(collection => collection.name === collectionName);

                        if (targetCollectionIndex !== -1) {
                            // Remove the movie with the specified movieId from the collection
                            const updatedMovies = (movieCollections[targetCollectionIndex].movies || []).filter(movie => movie.movieId != movieId);

                            // Update the specific collection within the user document
                            movieCollections[targetCollectionIndex].movies = updatedMovies;

                            // Create a new array reference to trigger reactivity
                            movieCollections = [...movieCollections];

                            await updateDoc(userRef, {
                                movieCollection: movieCollections,
                            });

                            console.log(`Movie with ID ${movieId} deleted from collection ${collectionName}`);
                            const updatedCollectionDetails = {
                                name: movieCollections[targetCollectionIndex].name,
                                movies: updatedMovies,
                            };
                            this.userCollection = updatedCollectionDetails;
                            setTimeout(() => {
                                // Your operation is complete
                                // Reload the page
                                window.location.reload();
                            }, 2000);
                            return updatedCollectionDetails;


                        } else {
                            console.log('Error: Collection not found');
                        }
                    } else {
                        console.log('Error: User document not found');
                    }
                }
            } catch (error) {
                console.error('Error deleting movie from collection:', error);
                throw error;
            }
        }



    }
})
</script>

<style scoped>
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

.image-container {
    position: relative;
    display: inline-block;
    /* Ensures the container only takes up as much space as the image */
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    /* Semi-transparent black overlay */
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    /* Initially invisible */
    transition: opacity 0.3s ease;
    /* Smooth transition for opacity */
}

.overlay {
    opacity: 1;
    /* Make the overlay visible on hover */
}

.play-button {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
}

.button {
  display: flex;
  justify-content: center;
  color: #fff;
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background: linear-gradient(30deg, rgb(255, 130, 0) 20%, rgb(255, 38, 0) 80%);
  transition: all 0.3s ease-in-out 0s;
  box-shadow: rgba(193, 244, 246, 0.698) 0px 0px 0px 0px;
  animation: 1.2s cubic-bezier(0.8, 0, 0, 1) 0s infinite normal none running pulse;
  align-items: center;
  border: 0;
}

.button:is(:hover, :focus) {
  transform: scale(1.2);
}

@keyframes pulse {
  100% {
    box-shadow: 0 0 0 45px rgba(193,244,246,0);
  }
}




</style>