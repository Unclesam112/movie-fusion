<template>
    <main>

        <div class="navbar">
            <navbarVue class="bg-gray-900 text-white" />
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


        <div class="footer">
            <footerVue />
        </div>
    </main>
</template>

<script>
import axios from 'axios'
import navbarVue from '../components/layout/navbar.vue'
import API_ENDPOINTS from '../utils/ApiRoutes'
import CastCard from '../components/CastCard.vue'
import footerVue from '../components/layout/footer.vue'



export default {
    components: { navbarVue, CastCard, footerVue },

    data() {
        return {
            cast: {}
        }
    },

    mounted() {
        this.fetchCastDetails()
    },

    methods: {
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
}
</script>

<style></style>