<template>
  <header class="bg-white shadow-md w-full h-[104px] flex items-center">
    <div class="w-full mx-[9.75rem] flex justify-between items-center">
      <!-- Links: MINI-TWITTER -->
      <router-link to="/" class="text-black hover:text-blue-500 transition-colors duration-200">
        <h1 class="text-2xl font-black">MINI-TWITTER</h1>
      </router-link>

      <!-- Mitte: Tweets und Tweet erstellen -->
      <nav class="flex items-center space-x-12">
        <router-link to="/dashboard" class="text-2xl font-normal text-black hover:text-black hover:underline">
        My tweets
        </router-link>
        <router-link to="/post/create" class="inline-block">
          <button class="text-2xl bg-blue-500 font-normal text-white px-4 py-2 rounded-full">
            + Create tweet
          </button>
        </router-link>
      </nav>

      <!-- Rechts: Profilbild und Name -->
      <div class="flex items-center space-x-4">
        <img :src="`${baseUrl}/images/placeholder-img.jpg`" alt="Profile" class="w-10 h-10 rounded-full">
        <p class="text-2xl font-normal" v-if="authUser">{{ authUser.name }}</p>
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

const baseUrl = import.meta.env.VITE_BASE_URL; /* "http://localhost" */
const dropdownOpen = ref(false);
const router = useRouter();
const authStore = useAuthStore();

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const logout = async () => {
  await authStore.logout();
  router.push('/login');
};


</script>