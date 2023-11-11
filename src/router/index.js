import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import movieDetail from '../views/movieDetails.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/movie/details/:id',
      name: 'movie-details',
      component: movieDetail
    },
    
  ]
})

export default router
