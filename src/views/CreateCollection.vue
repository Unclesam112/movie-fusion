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
                            class="mx-auto py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            @click.prevent="goBack">Cancel</button>

                        <button type="button"
                            class="text-white bg-red-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            @click="createCollection">

                            <span v-if="!loading">Create</span>
                            <span v-else>
                                <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin"
                                    viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="#E5E7EB" />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentColor" />
                                </svg>Loading...</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { Icon } from '@iconify/vue'
import { collection, addDoc, query, where, updateDoc, getDocs, doc, arrayUnion } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import { toast } from 'vue3-toastify';
export default {
    data() {
        return {
            collectionName: 'My Collectiton',
            loading: false
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
            this.$router.go('/my-collections');
        },

        async createCollection() {
            if (this.collectionName) {
                try {
                    const currentUser = auth.currentUser;
                    if (currentUser) {
                        // Query for the user with the matching email
                        const userQuery = query(collection(db, 'Users'), where('email', '==', currentUser.email));
                        const querySnapshot = await getDocs(userQuery);

                        if (!querySnapshot.empty) {
                            // Found the user with the matching email
                            const userDocRef = doc(db, 'Users', querySnapshot.docs[0].id);

                            // Use arrayUnion to add the new collection without checking if it already exists
                            await updateDoc(userDocRef, {
                                movieCollection: arrayUnion({ name: this.collectionName, movies: [] })
                            });

                            toast.success('Collection created successfully');
                            this.$router.push(`/collection-details/${this.collectionName}`);
                            console.log('Collection created successfully.');
                            this.loading = true;
                        } else {
                            console.log('Error: User document not found');
                        }
                    }
                } catch (error) {
                    console.error('Error creating collection:', error);
                }
            }
        }




    }
}
</script>

<style></style>