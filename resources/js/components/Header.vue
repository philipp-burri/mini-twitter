<template>
  <header class="bg-blue-400 shadow-md w-full h-[104px] flex items-center">
    <div class="w-full mx-[9.75rem] flex justify-between items-center">
      <router-link to="/" class="text-black hover:text-blue-700 transition-colors duration-200">
        <h1 class="font-custom text-5xl text-white font-semibold">echo.</h1>
      </router-link>
      <div v-if="authUser" class="relative inline-block">
        <div class="flex items-center space-x-4">
          <input type="text" placeholder="Search..." class="border rounded-full px-4 py-2 text-lg">
          <button class="bg-blue-500 text-white rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
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
