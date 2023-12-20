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

        <button @click="addMovieToCollection(movie.id)" class="btn bg-red-700 rounded-full p-4">
            <Icon icon="icon-park-solid:tag" color="white" />
        </button>

        <button @click="addMovieToFavourite(movie.id)" class="btn bg-red-700 rounded-full p-4">
            <Icon icon="ph:star-fill" color="white" />
        </button>

    </div>
</template>

<script>
import { Icon } from '@iconify/vue'
import { collection, addDoc, query, where, updateDoc, getDocs, doc, Timestamp } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import { toast } from 'vue3-toastify';

export default {
    components: { Icon },
    props: {
        movie: {
            type: Object,
            required: true
        }
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

        async addMovieToCollection(movieId) {
            try {
                const currentUser = auth.currentUser;
                if (currentUser) {
                    // Query for the user with the matching email
                    const userQuery = query(collection(db, 'Users'), where('email', '==', currentUser.email));
                    const querySnapshot = await getDocs(userQuery);

                    if (!querySnapshot.empty) {
                        // Found the user with the matching email
                        const userData = querySnapshot.docs[0].data();
                        const currentMovieCollection = userData.movieCollection || [];
                        const updatedMovieCollection = [...currentMovieCollection, { movieId }];

                        // Update the user document in Firestore
                        const userDocRef = doc(db, 'Users', querySnapshot.docs[0].id);
                        await updateDoc(userDocRef, { movieCollection: updatedMovieCollection });

                        toast.success('Movie added to collection')
                        console.log('Movie added to collection successfully.');
                    } else {
                        console.log('Error: User document not found');
                    }
                }
            } catch (error) {
                console.error('Error adding movie to collection:', error);
            }
        }

    }
}
</script>

<style></style>