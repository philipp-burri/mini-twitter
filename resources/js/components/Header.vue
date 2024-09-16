<template>
  <header class="bg-white shadow-md w-full h-[104px] flex items-center">
    <div class="w-full mx-[9.75rem] flex justify-between items-center">
      <router-link to="/" class="text-black hover:text-blue-500 transition-colors duration-200">
        <h1 class="text-2xl font-black">MINI-TWITTER</h1>
      </router-link>
      <nav class="flex items-center space-x-12">
        <router-link to="/dashboard" class="text-2xl font-normal text-black hover:text-black hover:underline">
          Meine Tweets
        </router-link>
        <router-link to="/post/create" class="inline-block">
          <button class="text-2xl bg-blue-500 font-normal text-white px-4 py-2 rounded-full">
            + Tweet erstellen
          </button>
        </router-link>
      </nav>
    </div>
  </header>
</template>


