<template>
    <main>
        <div class="collection flex items-center h-screen justify-center">
            <div class="collection-box">
                <h1 class="text-center text-lg">Give your collection a name</h1>
                <div class="relative z-0 w-full mb-5 group">
                    <input type="email" name="floating_email" id="floating_email"
                        class="my-8 text-center block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder="My Collection" v-model="collectionName" @focus="onFocus" @blur="onBlur" required />


                    <div class="text-center">
                        <button type="button"
                            class="mx-auto py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" @click.prevent="goBack">Cancel</button>

                        <button type="button"
                            class="text-white bg-red-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            collectionName: 'My Collectiton'
        }
    },

    methods: {
        onFocus() {
            if (this.collectionName === 'My Collectiton') {
                this.collectionName = '';
            }
        },
        onBlur() {
            if (this.collectionName === '') {
                this.collectionName = 'My Collectiton';
            }
        },

        goBack() {
            this.$router.go(-1);
        },
    }
}
</script>

<style></style>