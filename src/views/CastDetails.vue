<template>
    <main>

        <div class="navbar">
            <navbarVue class="bg-gray-900 text-white" />
        </div>

        <div class="my-8  breadcrumb mx-auto mx-6 md:pl-20">
            <breadcrumbVue />
        </div>


        <div class="grid grid-cols 2 md:grid-cols-2" v-if="cast">
            <div class="col mx-auto">
                <div class="img md:p-5 p-5">
                    <CastCard :cast="cast" />
                </div>
            </div>

            <div class="col p-5 md:pr-20">
                <h1 class="text-6xl font-bold mt-2 mb-6">{{ cast.name }}</h1>
                <div class="text-gray-500" v-html="renderBiography(cast.biography)"></div>
                <p class="my-4 text-gray-900 text-xl font-bold">Place Of Birth: <span class="text-gray-500"> {{ cast.place_of_birth }}</span></p>
                <p class="my-4 text-gray-900 text-xl font-bold">Date Of Birth: <span class="text-gray-500"> {{ formatReleaseDate(cast.birthday) }}</span></p>
            </div>
        </div>


        <div class="popular mt-10 md:p-20 md:pt-5">
                <h1 class="text-lg font-bold md:text-3xl mb-2">Featured Movies</h1>
                <Carousel :items-to-show="carouselItemsToShow" :wrap-around="true">
                    <Slide v-for="movie in movies" :key="movie.id">
                        <div class="carousel__item m-5">
                            <MovieCardVue :movie="movie" class=""/>                        
                        </div>
                    </Slide>

                   
                </Carousel>
            </div>

        <div class="footer">
            <footerVue />
        </div>
    </main>
</template>

<script>
import { scrollToTop } from '../utils/scrollToTop.js'
import axios from 'axios'
import navbarVue from '../components/layout/navbar.vue'
import API_ENDPOINTS from '../utils/ApiRoutes'
import CastCard from '../components/CastCard.vue'
import footerVue from '../components/layout/footer.vue'
import breadcrumbVue from '../components/layout/breadcrumb.vue'
import { defineComponent } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import MovieCardVue from '../components/MovieCard.vue'



export default defineComponent({
    components: { navbarVue, CastCard, footerVue, breadcrumbVue, Carousel, Navigation, Slide, MovieCardVue },

    data() {
        return {
            cast: {},
            movies: [],
            carouselItemsToShow: 3.5
        }
    },

    mounted() {
        this.fetchCastDetails()
        this.fetchCastMovie()

        window.addEventListener('resize', this.handleResize)
        this.handleResize()
    },

    beforeDestroy(){
        window.removeEventListener('resize', this.handleResize)
    },

    methods: {
        handleResize() {
            this.carouselItemsToShow = window.innerWidth >= 768 ? 5.5 : 2.5
        },

        async fetchCastDetails() {
            const castId = this.$route.params.id
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: API_ENDPOINTS.KEY
                }
            };

            axios.get(`https://api.themoviedb.org/3/person/${castId}`, options)
                .then(response => {
                    const data = response.data
                    this.cast = data
                    console.log(data);
                })
                .catch(err => {
                    console.log("Error fetching Cast Details", err)
                })
        },

        async fetchCastMovie() {
            const personId = this.$route.params.id
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: API_ENDPOINTS.KEY
                }
            };

            axios.get(`https://api.themoviedb.org/3/person/${personId}/combined_credits`, options)
                .then(response => {
                    const data = response.data.cast;
                    this.movies = data

                    console.log(data);
                })

                .catch(err => {
                    console.log('Error fetching movie', err);
                })

            scrollToTop();
        },

        renderBiography(biography) {
            if (!biography) {
                return ''; // Return an empty string if the biography is undefined or empty
            }

            // Split the biography into paragraphs based on line breaks
            const paragraphs = biography.split(/\r?\n/);
            // Render each paragraph in a <p> element
            return paragraphs.map((paragraph, index) => `<p style="margin-top: 10px;" key="${index}">${paragraph}</p>`).join('');
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

<style></style>