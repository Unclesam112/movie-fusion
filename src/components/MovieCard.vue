<template>
    <main>
        <div class="col movie-card">
            <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" class="card-image md:rounded-md w-100" />
            <div class="card-content">
                <h2 class="card-title mt-4 text-gray-500 hidden md:block lg:block">{{ movie.title }}</h2>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    props: {
        movie: {
            type: Object,
            required: true
        }
    },

    methods: {
        getImageUrl(posterPath) {
            return posterPath ? `https://image.tmdb.org/t/p/original${posterPath}` : 'https://via.placeholder.com/500';
        },
    }
}
</script>

<style></style>