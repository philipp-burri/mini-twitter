<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from "pinia";
import { useAuthStore, authClient } from "@/store/AuthStore";
import router from "@/router";
const { authUser } = storeToRefs(useAuthStore());
const { logout } = useAuthStore();

import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

// Get Posts
const posts = ref([])

const getPosts = async () => {
    const res = await authClient.get(`/api/posts`)
    posts.value = res.data
}

onMounted(async ()=>{
    getPosts()
})

// Login
const handleLogout = () => {
    logout();
    router.push("/login");
};
</script>

<template>
  <Header />
  <div class="bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-8">
     <!--  <div class="flex flex-col justify-center items-center mb-8">
        <p class="text-2xl mb-2">Welcome, {{ authUser.name }}</p>
        <button @click="handleLogout" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200">Logout</button>
      </div> -->
      
      <div class="max-w-2xl mx-auto mt-20">
        <ul v-if="posts.length" class="space-y-6">
          <li v-for="post in posts" :key="post.id" class="border border-gray-200 bg-white rounded-lg p-6 shadow-sm">
            <h3 class="text-xl font-semibold mb-2 break-words">{{ post.title }}</h3>
            <p class="text-gray-700 mb-4 break-words">{{ post.content }}</p>
            <RouterLink :to="{ name: 'post-edit', params: { id: post.id } }" class="inline-block">
              <button class="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors duration-200">
                Edit
              </button>
            </RouterLink>
          </li>
        </ul>
        <p v-else class="text-center text-gray-500">No posts available.</p>
      </div>
    </div>
  </div>

  <Footer />

  </template>