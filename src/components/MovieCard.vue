<template>
    <main>
        <div class="col movie-card rounded m-0" @click="goToDetails(movie.id)">

            <div class="image-container">

                <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" class="card-image rounded md:rounded-md" />
                <div class="overlay grid">
                    <button class="button play-button">
                       
                        <Icon icon="teenyicons:heart-outline" width="25" color="white"/>
                    </button>
                   
                </div>
            </div>
            <div class="card-content">
                <!-- Movie title (if needed) -->
                <!-- <h2 class="card-title mt-4 text-gray-500 hidden md:block lg:block">{{ movie.title }}</h2> -->


            </div>
        </div>

    </main>
</template>

<script>
import { collection, addDoc, updateDoc, getDocs, doc } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import { Icon } from '@iconify/vue';

export default {
    props: {
        movie: {
            type: Object,
            required: true
        }
    },

    components: {
        Icon
    },

    data() {
        return {
            showOverlay: false,
            showMenu: false,
        };
    },

    computed: {
        userProfile() {
            return this.$store.state.user;
        },
    },

    methods: {
        getImageUrl(posterPath) {
            return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : 'https://via.placeholder.com/500';
        },

        goToDetails(id) {
            this.$router.push(`/movie/details/${id}`)
        },

        async addMovieToCollection(movieId) {
            try {
                // Get the current user from Firebase authentication
                const currentUser = auth.currentUser;

                if (currentUser) {
                    try {
                        const querySnapshot = await getDocs(collection(db, 'Users'));
                        querySnapshot.forEach(async (doc) => {
                            const userData = doc.data();
                            console.log(userData);
                            if (userData.email === currentUser.email) {
                                // Found the user with the matching email
                                const currentMovieCollection = userData.movieCollection || [];
                                const updatedMovieCollection = [...currentMovieCollection, { movieId }];
                                // Update the user document in Firestore
                                if (doc.ref.exist()) {
                                    alert('Movie is already in collection')
                                }

                                else {
                                    await updateDoc(doc.ref, {
                                        movieCollection: updatedMovieCollection,
                                    });

                                    console.log('Movie added to collection successfully!');
                                }

                            } else {
                                console.log('Error: User document not found');
                            }
                        });
                    } catch (error) {
                        console.error('Error fetching user profile:', error);
                    }
                }
            } catch (error) {
                console.error('Error adding movie to collection:', error);
            }
        },



        async fetchUser() {
            const userEmail = this.userProfile;
            const userCollection = collection(db, 'Users');
            const userRef = await getDocs(userCollection);

            let userId = null;
            userRef.forEach((userDoc) => {
                const userData = userDoc.data();
                // console.log(userData, userEmail);
                if (userData.email === userEmail.email) {
                    userId = userData.id,
                        console.log(userId);
                }

                else {
                    console.log("User not found");
                }
            });

        },
    }
}
</script>

<style scoped>
.image-container {
    position: relative;
    display: inline-block;
    /* Ensures the container only takes up as much space as the image */
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    /* Semi-transparent black overlay */
    display: grid;
    justify-content: center;
    align-items: center;
    opacity: 0;
    /* Initially invisible */
    transition: opacity 0.3s ease;
    /* Smooth transition for opacity */
}

.overlay:hover {
    opacity: 1;
    /* Make the overlay visible on hover */
}
.play-button {
    position: relative;
    top: 0;
}
</style>