<template>
  <header class="bg-white shadow-md w-full h-[104px] flex items-center">
    <div class="w-full mx-[9.75rem] flex justify-between items-center">
 

      <router-link to="/" class="text-black hover:text-blue-700 transition-colors duration-200">
        <h1 class="font-custom text-5xl text-blue-500 font-semibold">echo.</h1>
      </router-link>


      <nav v-if="authUser" class="flex items-center space-x-12">
        <router-link to="/dashboard" class="text-2xl font-normal text-black hover:text-black hover:underline">
          Meine Tweets
        </router-link>
        <router-link to="/post/create" class="inline-block">
          <button class="text-2xl bg-blue-500 font-normal text-white px-4 py-2 rounded-full">
            + Tweet erstellen
          </button>
        </router-link>
      </nav>


      <div v-if="authUser" class="relative inline-block text-left">
        <button @click="toggleDropdown" class="flex items-center space-x-4 focus:outline-none" ref="dropdownTrigger">
          <img :src="`${baseUrl}/images/placeholder-img.jpg`" alt="Profile" class="w-10 h-10 rounded-full">
          <span class="text-2xl font-normal" v-if="authUser">{{ authUser.name }}</span>
          <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
        <div v-if="isOpen" class="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" :style="{ width: dropdownWidth + 'px' }">
          <div class="py-1">
            <span class="block px-4 py-2 text-sm text-gray-700">
              Signed in as <b>{{ authUser.email }}</b>
            </span>

            <router-link to="/settings" class="border-t w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Settings
          </router-link>

            <button @click="logout" class=" border-gray-200 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>

  </template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/AuthStore';
import { storeToRefs } from "pinia";

const { authUser } = storeToRefs(useAuthStore());
const baseUrl = import.meta.env.VITE_BASE_URL;
const router = useRouter();
const authStore = useAuthStore();

const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const logout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>