<template>
  <header class="bg-gradient-to-r from-teal-200 to-teal-500 shadow-lg w-full h-[120px] flex items-center">
    <div class="w-full mx-[9.75rem] flex justify-between items-center">
      <router-link to="/" class="text-white hover:shadow-sm">
        <h1 class="font-custom text-6xl font-bold" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">echo.</h1>
      </router-link>
      <div v-if="authUser" class="relative inline-block">
        <div class="flex items-center space-x-4">
          <div class="relative">
            <input type="text" placeholder="Search..." class="border-2 border-white rounded-full px-6 py-3 text-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300">
            <button class="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-200 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '@/store/AuthStore';
import { storeToRefs } from "pinia";
const { authUser } = storeToRefs(useAuthStore());
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

.font-custom {
  font-family: 'Anton', sans-serif;
}
</style>