<template>
    <!-- <YouTube 
    v-if="showVideo"
    :src="`https://www.youtube.com/watch?v=${trailerVideoId}`" 
    @ready="onReady"
    :video-id="trailerVideoId"
    :player-opts="videoOptions"
    @onPause="handlePause"
     ref="youtube" 
     class="youtube-video"/> -->

     <main class="video-container" @mouseover="showControls = true" @mouseout="showControls = false" v-if="video">
        <iframe :src="getVideoUrl(video[0].key)" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
     </main>
</template>

<script>
import axios from 'axios'
import { defineComponent } from 'vue'
import YouTube from 'vue3-youtube'
import API_ENDPOINTS from '../utils/ApiRoutes'



export default defineComponent({

    components: { YouTube },
    data() {
        return {
            showControls: false,
            video: null
        }
    },
    computed: {
    
    },

    mounted() {
        this.fetchVideos()
    },

    methods: {
        async fetchMovieDetails(id) {
            const movieId = this.$route.params.id
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: API_ENDPOINTS.KEY
                }
            };

            axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, options)
                .then(response => {
                    const data = response.data;
                    const genreIds = data.genres.map(genre => genre.id)
                    this.movie = data
                    this.tmdbRuntime = response.data.runtime;
                    this.tmdbRating = response.data.vote_average;
                    console.log(data);
                })

                .catch(err => {
                    console.log('Error fetching movie', err);
                })

            scrollToTop();
        },

        async fetchVideos() {
            const movieId = this.$route.params.id
            try {
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: API_ENDPOINTS.KEY
                    }
                };
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, options)
                this.video = response.data.results
                console.log("video key:", response.data.results);
            }

            catch (error) {
                console.log('Error fetching movie', error);
            }
        },

        getVideoUrl(key) {
            return `https://www.youtube.com/embed/${key}?autoplay=1&mute=1`
        },
    },
})
</script>

<style scoped>

.video-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
    overflow: hidden;
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%
}

.video-container:hover iframe {
    pointer-events: auto;
}
</style>