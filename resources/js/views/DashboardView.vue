<script setup>
import Header from '../components/Header.vue';
import ShowDate from '../components/ShowDate.vue';
import Footer from '../components/Footer.vue';

import { ref, onMounted } from 'vue'
import { storeToRefs } from "pinia";
import { useAuthStore, authClient } from "@/store/AuthStore";
import router from "@/router";
const { authUser } = storeToRefs(useAuthStore());
const { logout } = useAuthStore();


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
      <div class="max-w-2xl mx-auto mb-8 my-20">
        <p class="text-gray-600">Feed from</p>
        <h2 class="mb-9 text-3xl font-bold text-black break-words">{{ authUser.name }}</h2>
      </div>
      <ul v-if="posts.length" class="max-w-2xl mx-auto">
        <li v-for="post in posts" :key="post.id" class="mb-4 border border-gray-200 bg-white rounded-lg px-6 pt-4 pb-7">
          <p class="text-right text-sm"><ShowDate :date="post.created_at" /></p>
          <h3 class="text-xl font-semibold mb-2 break-words">{{ post.title }}</h3>
          <p class="text-gray-700 mb-4 break-words">{{ post.content }}</p>
          <RouterLink :to="{ name: 'single-post', params: { id: post.id } }" class="text-blue-500 hover:underline">
            <button class="bg-black text-white px-4 py-2 rounded-md hover:bg-opacity-90">
              View Tweet
            </button>
          </RouterLink>
        </li>
      </ul>
      <p v-else class="text-center text-gray-500">No posts available.</p>
    </div>
  </div>

  <Footer />
  
  </template>