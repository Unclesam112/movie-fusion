<template>
    <div class="navbar hidden sm:block">
        <navbarVue class="bg-gray-900 text-white" />
    </div>

    <div class="previousNav">
        <previousNavVue />
    </div>

    <main class="p-4 sm:ml-64">
        <div class="my-8  breadcrumb px-5">
            <breadcrumbVue />
        </div>


        <div class="grid grid-cols-1 md:grid-cols-3" v-if="cast">
            <div class="col mx-auto">
                <div class="img md:p-5 p-5">
                    <CastCard :cast="cast" />
                    <div class="socials flex mx-auto justify-center gap-4">
                        <Icon icon="ic:outline-facebook" color="black" width="40"/>
                        <Icon icon="mingcute:twitter-fill" color="black" width="40"/>
                        <Icon icon="mdi:instagram" color="black" width="40"/>
                        <Icon icon="ic:baseline-tiktok" color="black" width="40"/>
                    </div>
                </div>
            </div>

            <div class="col-span-2 p-5 md:pr-5">
                <h1 class="text-6xl font-bold mt-2 mb-6">{{ cast.name }}</h1>

                <h1 class="text-md">Biography</h1>
                <div class="text-gray-500 text-sm" v-html="renderBiography(cast.biography)"></div>
                <!-- <p class="my-4 text-gray-900 text-md ">Place Of Birth: </p>
                <p class="my-4 text-gray-900 text-md ">Date Of Birth: <span class="text-gray-500"> {{
                    formatReleaseDate(cast.birthday) }}</span></p> -->



                <div class="grid grid-cols-1 md:grid-cols-3 gap-2 my-6">
                    <div class="col shadow rounded-md p-4">
                        <div class="birth mb-3">
                            <h1 class="">Place of Birth</h1>
                            <p class="text-gray-500 text-sm"> {{ cast.place_of_birth
                            }}</p>
                        </div>

                        <div class="department mb-3">
                            <h1 class="">Known for</h1>
                            <p class="text-gray-500 text-sm"> {{ cast.known_for_department
                            }}</p>
                        </div>

                        <div class="Gender mb-3">
                            <h1 class="">Gender</h1>
                            <p class="text-gray-500 text-sm"> {{ gender
                            }}</p>
                        </div>

                        <div class="Birthday mb-3">
                            <h1 class="">Birthday</h1>
                            <p class="text-gray-500 text-sm"> {{  formatReleaseDate(cast.birthday) 
                            }}</p>
                        </div>
                    </div>

                    <div class="col-span-2">
                        <div class="popular p-4 pt-0">
                            <h1 class="text-lg  md:text-1xl mb-2">Know For</h1>
                            <Carousel :items-to-show="3" :wrap-around="true">
                                <Slide v-for="movie in movies" :key="movie.id">
                                    <div class="carousel__item m-2">
                                        <MovieCardVue :movie="movie" class="" />
                                    </div>
                                </Slide>

                                <template #addons>
                                    <Navigation />
                                    <Pagination />
                                </template>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>






        <div class="footer">
            <footerVue />
        </div>

        <div class="bottom-nav m-2">
            <BottomNav />
        </div>
    </main>
</template>

<script>
import BottomNav from '../components/layout/bottomNav.vue'
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
import previousNavVue from '../components/layout/smallDevice-layout/previousNav.vue'
import { Icon } from '@iconify/vue'


export default defineComponent({
    components: { navbarVue, CastCard, Icon, footerVue, breadcrumbVue, Carousel, Navigation, Slide, MovieCardVue, previousNavVue },

    data() {
        return {
            cast: {},
            movies: [],
            carouselItemsToShow: 4,
            gender: ''
        }
    },

    mounted() {
        this.fetchCastDetails()
        this.fetchCastMovie()

        window.addEventListener('resize', this.handleResize)
        // this.handleResize()
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize)
    },

    methods: {
        // handleResize() {
        //     this.carouselItemsToShow = window.innerWidth >= 768 ? 5.5 : 2.5
        // },

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

                    if(data.gender == 1) {
                        this.gender = 'Female'
                    }

                    else {
                        this.gender = 'Male'
                    }
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