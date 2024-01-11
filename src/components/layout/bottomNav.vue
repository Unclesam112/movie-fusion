<template>
    <div
        class="sm:hidden fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200  bottom-0 left-1/2 dark:bg-gray-700 dark:border-gray-600">
        <div class="grid h-full max-w-lg grid-cols-5 mx-auto">
            <button data-tooltip-target="tooltip-home" type="button"
                class="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
                <router-link to="/">
                    <Icon icon="iconamoon:home"  class="text-gray-700 w-6 h-6 "/>
                </router-link>
               
                <span class="sr-only">Home</span>
            </button>
            <div id="tooltip-home" role="tooltip"
                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
               <router-link to="/"> Home</router-link>
                <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
            <button data-tooltip-target="tooltip-wallet" type="button"
                class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                <router-link to="/movies"> <Icon icon="fluent:movies-and-tv-24-regular"  class="text-gray-700 w-6 h-6"/></router-link>
               
                <span class="sr-only">Movies</span>
            </button>
            <div id="tooltip-wallet" role="tooltip"
                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Movie List
                <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
            <div class="flex items-center justify-center">
                <router-link to="/create-collection" data-tooltip-target="tooltip-new" type="button"
                    class="inline-flex items-center justify-center w-10 h-10 font-medium bg-red-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                    <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 1v16M1 9h16" />
                    </svg>
                    <span class="sr-only">New item</span>
                </router-link>
            </div>
            <div id="tooltip-new" role="tooltip"
                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Create new collection
                <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
            <button data-tooltip-target="tooltip-settings" type="button"
                class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                <router-link to="/favourites"> <Icon icon="ant-design:heart-outlined" class="text-gray-700 w-6 h-6"/></router-link>
               
                <span class="sr-only">Favourite</span>
            </button>
            <div id="tooltip-settings" role="tooltip"
                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Favourite
                <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
            <button data-tooltip-target="tooltip-profile" type="button"
                class="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group">

                <router-link to="/profile">
                    <Icon icon="gg:profile"  class="text-gray-700 w-6 h-6"/>
                </router-link>
               
                <span class="sr-only">Profile</span>
            </button>
        <div id="tooltip-profile" role="tooltip"
            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Profile
           
            <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
    </div>
</div></template>

<script>
import { Icon } from '@iconify/vue';


export default {
    components: {Icon}
}
</script>

<style></style>
