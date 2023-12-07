<template>
    <main class="">
        <navbarVue class="nav" />

        <div class="p-5 py-5 btn">
            <button type="button"
                class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-gray-900 border border-2-gray-900 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              TV Shows
            </button>


            <button type="button"
                class="mx-2 px-3 py-2 text-xs font-medium text-center inline-flex items-center text-gray-900 border border-2-gray-900  rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
               
               Movies
            </button>

            <button type="button"
                class="px-3 py-2 text-xs font-medium text-center inline-flex items-center border border-2-gray-900 text-gray-900 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
               
                Categories
            </button>
        </div>

        <div class="relative w-full p-5">
            <img :src="getBackgroundImageUrl(currentMovie.backdrop_path)" alt="Background Image"
                class="w-full rounded-lg h-full object-cover backdrop-image" />
            <div class="absolute rounded-lg inset-5 overlay">

                <transition name="fade" mode="out-in">
                    <div :key="currentMovie.id" class="grid grid-cols md:grid-cols-2 gap-10  md:px-20 md:py-5 p-5">
                        <div class="col mt-28 absolute bottom-5">
                            <h1 class="title text-3xl text-white text-truncate">{{ currentMovie.title }}</h1>

                            <div class="my-2">

                                <button type="button"
                                    class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-gray-900 bg-white rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <Icon icon="solar:play-bold" class="mr-2" />
                                    Play
                                </button>

                                <button type="button"
                                    class="mx-5 w-8 h-8 mr-2 my-0 mb-2 text-sm font-medium text-gray-900 focus:outline-none rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                    <Icon icon="teenyicons:add-outline" width="15" color="white" class="mx-auto" />
                                </button>
                            </div>

                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </main>
</template>
  
<script>
import { Icon } from '@iconify/vue';
import navbarVue from '../navbar.vue';
import axios from 'axios';

export default {
    components: { Icon, navbarVue },
    data() {
        return {
            currentMovie: {},
            tmdbRuntime: null,
            tmdbRating: null,
        };
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


    mounted() {
        this.fetchRandomMovie();
        setInterval(this.fetchRandomMovie, 100000);
    },
    methods: {
        getImageUrl(path) {
            return path ? `https://image.tmdb.org/t/p/w300${path}` : 'https://via.placeholder.com/500';
        },

        getBackgroundImageUrl(path) {
            return path ? `https://image.tmdb.org/t/p/w1280${path}` : 'https://via.placeholder.com/500';
        },

        fetchRandomMovie() {

            const url = ' https://api.themoviedb.org/3/movie/now_playing';
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzY0YzQ2YWI4NjQyN2Q1YzM2ZWNmOTU3MGIwMjQ0OSIsInN1YiI6IjY0OTZjODYzZWI3OWMyMDBjNTZkNDIwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B1why-oEZuEzU5xSfBffmEPZt7_xwFrVoaPUi_O26Ds'
                }
            };

            axios.get(url, options)
                .then(response => {
                    const data = response.data;
                    const randomIndex = Math.floor(Math.random() * data.results.length);
                    this.currentMovie = data.results[randomIndex];
                    this.tmdbRuntime = data.results[randomIndex].runtime;
                    this.tmdbRating = data.results[randomIndex].vote_average;

                })

                .catch(err => {
                    console.log('Error fetching movie', err);
                })
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

        goToDetails(id) {
            this.$router.push(`/movie/details/${id}`)
        }


    },
};
</script>
  
<style scoped>.nav {
    display: relative;
    z-index: 2;
}

.overlay {
    background: rgba(0, 0, 0, 0.4);
}</style>
  