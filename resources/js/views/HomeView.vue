<template>
  <div class="bg-gradient-to-r from-teal-50 to-green-50 min-h-screen font-body">
    <Header />
    <div class="flex justify-between">
      <LeftSidebar class="fixed left-0 top-0 h-screen w-64" />

      <!-- Main content -->
      <div class="flex-grow max-w-2xl mx-auto px-4 py-8">
        <div class="mt-12">
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

          <ul v-if="filteredPosts.length" class="space-y-4">
            <li v-for="post in filteredPosts" :key="post.id" class="bg-white rounded-3xl p-6 shadow-sm hover:shadow-sm hover:cursor-pointer">
              <div class="flex flex-row justify-between items-center">
                <p class="text-xl mb-1 text-teal-600 font-semibold">@{{ post.user ? post.user.name : 'Unknown User' }}</p>
                <p class="text-right text-sm text-gray-500"><ShowDate :date="post.created_at" /></p>
              </div>
              <h3 class="text-2xl font-bold mb-2 break-words text-teal-800">{{ post.title }}</h3>
              <p class="text-gray-700 mb-4 break-words">{{ post.content }}</p>
              <div class="flex justify-between items-center">
                <div class="flex space-x-4">
                  <button @click="likePost(post.id)" class="flex items-center text-gray-500 hover:text-red-500 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{{ post.likes || 0 }}</span>
                  </button>
                  <button @click="commentPost(post.id)" class="flex items-center text-gray-500 hover:text-blue-500 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>{{ post.comments?.length || 0 }}</span>
                  </button>
                  <button @click="favoritePost(post.id)" class="flex items-center text-gray-500 hover:text-yellow-500 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <span>{{ post.favorites || 0 }}</span>
                  </button>
                </div>
                <RouterLink :to="{ name: 'single-post', params: { id: post.id } }" class="text-blue-500 hover:underline">
                  <button class="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-400 transition-colors duration-300">
                    View Tweet
                  </button>
                </RouterLink>
              </div>
            </li>
          </ul>

          <p v-else class="text-center text-gray-500 text-xl mt-12">No posts available. Time to create some magic! ✨</p>
        </div>
      </div>

      <RightSidebar class="" />
    </div>

    <!-- <Footer /> -->
  </div>
</template>

<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import ShowDate from '../components/ShowDate.vue';
import LeftSidebar from '../components/LeftSidebar.vue';
import RightSidebar from '../components/RightSidebar.vue';
import PostCreate from '../components/PostCreate.vue';

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
    try {
        const res = await authClient.get(`/api/posts`)
        posts.value = res.data
        console.log('Fetched posts:', res.data)
    } catch (error) {
        console.error('Error fetching posts:', error)
    }
}

onMounted(async () => {
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
    // Implement your like logic here
}

const commentPost = (postId) => {
    console.log(`Commented on post ${postId}`);
    // Implement your comment logic here
}

const favoritePost = (postId) => {
    console.log(`Favorited post ${postId}`);
    // Implement your favorite logic here
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

.font-body {
  font-family: 'Quicksand', sans-serif;
}
</style>