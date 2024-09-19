<template>
  <aside class="w-[300px] h-screen sticky top-0 left-0  bottom-0  shadow-lg z-10 overflow-y-auto">
    <div class="py-8 px-4">
      <!-- Profile section -->
      <div class="flex flex-col items-center mb-10">
        <div class="w-24 h-24 mt-14 rounded-full overflow-hidden border-4 border-teal-400">
          <img :src="`${baseUrl}/images/placeholder-img.jpg`" alt="Profile" class="w-full h-full object-cover rounded-full">
        </div> 
        <!-- <img :src="authUser.avatar || 'default-avatar.png'" alt="Profile" class="w-16 h-16 rounded-full mb-2"> -->
        <span class="text-lg font-semibold text-gray-700">@{{ authUser.name }}</span>
      </div>

      <nav class="ml-12">
        <router-link to="/post/create" class="sidebar-link">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-xl">Create Post</p>
        </router-link>
        
        <router-link to="/" class="sidebar-link">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p class="text-xl">Newsfeed</p>
        </router-link>
        
        <router-link to="/dashboard" class="sidebar-link">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="text-xl">My Posts</p>
        </router-link>
        
        <router-link to="/favorites" class="sidebar-link">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
         <p class="text-xl">Favorites</p>
        </router-link>
      </nav>

      <!-- Settings and Logout -->
      <div class="absolute bottom-8 ml-12 -space-y-3 ">
        <router-link to="/settings" class="sidebar-link">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p class="text-xl">Settings</p>
        </router-link>
        <button @click="handleLogout" class="sidebar-link text-red-500 hover:text-red-700 w-full text-left text-3xl">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <p class="text-xl">Logout</p>
        </button>
      </div>
    </div>
  </aside>
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

<style scoped>
.sidebar-link {
  @apply flex items-center text-lg font-semibold text-gray-700 hover:text-teal-600 transition-colors duration-300 p-3 rounded-lg hover:bg-teal-50;
}

.router-link-active {
  @apply bg-teal-50 text-teal-600;
}
</style>