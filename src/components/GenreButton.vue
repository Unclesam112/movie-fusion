<template>
    <main>
        <router-link :to="`/movie/genre/${genre.id}`" type="button"
            class="text-gray-900 bg-white text-gray-500 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-full">
            {{ genre.name }}
        </router-link>
    </main>
</template>

<script>
export default {
    props: {
        genre: {
            type: Object,
            required: true
        }
    }

}
</script>

<style></style>