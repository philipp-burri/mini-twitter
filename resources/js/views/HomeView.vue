<template>
  <div class="bg-gradient-to-r from-blue-100 to-green-100 min-h-screen font-body">
    <Header />
    <div class="flex">
      <LeftSidebar />

      <!-- Main content -->
      <div class="flex-grow container mx-auto px-4 py-8 w-3/5">
        <div class="max-w-2xl mx-auto mt-20">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-3xl font-bold text-teal-700">Feeds</h2>
            <div class="flex space-x-2">
              <button 
                v-for="option in filterOptions"
                :key="option"
                @click="filterOption = option" 
                :class="['px-4 py-2 rounded-full transition-all duration-300 transform', filterOption === option ? 'bg-teal-500 text-white' : 'bg-white text-teal-500 border-2 border-teal-500']"
              >
                {{ option.charAt(0).toUpperCase() + option.slice(1) }}
              </button>
            </div>
          </div>

          <ul v-if="filteredPosts.length" class="space-y-8">
            <li v-for="post in filteredPosts" :key="post.id" class="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div class="flex flex-row justify-between items-center">
                <p class="text-xl mb-1 text-teal-600 font-semibold">@{{ authUser.name }}</p>
                <p class="text-right text-sm text-gray-500"><ShowDate :date="post.created_at" /></p>
              </div>
              <h3 class="text-2xl font-bold mb-2 break-words text-teal-800">{{ post.title }}</h3>
              <p class="text-gray-700 mb-4 break-words">{{ post.content }}</p>
              <div class="flex space-x-4">
                <button @click="likePost(post.id)" class="flex items-center text-gray-500 hover:text-teal-600 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  ({{ post.likes || 0 }})
                </button>
                <button @click="dislikePost(post.id)" class="flex items-center text-gray-500 hover:text-red-500 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                  </svg>
                  ({{ post.dislikes || 0 }})
                </button>
              </div>
            </li>
          </ul>

          <p v-else class="text-center text-gray-500 text-xl mt-12">No posts available. Time to create some magic! ✨</p>
        </div>
      </div>

      <RightSidebar />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import ShowDate from '../components/ShowDate.vue';
import LeftSidebar from '../components/LeftSidebar.vue';
import RightSidebar from '../components/RightSidebar.vue';

import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from "pinia";
import { useAuthStore, authClient } from "@/store/AuthStore";

import { de } from 'date-fns/locale';
import { parseISO, compareDesc } from 'date-fns'

const { authUser } = storeToRefs(useAuthStore());

const sortByRecent = (posts) => {
  return posts.slice().sort((a, b) => compareDesc(parseISO(a.created_at), parseISO(b.created_at)))
}

const posts = ref([])
const filterOption = ref('recent')
const filterOptions = ['recent', 'popular', 'friends']

const getPosts = async () => {
    const res = await authClient.get(`/api/posts`)
    posts.value = res.data
}
onMounted(async ()=>{
    getPosts()
})

const filteredPosts = computed(() => {
  switch(filterOption.value) {
    case 'recent':
      return sortByRecent(posts.value)
    case 'popular':
      return [...posts.value].sort((a, b) => (b.likes || 0) - (a.likes || 0))
    case 'friends':
      return posts.value
    default:
      return posts.value
  }
})

const likePost = (postId) => {
    console.log(`Liked post ${postId}`);
}

const dislikePost = (postId) => {
    console.log(`Disliked post ${postId}`);
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

.font-body {
  font-family: 'Quicksand', sans-serif;
}
</style>