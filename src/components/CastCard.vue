<template>
    <main>
        <div class="col movie-card" @click="goToDetails(cast.id)">
            <img :src="getImageUrl(cast.profile_path)" :alt="cast.title" class="card-image md:rounded-md w-100" />
            <div class="card-content">
                <h2 class="card-title mt-4 text-gray-500 hidden md:block lg:block">{{ cast.title }}</h2>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    props: {
        cast: {
            type: Object,
            required: true
        }
    },

    methods: {
        getImageUrl(posterPath) {
            return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : 'https://via.placeholder.com/500';
        },

        goToDetails(id) {
            this.$router.push(`/cast/details/${id}`)
        }
    }
}
</script>

<style></style>