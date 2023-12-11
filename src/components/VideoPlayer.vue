<template>
    <YouTube 
    v-if="showVideo"
    :src="`https://www.youtube.com/watch?v=${trailerVideoId}`" 
    @ready="onReady"
    :video-id="trailerVideoId"
    :player-opts="videoOptions"
    @onPause="handlePause"
     ref="youtube" 
     class="youtube-video"/>
</template>

<script>
import axios from 'axios'
import { defineComponent } from 'vue'
import YouTube from 'vue3-youtube'


export default defineComponent({

    components: { YouTube },
    data() {
        return {
            showVideo: true,
            trailerVideoId: null,
            videoOptions: {
                controls: false,
                modestbranding: false,
                loop: true,
                autoplay: true
            }
        }
    },

    mounted() {
        this.fetchVideos()
    },

    methods: {
        onReady() {
            this.$refs.youtube.playVideo()
        },
        handlePause() {
            this.showVideo = false;
        },

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
                if(response.results && response.results.length > 0) {
                    this.trailerVideoId = response.data.results[0].key
                }
                console.log(response.data.results);
            }

            catch (error) {
                console.log('Error fetching movie', error);
            }
        },
    },
})
</script>

<style scoped>

.youtube-video {
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
}

</style>