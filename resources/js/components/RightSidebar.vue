<template>
    <div class="w-1/5 pr-24 pt-24">
      <div class="flex flex-col items-center mb-6">
        <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-teal-400 p-1">
          <img :src="`${baseUrl}/images/placeholder-img.jpg`" alt="Profile" class="w-full h-full object-cover rounded-full">
        </div>
        <h2 class="text-2xl font-bold mt-4 text-teal-700">{{ authUser.name }}</h2>
      </div>
      <nav class="space-y-4 flex-col justify-center">
        <router-link to="/friends" class="flex items-center text-2xl hover:text-teal-600 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Friends
        </router-link>
        <router-link to="/settings" class="flex items-center text-2xl hover:text-teal-600 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settings
        </router-link>
        <button @click="handleLogout" class="flex items-center text-2xl text-red-500 hover:text-red-700 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </nav>
    </div>
  </template>
  
  <script setup>
  import { storeToRefs } from "pinia";
  import { useAuthStore } from "@/store/AuthStore";
  import router from "@/router";
  
  const { authUser } = storeToRefs(useAuthStore());
  const { logout } = useAuthStore();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  
  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  </script>