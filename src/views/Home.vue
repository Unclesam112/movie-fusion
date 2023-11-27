<template>
  <main>
    <!-- <fullPageLoader :isLoading="isLoading" /> -->
    <div class="navbar">
        <headerVue />
    </div>

    <div class="movies md:p-10 p-4">
        <MovieList />
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
import fullPageLoader from '../components/fullPageLoader.vue'
import BottomNav from '../components/layout/bottomNav.vue'
import footerVue from '../components/layout/footer.vue'
import headerVue from '../components/layout/header.vue'
import MovieList from '../components/MovieList.vue'


export default {
    components: {headerVue, MovieList, footerVue, fullPageLoader, BottomNav},
    data() {
      return {
        isLoading: true,
      }
    }
}
</script>

<style>

</style>