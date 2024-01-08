<template>
    <div>
      <!-- Your existing content goes here -->
  
      <!-- Floating button -->
      <div class="floating-button">
        <!-- Button content goes here -->
        <button @click="handleButtonClick" class="flex justify-center h-auto items-center"><Icon icon="uiw:plus" color="white" width="18" /></button>
      </div>

      
    </div>
  </template>
  
  <script>
import { Icon } from '@iconify/vue';

  export default {
    components: {  Icon},
    methods: {
      handleButtonClick() {
        // Your button click logic goes here
        console.log('Button clicked!');
        this.$router.push('/create-collection')
      },
    },
  };
  </script>
  
  <style scoped>
  .floating-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000; /* Adjust the z-index as needed */
  }
  
  /* Optional styles for the button */
  .floating-button button {
    background-color: #ff0000; /* Button background color */
    color: #ffffff; /* Button text color */
    border: none;
    text-align: center;
    width: 40px;
    height: 40px;
    border-radius: 100px;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  </style>
  