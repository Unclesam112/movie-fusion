import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import movieDetail from '../views/MovieDetails.vue'
import movieGenre from '../views/Genres.vue'
import loginPage from '../views/AuthPage/login.vue'
import registerPage from '../views/AuthPage/register.vue'
import recoverPassword from '../views/AuthPage/recoverPassword.vue'
import castDetails from '../views/CastDetails.vue'
import verifyEmail from '../views/AuthPage/verifyEmail.vue'
import unverifyEmail from '../views/AuthPage/unverifiedEmail.vue'
import movieCollection from '../views/MovieCollections.vue'
import profile from '../views/Profile.vue'
import VideoPlayer from '../components/VideoPlayer.vue'
import AllMovies from '../views/AllMovies.vue'
import Fave from '../views/Favourite.vue'

import { auth } from '../firebase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: true },
      component: HomeView
    },

    {
      path: '/movie/details/:id',
      name: 'movie-details',
      meta: { requiresAuth: true },
      component: movieDetail
    },

    {
      path: '/video',
      name: 'video',
      meta: { requiresAuth: true },
      component: VideoPlayer
    },

    {
      path: '/movie/genre/:id',
      name: 'movie-genre',
      meta: { requiresAuth: true },
      component: movieGenre
    },

    {
      path: '/movies/collection',
      name: 'movie-collection',
      meta: { requiresAuth: true },
      component: movieCollection
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

    {
      path: '/recover-password',
      name: 'reset',
      component: recoverPassword
    },

     {
      path: '/cast/details/:id',
      name: 'cast',
      meta: { requiresAuth: true },
      component: castDetails
    },

    {
      path: '/verify-email',
      name: 'verify-email',
      component: verifyEmail
    },

    {
      path: '/unverified-email',
      name: 'unverify-email',
      component: unverifyEmail
    },

    {
      path: '/movies',
      name: 'allMovies',
      component: AllMovies
    },

      {
      path: '/favourites',
      name: 'favourites',
      component: Fave
    },

    {
      path: '/profile',
      name: 'profile',
      component: profile
    },
    
  ]
})

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Wait for the user's authentication status to be rehydrated
    auth.onAuthStateChanged(user => {
      if (user) {
        // Check if the user's email is verified
        if (user.emailVerified) {
          // User is authenticated and email is verified, proceed with navigation
          next();
        } else {
          // User is authenticated but email is not verified, redirect to a verification page
          next({ path: '/unverified-email' });
        }
      } else {
        // User is not authenticated, redirect to login
        next({ path: "/signin" });
      }
    });
  } else {
    // Route doesn't require authentication, proceed with navigation
    next();
  }
});

export default router
