<template>
  <Header />
  <div class="bg-white min-h-screen flex">
    <!-- Left Sidebar -->
    <div class="w-1/5 bg-white pt-24 pl-24">
      <nav class="space-y-4 flex-col justify-center w-full">
        <router-link to="/newsfeed" class="flex items-center text-3xl hover:text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          Newsfeed
        </router-link>
        <router-link to="/dashboard" class="flex items-center text-3xl hover:text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Meine Tweets
        </router-link>
        <router-link to="/post/create" class="flex items-center text-3xl hover:text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Tweet erstellen
        </router-link>
      </nav>
    </div>

    <!-- Main content -->
    <div class="flex-grow container mx-auto px-4 py-8 w-4/5">
      <div class="max-w-2xl mx-auto mt-20">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-semibold">Feeds</h2>
          <div class="flex space-x-2">
            <button 
              @click="filterOption = 'recent'" 
              :class="['px-3 py-1 rounded', filterOption === 'recent' ? 'bg-blue-500 text-white' : 'bg-gray-200']"
            >
              Recent
            </button>
            <button 
              @click="filterOption = 'popular'" 
              :class="['px-3 py-1 rounded', filterOption === 'popular' ? 'bg-blue-500 text-white' : 'bg-gray-200']"
            >
              Popular
            </button>
            <button 
              @click="filterOption = 'friends'" 
              :class="['px-3 py-1 rounded', filterOption === 'friends' ? 'bg-blue-500 text-white' : 'bg-gray-200']"
            >
              Friends
            </button>
          </div>
        </div>

        <ul v-if="filteredPosts.length" class="space-y-6">
          <li v-for="post in filteredPosts" :key="post.id" class="border border-gray-200 bg-blue-50 rounded-2xl p-6 shadow-sm">
            <div class="flex flex-row justify-between items-center">
              <p class="text-xl mb-1 text-blue-500">@{{ authUser.name }}</p>
              <p class="text-right text-sm"><ShowDate :date="post.created_at" /></p>
            </div>
            <h3 class="text-xl font-semibold mb-2 break-words">{{ post.title }}</h3>
            <p class="text-gray-700 mb-4 break-words">{{ post.content }}</p>
            <div class="flex space-x-4">
              <button @click="likePost(post.id)" class="flex items-center text-gray-500 hover:text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                ({{ post.likes || 0 }})
              </button>
              <button @click="dislikePost(post.id)" class="flex items-center text-gray-500 hover:text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                </svg>
                ({{  post.dislikes || 0 }})
              </button>
            </div>
          </li>
        </ul>

        <p v-else class="text-center text-gray-500">No posts available.</p>
      </div>
    </div>

    <!-- Right Sidebar -->
    <div class="w-1/5 bg-white pr-24 pt-24">
      <div class="flex flex-col mb-6">
        <img :src="`${baseUrl}/images/placeholder-img.jpg`" alt="Profile" class="w-24 h-24 rounded-full mb-4">
        <h2 class="text-2xl font-semibold">{{ authUser.name }}</h2>
      </div>
      <nav class="space-y-4 flex-col justify-center">
        <router-link to="/friends" class="flex items-center text-2xl hover:text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Friends
        </router-link>
        <router-link to="/settings" class="flex items-center text-2xl hover:text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settings
        </router-link>
        <button @click="handleLogout" class="flex items-center text-2xl text-red-500 hover:text-red-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </nav>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import ShowDate from '../components/ShowDate.vue';

import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from "pinia";
import { useAuthStore, authClient } from "@/store/AuthStore";
import router from "@/router";

import { de } from 'date-fns/locale';
import { parseISO, compareDesc } from 'date-fns'

const { authUser } = storeToRefs(useAuthStore());
const { logout } = useAuthStore();
const baseUrl = import.meta.env.VITE_BASE_URL;

const sortByRecent = (posts) => {
  return posts.slice().sort((a, b) => compareDesc(parseISO(a.created_at), parseISO(b.created_at)))
}

const posts = ref([])
const filterOption = ref('recent')
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

const handleLogout = () => {
    logout();
    router.push("/login");
};

const likePost = (postId) => {
    console.log(`Liked post ${postId}`);
}

const dislikePost = (postId) => {
    console.log(`Disliked post ${postId}`);
}
</script>

<style scoped>
.custom-select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: none;
  padding-right: 1rem;
  background-color: white;
}
</style>