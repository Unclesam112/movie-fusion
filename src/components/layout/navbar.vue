<template>
  <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <div class="px-0 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between gap-8">
        <div class="flex md:flex-shrink-0 items-center justify-start rtl:justify-end">
          <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
              </path>
            </svg>
          </button>
          <a href="/" class="flex ms-2 md:me-24">
            <span
              class="self-center text-2xl text-black font-medium sm:text-2xl whitespace-nowrap dark:text-white">Moviefusion.</span>
          </a>
        </div>

        <!-- Search bar -->
        <div class="hidden md:relative md:flex-shrink-0">
          <input type="text" v-model="searchQuery" @input="handleSearch"
            class="block w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search movies..." />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
              viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          <div v-if="searchResults.length > 0"
            class="absolute search p-2 mt-2 w-full h-100 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-700">
            <h1 class="text-md">Results:</h1>
            <ul>
              <li v-for="movie in searchResults" :key="movie.id">
                <div
                @click="goToDetails(movie.id)"
                  class=" my-2 flex items-center bg-white rounded-lg  md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <!-- <MovieCardVue :movie="movie"/> -->
                  <img v-if="movie.poster_path" :src="getImageUrl(movie.backdrop_path)" :alt="movie.title"
                    class="w-20 card-image rounded md:rounded-md" />
                  <div class="flex flex-col justify-between pt-1.5 leading-normal">
                    <h5 class="mb-1 text-xs px-2 font-medium tracking-tight text-gray-900 dark:text-white truncate w-28">
                      {{
                        movie.title }}
                    </h5>
                    <button type="button" @click.prevent="addMovieToCollection(movie.id)"
                      class="px-3  text-xs font-medium text-center inline-flex items-center text-gray-900  rounded focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <Icon icon="carbon:play-filled" class="mr-1 leading-none"/>
                      Play

                    </button>

                    <!-- <p class="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400 line-clamp-2">{{ movie.overview }}</p> -->
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="flex w-100 items-center ml-auto mr-10">
          <div class="md:flex items-center ms-3 md:gap-7">
            <div class="hidden md:relative ">
              <Icon icon="mingcute:notification-line" width="24" class=" text-gray-500" />
              <div
                class="absolute inline-flex items-center justify-center w-3 h-3 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-1 -end-0 dark:border-gray-900">
              </div>
            </div>

            <div class="hidden md:relative">
              <Icon icon="humbleicons:chat" width="26" class="text-gray-500" />
              <div
                class="absolute inline-flex items-center justify-center w-3 h-3 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-0.5 -end-0 dark:border-gray-900">
              </div>
            </div>

            <div class="md:flex md:gap-4">
              <button type="button"
                class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span class="sr-only">Open user menu</span>
                <img class="w-10 h-10 rounded-full md:p-0" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="user photo">

              </button>
              <div class="leading-none h-10 hidden md:block">
                <h1 class="text-sm ">Neil Amstrong</h1>
                <span class="text-xs text-gray-500 -pt-1">@neilams</span>
              </div>
            </div>


            <div
              class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
              id="dropdown-user">
              <!-- ... existing user dropdown ... -->
            </div>
          </div>


        </div>
      </div>
    </div>
  </nav>


  <aside id="logo-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar">
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <h1 class="my-3 mx-2.5 text-sm text-gray-500">Home</h1>
        <li>
          <router-link to="/"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-red-700 hover:text-white dark:hover:bg-gray-700 group">
            <Icon icon="majesticons:home" width="20" class="" />
            <span class="ms-3">Home</span>
          </router-link>
        </li>

        <li>
          <a href="#"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-red-700 hover:text-white dark:hover:bg-gray-700 group">
            <Icon icon="mingcute:notification-fill" width="20" />
            <span class="flex-1 ms-3 whitespace-nowrap">Notifications</span>
            <span
              class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
          </a>
        </li>

      </ul>


      <ul class="space-y-2 mt-8 font-medium">
        <h1 class="my-3 mx-2.5 text-sm text-gray-500">Movies</h1>

        <li>
          <router-link to="/movies"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <Icon icon="mingcute:movie-fill" width="20" />
            <span class="flex-1 ms-3 whitespace-nowrap">Movies</span>
          </router-link>
        </li>
        <li>
          <router-link to="/my-collections"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <Icon icon="bi:collection-play-fill" width="20" />
            <span class="flex-1 ms-3 whitespace-nowrap">Collections</span>
          </router-link>
        </li>
        <li>
          <router-link to="/profile"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <Icon icon="mingcute:user-4-fill" width="23" />
            <span class="flex-1 ms-3 whitespace-nowrap">Profile</span>
          </router-link>
        </li>

      </ul>

      <ul class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
        <h1 class="my-3 mx-2.5 text-sm text-gray-500">Account</h1>
        <li>
          <a href="#"
            class="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
            <Icon icon="fluent:premium-16-filled" width="20" />
            <span class="ms-3">Upgrade to Pro</span>
          </a>
        </li>
        <li>
          <a href="#"
            class="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
            <Icon icon="icon-park-solid:help" width="20" />
            <span class="ms-3">Help</span>
          </a>
        </li>

      </ul>
    </div>
  </aside>

  <div class="p-4 sm:ml-64">

  </div>
</template>

<script>


import { Icon } from '@iconify/vue';
import { initFlowbite } from 'flowbite'
import API_ENDPOINTS from '../../utils/ApiRoutes';
import axios from 'axios';

export default {
  components: { Icon },
  data() {
    return {
      searchQuery: '',
      searchResults: [],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    goToDetails(id) {
            this.$router.push(`/movie/details/${id}`)
        },

    async handleSearch() {
      if (this.searchQuery.trim() === '') {
        this.searchResults = [];
        return;
      }

      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: API_ENDPOINTS.KEY
          }
        };
        const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${this.searchQuery}`;

        const response = await axios.get(apiUrl, options);
        const filteredResults = response.data.results.filter(movie => movie.poster_path);

        this.searchResults = filteredResults;
      } catch (error) {
        console.error('Error searching movies:', error);
      }
    },
    getImageUrl(path) {
      return path ? `https://image.tmdb.org/t/p/w1280${path}` : 'https://via.placeholder.com/500';
    },

    getBackgroundImageUrl(path) {
      return path ? `https://image.tmdb.org/t/p/w1280${path}` : 'https://via.placeholder.com/500';
    },
  },

  mounted() {
    initFlowbite()
  }
}
</script>

<style scoped>
ul li a:hover {
  background: red;
  color: #fff !important;
  transition: background 0.5s ease-in;
}

.search  {
  height: 500px;
  overflow: scroll;
  overflow-x: hidden;
  /* For WebKit browsers (Chrome, Safari) */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  /* For Firefox */
  scrollbar-width: thin;



}

::-webkit-scrollbar {
  width: 2px;
}
</style>
