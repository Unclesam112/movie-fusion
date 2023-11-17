import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import movieDetail from '../views/MovieDetails.vue'
import movieGenre from '../views/Genres.vue'
import loginPage from '../views/AuthPage/login.vue'
import registerPage from '../views/AuthPage/register.vue'


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

    {
      path: '/movie/genre/:id',
      name: 'movie-genre',
      component: movieGenre
    },

    {
      path: '/signin',
      name: 'signIn',
      component: loginPage
    },

    {
      path: '/signup',
      name: 'signup',
      component: registerPage
    },
    
  ]
})

export default router
