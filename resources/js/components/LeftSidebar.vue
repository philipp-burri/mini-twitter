<template>
    <div class="w-1/5 mt-[12rem] pl-[5rem] sticky">
      <div class="bg-white rounded-2xl shadow-lg p-8 border border-white">
        <nav class="space-y-6 flex-col justify-center ">
          <router-link to="/post/create" class="flex max-w-2xl items-center text-2xl font-semibold text-gray-700 hover:text-teal-600 transition-colors duration-300 p-3 rounded-lg hover:bg-teal-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Create Post
          </router-link>
          
          <router-link to="/" class="flex items-center text-2xl font-semibold text-gray-700 hover:text-teal-600 transition-colors duration-300 p-3 rounded-lg hover:bg-teal-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Newsfeed
          </router-link>
          
          <router-link to="/dashboard" class="flex items-center text-2xl font-semibold text-gray-700 hover:text-teal-600 transition-colors duration-300 p-3 rounded-lg hover:bg-teal-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            My Posts
          </router-link>
          
          <router-link to="/favorites" class="flex items-center text-2xl font-semibold text-gray-700 hover:text-teal-600 transition-colors duration-300 p-3 rounded-lg hover:bg-teal-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Favorites
          </router-link>
        </nav>
      </div>
    </div>
  </template>
  
  <script setup>
  // No script needed for this component
  </script>
  
  <style scoped>
  .router-link-active {
    @apply bg-teal-50 text-teal-600;
  }
  </style>