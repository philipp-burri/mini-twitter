<template>
  <header class="bg-white shadow-md p-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-3xl font-bold text-black">Mini-Twitter</h1>
      <nav class="space-x-4">
        <router-link to="/dashboard" class="text-black hover:text-black transition-colors duration-200">
          Meine Tweets
        </router-link>
        <router-link to="/create" class="inline-block">
          <button class="bg-blue-500 text-white px-4 py-2 rounded-full">
            + Tweet erstellen
          </button>
        </router-link>
      </nav>
    </div>
  </header>
</template>