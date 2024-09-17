<template>
    <div class="w-1/5 mt-[8rem] pl-24">
        
      <nav class="flex-col justify-center w-full mb-">
        <button class="">
        <router-link to="/post/create" class="flex items-center text-3xl hover:text-teal-600 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Tweet erstellen
        </router-link>
        </button>
        <div class="space-y-6 bg-white p-6 border rounded-2xl mt-7">
        <router-link to="/" class="flex items-center text-3xl hover:text-teal-600 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          Newsfeed
        </router-link>
        <router-link to="/dashboard" class="flex items-center text-3xl hover:text-teal-600 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Meine Tweets
        </router-link>
    </div>
      </nav>
    </div>
  </template>
  