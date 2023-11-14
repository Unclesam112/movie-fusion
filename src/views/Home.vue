<template>
  <main>
    <div class="navbar">
        <headerVue />
    </div>

    <div class="movies md:p-10 p-4">
        <MovieList />
    </div>

    <div class="footer">
      <footerVue />
    </div>
  </main>
</template>

<script>
import footerVue from '../components/layout/footer.vue'
import headerVue from '../components/layout/header.vue'
import MovieList from '../components/MovieList.vue'



export default {
    components: {headerVue, MovieList, footerVue}
}
</script>

<style>

</style>