<template>
  <main>
    <div class="navbar">
        <headerVue />
    </div>

    <div class="movies md:p-10 p-10">
        <MovieList />
    </div>
  </main>
</template>

<script>
import headerVue from '../components/layout/header.vue'
import MovieList from '../components/MovieList.vue'



export default {
    components: {headerVue, MovieList}
}
</script>

<style>

</style>