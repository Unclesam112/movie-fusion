<template>
    <main>
        <div class="genreList my-4">
            <GenreList />
        </div>

        <div class="movie-list mt-10">
            <div class="top-picks">
                <h1 class="text-lg font-bold md:text-3xl mb-2">Top Pick's For {{ userDetails.username}}</h1>
                <Carousel :items-to-show="carouselItemsToShow" :wrap-around="true">
                    <Slide v-for="movie in movies" :key="movie.id">
                        <div class="carousel__item m-0 md:m-5">
                            <MovieCard :movie="movie" />
                        </div>
                    </Slide>


                </Carousel>
            </div>

            <div class="popular mt-10">
                <h1 class="text-lg font-bold md:text-3xl mb-2">Most Popular</h1>
                <Carousel :items-to-show="carouselItemsToShow" :wrap-around="true">
                    <Slide v-for="movie in popular" :key="movie.id">
                        <div class="carousel__item m-5">
                            <MovieCard :movie="movie" />
                        </div>
                    </Slide>

                </Carousel>
            </div>


            <div class="popular mt-10">
                <h1 class="text-lg font-bold md:text-3xl mb-2">Action Movies</h1>
                <Carousel :items-to-show="carouselItemsToShow" :wrap-around="true">
                    <Slide v-for="movie in action" :key="movie.id">
                        <div class="carousel__item m-5">
                            <MovieCard :movie="movie" />
                        </div>
                    </Slide>


                </Carousel>
            </div>

            <div class="popular mt-10">
                <h1 class="text-lg font-bold md:text-3xl mb-2">Top Sci-Fi Movies</h1>
                <Carousel :items-to-show="carouselItemsToShow" :wrap-around="true">
                    <Slide v-for="movie in sci_fi" :key="movie.id">
                        <div class="carousel__item m-5">
                            <MovieCard :movie="movie" />
                        </div>
                    </Slide>


                </Carousel>
            </div>


            <div class="popular mt-10">
                <h1 class="text-lg font-bold md:text-3xl mb-2">Special time with lover</h1>
                <Carousel :items-to-show="carouselItemsToShow" :wrap-around="true">
                    <Slide v-for="movie in romance" :key="movie.id">
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
import { db } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'
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
            carouselItemsToShow: 3.5,
            action: [],
            romance: [],
            sci_fi: [],
            userDetails: [],
        }
    },

    computed: {
        userProfile() {
            return this.$store.state.user;
        },
    },
    //   created() {
    //     this.$store.dispatch('nowPlaying/fetchNowPlayingMovies');
    //   },

    async created() {
        const userProfile = this.$store.state.user;
        console.log(userProfile);

        if (userProfile && userProfile.email) {
            try {
                const querySnapshot = await getDocs(collection(db, 'Users')); // Assuming 'users' is your Firestore collection name
                querySnapshot.forEach((doc) => {
                    const userData = doc.data();
                    if (userData.email === userProfile.email) {
                        // Found the user with the matching email
                        this.userDetails = userData

                        setTimeout(() => {
                            // After data is fetched, set isLoading to false to hide the loader
                            this.isLoading = false;
                        }, 2500); // Simulating a 2-second delay for fetching data
                    }
                });
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        }
    },

    mounted() {
        this.fetchTopPickMovie()
        this.fecthMostPopular()
        this.fecthTopRated()
        this.fetchActionMovie()
        this.fetchSciFiMovie()
        this.fetchRomanceMovie()
        this.fetchUser()
        window.addEventListener('resize', this.handleResize)
        this.handleResize()
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize)
    },

    methods: {
        handleResize() {
            this.carouselItemsToShow = window.innerWidth >= 768 ? 5.5 : 2.5
        },


        async fetchUser() {
            const userEmail = this.userProfile;
            const userCollection = collection(db, 'Users');
            const userRef = await getDocs(userCollection);

            let userId = null;
            userRef.forEach((userDoc) => {
                const userData = userDoc.data();
                // console.log(userData, userEmail);
                if (userData.email === userEmail.email) {
                    userId = userData.id,
                        console.log(userId);
                }

                else {
                    console.log("User not found");
                }
            });

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
        },

        fetchActionMovie() {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: API_ENDPOINTS.KEY
                }
            };

            axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=28`, options)
                .then(response => {
                    const data = response.data;
                    this.action = data.results;
                    console.log(data);
                })

                .catch(err => {
                    console.log('Error fetching movie', err);
                })
        },

        fetchSciFiMovie() {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: API_ENDPOINTS.KEY
                }
            };

            axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=878`, options)
                .then(response => {
                    const data = response.data;
                    this.sci_fi = data.results;
                    console.log(data);
                })

                .catch(err => {
                    console.log('Error fetching movie', err);
                })
        },

        fetchRomanceMovie() {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: API_ENDPOINTS.KEY
                }
            };

            axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=10749`, options)
                .then(response => {
                    const data = response.data;
                    this.romance = data.results;
                    console.log(data);
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