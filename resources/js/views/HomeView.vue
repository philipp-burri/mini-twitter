<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import ShowDate from '../components/ShowDate.vue';

import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from "pinia";
import { useAuthStore, authClient } from "@/store/AuthStore";
import router from "@/router";

import { format, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';

const { authUser } = storeToRefs(useAuthStore());
const { logout } = useAuthStore();


// Get Posts
const posts = ref([])
const filterOption = ref('recent')
const getPosts = async () => {
    const res = await authClient.get(`/api/posts`)
    posts.value = res.data
}
onMounted(async ()=>{
    getPosts()
})

// posts filtern
const filteredPosts = computed(() => {
    if (filterOption.value === 'recent') {
        return [...posts.value].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    } else {
        return [...posts.value].sort((a, b) => (b.likes || 0) - (a.likes || 0))
    }
})

// Login
const handleLogout = () => {
    logout();
    router.push("/login");
};

// Like and Dislike functions
const likePost = (postId) => {
    console.log(`Liked post ${postId}`);
    // Implement your like logic here
}

const dislikePost = (postId) => {
    console.log(`Disliked post ${postId}`);
    // Implement your dislike logic here
}
</script>

<template>
  <Header />
  <div class="bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto mt-20">
        <!-- Filter -->
        <div class="mb-4">
          <label for="filter" class="mr-2">Filter by:</label>
          <select v-model="filterOption" id="filter" class="border rounded p-1 custom-select">
            <option value="recent">Most Recent</option>
            <option value="likes">Most Likes</option>
          </select>
        </div>

        <ul v-if="filteredPosts.length" class="space-y-6">
          <li v-for="post in filteredPosts" :key="post.id" class="border border-gray-200 bg-white rounded-lg p-6 shadow-sm">
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
                Like ({{ post.likes || 0 }})
              </button>

              <button @click="dislikePost(post.id)" class="flex items-center text-gray-500 hover:text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                </svg>
                Dislike
              </button>

            </div>
          </li>
        </ul>

        <p v-else class="text-center text-gray-500">No posts available.</p>
        
      </div>
    </div>
  </div>
  <Footer />
</template>

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