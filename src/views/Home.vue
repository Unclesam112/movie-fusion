<template>
 
 <navbarVue />
  <main class="md:p-4 p-0 sm:ml-64">
    <!-- <fullPageLoader :isLoading="isLoading" /> -->
   

     <div>
      <smallHeaderVue class=" md:hidden"/>
      <headerVue class=" hidden md:block"/>
    </div>

    <CreateCollectionButtonVue />

    <div class="movies md:p-10 md:pt-0 p-4">
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
import CreateCollectionButtonVue from '../components/CreateCollectionButton.vue'
import fullPageLoader from '../components/fullPageLoader.vue'
import BottomNav from '../components/layout/bottomNav.vue'
import footerVue from '../components/layout/footer.vue'
import headerVue from '../components/layout/header.vue'
import navbarVue from '../components/layout/navbar.vue'
import smallHeaderVue from '../components/layout/smallDevice-layout/header.vue'
import MovieList from '../components/MovieList.vue'


export default {
    components: {headerVue, MovieList, footerVue, fullPageLoader, BottomNav, smallHeaderVue, CreateCollectionButtonVue, navbarVue},
    data() {
      return {
        isLoading: true,
      }
    }
}
</script>

<style scoped>

</style>
