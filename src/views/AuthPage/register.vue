<template>
    <main>
        <div class="login">
            <div class="grid grid-cols-1 md:grid-cols-2">
                <div class="col h-screen side hidden md:block">
                    <div class="h-screen flex items-center justify-center">
                        <div>
                            <h1 class="text-white text-5xl">Join the journey</h1>
                            <p class="text-white text-xl">Your cinematic journey starts now</p>
                        </div>
                    </div>
                </div>

                <div class="col">


                    <div
                        class="mx-auto mt-10 w-full max-w-md p-4 bg-white  border-gray-200 rounded-lg sm:p-6 md:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <!-- <h1 class="text-center text-red-700 text-lg font-semibold">MovieFusion</h1> -->
                        <form class="space-y-4" action="#">
                            <h5 class="text-3xl font-bold text-gray-900 dark:text-white">Welcome Onboard!</h5>
                            <p class="text-gray-700">
                                Unleash the Magic of Movies. Create Your Account Today
                            </p>
                            <div>
                                <label for="email"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                                <input type="text" name="fullname" id="fullname"
                                    class=" border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder=" enter your full name" required>
                            </div>

                            <div>
                                <label for="email"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="email" id="email"
                                    class=" border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder=" enter your email here" required>
                            </div>

                            <div>
                                <label for="password"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="enter your password here"
                                    class=" border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required>
                            </div>
                            <div class="flex items-start">
                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input id="remember" type="checkbox" value=""
                                            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                            required>
                                    </div>
                                    <label for="remember"
                                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Keep me logged
                                        in</label>
                                </div>
                                <a href="#" class="ms-auto text-sm text-red-700 hover:underline dark:text-blue-500">Recover
                                    Password</a>
                            </div>
                            <button type="submit"
                                class="w-full text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login
                                to your account</button>

                            <div class="flex items-center">
                                <hr class="flex-grow border-gray-300 mr-3">
                                <span class="text-gray-300 text-sm">Or Sign up using</span>
                                <hr class="flex-grow border-gray-300 ml-3">
                            </div>

                            <div class="flex justify-center gap-2">
                                <button type="button"
                                    class="text-white bg-white border border-gray-300 hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                                    <svg class="w-4 h-4 mx-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="blue" viewBox="0 0 8 19">
                                        <path fill-rule="evenodd"
                                            d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                                            clip-rule="evenodd" />
                                    </svg>

                                </button>

                                <button type="button"
                                    class="text-white bg-white border border-gray-300 hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                                    <svg class="w-4 h-4 mx-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="red" viewBox="0 0 18 19">
                                        <path fill-rule="evenodd"
                                            d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                                            clip-rule="evenodd" />
                                    </svg>

                                </button>

                                <button type="button"
                                    class="text-white bg-white border border-gray-300 hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2">
                                    <svg class="w-5 h-5 mx-auto -ms-1" aria-hidden="true" focusable="false" data-prefix="fab"
                                        data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 384 512">
                                        <path fill="black"
                                            d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z">
                                        </path>
                                    </svg>
                                    
                                </button>
                            </div>
                            <div class="text-sm text-center font-medium text-gray-500 dark:text-gray-300">
                                Already have an account?<a href="#" class="text-red-700 font-semibold hover:underline dark:text-blue-500"> Sign In</a>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {

}
</script>

<style>.side {
    background: linear-gradient(0deg, rgba(16, 16, 16, 0.3), rgba(0, 0, 0, 0.3)), url(../../assets/img/bg.jpg);
    background-size: cover;
    background-repeat: no-repeat;
}</style>