<template>
    <div class="button flex gap-4 my-6">
        <button data-tooltip-target="tooltip-default" type="button" class="btn bg-red-700 rounded-full p-4">
            <Icon icon="ph:heart-fill" color="white" />
        </button>
        <div id="tooltip-default" role="tooltip"
            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Tooltip content
            <div class="tooltip-arrow" data-popper-arrow></div>
        </div>

        <button data-modal-target="select-modal" data-modal-toggle="select-modal" class="btn bg-red-700 rounded-full p-4">
            <Icon icon="icon-park-solid:tag" color="white" />
        </button>
        <h1></h1>


        <!-- Main modal -->
        <div id="select-modal" tabindex="-1" aria-hidden="true"
            class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-md max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            My Collections
                        </h3>
                        <button type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-toggle="select-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div class="p-4 md:p-5">
                        <p class="text-gray-500 dark:text-gray-400 mb-4">Select your desired collection:</p>
                        <ul v-if="userCollections.length > 0" class="space-y-4 mb-4">
                            <li @click.prevent="addMovieToCollection(collection.name)" v-for="collection in userCollections"
                                :key="collection.id">
                                <input type="radio" id="job-1" name="job" value="job-1" class="hidden peer" required>
                                <label for="job-1"
                                    class="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                                    <div class="block">
                                        <div class="w-full text-sm font-medium">{{ collection.name }}</div>
                                        <!-- <div class="w-full text-gray-500 dark:text-gray-400">Flowbite</div> -->
                                    </div>
                                    <svg class="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </label>
                            </li>

                        </ul>
                        <div class="" v-else>
                            <h1 class="text-3xl text-gray-300 flex items-center justify-center h-screen">No Collection!</h1>
                        </div>
                        <button
                        @click="goToLink()"
                            class="text-white inline-flex w-full justify-center bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                            Create Collection
                    </button>
                    </div>
                </div>
            </div>
        </div>

        <button @click="addMovieToFavourite(movie.id)" class="btn bg-red-700 rounded-full p-4">
            <Icon icon="ph:star-fill" color="white" />
        </button>



        <!-- <div @click.prevent="addMovieToCollection(collection.name)" v-for="collection in userCollections"
            :key="collection.id"
            class="pointer my-2 flex items-center bg-white rounded-lg  md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
           
            <Icon icon="octicon:video-16" width="50" />
            <div class="flex flex-col justify-between pt-1.5 leading-normal">
                <h5 class="mb-2 text-sm px-2 font-medium tracking-tight text-gray-900 dark:text-white truncate w-48">
                    {{ collection.name }}
                </h5>
            </div>
        </div> -->

    </div>
</template>

<script>
import { Icon } from '@iconify/vue'
import { collection, addDoc, query, where, updateDoc, getDocs, doc, Timestamp } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import { toast } from 'vue3-toastify';
import { initFlowbite } from 'flowbite'

export default {
    components: { Icon },
    props: {
        movie: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            userCollections: []
        }
    },

    mounted() {
        this.getCollections()
        initFlowbite()
    },

    methods: {

        async addMovieToFavourite(movieId) {
            try {
                const currentUser = auth.currentUser;
                if (currentUser) {
                    const querySnapshot = await getDocs(collection(db, 'Users'));
                    const userData = querySnapshot.docs.find(doc => doc.data().email === currentUser.email)?.data();

                    if (userData) {
                        // Found the user with the matching email
                        const currentFavouriteMovies = userData.favouriteMovies || [];

                        // Check if the movie already exists in favorites
                        if (currentFavouriteMovies.some(movie => movie.movieId === movieId)) {
                            console.log('Movie is already in favorites.');
                            toast.info('Movie exist in Favourites')
                            return; // Skip adding the movie
                        }

                        const updatedFavouriteMovies = [
                            ...currentFavouriteMovies,
                            { movieId, addedAt: Timestamp.fromDate(new Date()) },
                        ];

                        const userDoc = querySnapshot.docs.find(doc => doc.data().email === currentUser.email);
                        if (userDoc) {
                            await updateDoc(userDoc.ref, {
                                favouriteMovies: updatedFavouriteMovies,
                            });
                            console.log('Movie added to favorites successfully.');
                            toast.success('Movie exist in Favourites')
                        } else {
                            console.log('Error: User document not found');
                        }
                    } else {
                        console.log('Error: User data not found');
                    }
                }
            } catch (e) {
                console.error('Error adding movie to favorites:', e);
            }
        },

        async addMovieToCollection(movieData) {

            try {
                const currentUser = auth.currentUser;
                if (currentUser) {
                    // Query for the user with the matching email
                    const userQuery = query(collection(db, 'Users'), where('email', '==', currentUser.email));
                    const querySnapshot = await getDocs(userQuery);

                    if (!querySnapshot.empty) {
                        // Found the user with the matching email
                        const userData = querySnapshot.docs[0].data();
                        const movieCollections = userData.movieCollection || {};

                        // Extract collection names
                        const collectionIndex = movieCollections.findIndex(collection => collection.name === movieData);
                        if (collectionIndex !== -1) {
                            // Add the movie to the specified collection
                            movieCollections[collectionIndex].movies.push({
                                movieId: this.$route.params.id
                            });


                            // // Update the user document with the modified movie collection
                            // Update the user document with the modified movie collection
                            await updateDoc(querySnapshot.docs[0].ref, {
                                movieCollection: movieCollections,
                            });


                            toast.success('Movie added to collection');
                            console.log('Movie added to collection successfully.:', collectionIndex);
                        } else {
                            console.log('Error: Collection does not exist');
                        }
                    } else {
                        console.log('Error: Collection does not exist');
                    }

                }
            }

            catch (error) {
                console.error('Error adding movie to collection:', error);
            }
        },

        async getCollections() {
            try {
                const currentUser = auth.currentUser;

                if (currentUser) {
                    // Query for the user with the matching email
                    const userQuery = query(collection(db, 'Users'), where('email', '==', currentUser.email));
                    const querySnapshot = await getDocs(userQuery);

                    if (!querySnapshot.empty) {
                        // Found the user with the matching email
                        const userData = querySnapshot.docs[0].data();
                        const movieCollections = userData.movieCollection || {};

                        // Extract collection names
                        const collectionNames = movieCollections;

                        this.userCollections = collectionNames
                        console.log('Collections:', collectionNames);
                        return collectionNames;
                    } else {
                        console.log('Error: User document not found');
                        return [];
                    }
                }
            } catch (error) {
                console.error('Error fetching collections:', error);
                return [];
            }
        },

        goToLink() {
            this.$router.push('/create-collection')
        }
    }
}

</script>

<style></style>