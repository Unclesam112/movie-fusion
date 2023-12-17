<template>
    <main class="flex items-center justify-center h-screen text-center">

        <div>
            <div>
                <transition-group name="fade" mode="out-in">
                    <div v-for="(letter, index) in displayedWord.split('')" :key="index"
                        class="text-2xl sm:text-6xl text-center text-red-700 letter">
                        <h1 class="text-red-700 font-bold">{{ letter }}</h1>
                    </div>
                </transition-group>
            </div>


            <transition name="fade" mode="out-in">


                <div class="btn text-center my-8" v-if="wordAnimationComplete">
                    <router-link to="/signin">

                        <button type="button"
                            class="full-width-button focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                            Sign
                            In
                        </button>


                    </router-link>

                    <router-link to="/signup">

                        <button type="button"
                            class="full-width-button w-full my-4 focus:outline-none text-red-700 shadow-md hover:bg-red-800 hover:text-white focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                            Sign
                            Up
                        </button>
                    </router-link>
                </div>
            </transition>

        </div>



    </main>
</template>

<script>
export default {
    data() {
        return {
            word: 'MOVIEFUSION',
            wordAnimationComplete: false,
            displayedWord: '',
        };
    },
    mounted() {
        this.animateWord();
    },
    methods: {
        animateWord() {
            this.displayedWord = ''; // Reset the displayed word
            this.animateNextLetter(0);
        },
        animateNextLetter(index) {
            if (index < this.word.length) {
                setTimeout(() => {
                    this.displayedWord += this.word[index];
                    this.animateNextLetter(index + 1);
                }, 200); // Adjust the delay as needed
            } else {
                // Word animation is complete

                setTimeout(() => {
                    this.wordAnimationComplete = true;
                }, 1000)

            }
        },
    },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.letter {
    display: inline-block;
    transform: translateY(0);
    opacity: 1;
    transition: opacity 0.5s ease, transform 0.5s ease-in;
    letter-spacing: 10px;
}

.full-width-button {
    width: 100%;
    padding: 10px;
    /* Adjust padding as needed */
}</style>