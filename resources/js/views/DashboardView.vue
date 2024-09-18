<template>
  <div class="bg-gradient-to-r from-teal-50 to-green-50 min-h-screen font-body">
    <Header />
    <div class="container mx-auto px-4 py-8 flex">
      <LeftSidebar />
      
      <div class="flex-grow mx-4 w-3/5">
        <div class="max-w-3xl mx-auto mb-8 mt-20">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-3xl font-bold text-teal-700">My Tweets</h2>
          </div>
        </div>
        
        <ul v-if="posts.length" class="max-w-3xl mx-auto space-y-6">
          <li v-for="post in posts" :key="post.id" class="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div class="flex flex-row justify-between items-center">
              <p class="text-xl mb-1 text-teal-600 font-semibold">@{{ authUser.name }}</p>
              <p class="text-right text-sm text-gray-500"><ShowDate :date="post.created_at" /></p>
            </div>
            <h3 class="text-2xl font-bold mb-2 break-words text-teal-800">{{ post.title }}</h3>
            <p class="text-gray-700 mb-4 break-words">{{ post.content }}</p>
            <div class="flex justify-between items-center">
              <RouterLink :to="{ name: 'single-post', params: { id: post.id } }" class="text-blue-500 hover:underline">
                <button class="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-400 transition-colors duration-300">
                  View Tweet
                </button>
              </RouterLink>
              <button @click="likePost(post.id)" class="flex items-center text-gray-500 hover:text-red-500 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{{ post.likes || 0 }}</span>
              </button>
            </div>
          </li>
        </ul>
        <p v-else class="text-center text-gray-500 text-xl mt-12">No posts available. Time to create some magic! ✨</p>
      </div>

      <RightSidebar />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue';
import ShowDate from '../components/ShowDate.vue';
import Footer from '../components/Footer.vue';
import LeftSidebar from '../components/LeftSidebar.vue';
import RightSidebar from '../components/RightSidebar.vue';
import { ref, onMounted } from 'vue'
import { storeToRefs } from "pinia";
import { useAuthStore, authClient } from "@/store/AuthStore";
import router from "@/router";

const { authUser } = storeToRefs(useAuthStore());
const { logout } = useAuthStore();

// Get Posts
const posts = ref([])

const getPosts = async () => {
    try {
        const res = await authClient.get(`/api/posts/my-posts`)
        posts.value = res.data.data
        console.log('Fetched posts:', res.data) // Zum Debuggen
    } catch (error) {
        console.error('Error fetching posts:', error)
    }
}

const refreshPosts = () => {
    getPosts()
}

onMounted(async () => {
    getPosts()
})

// Login
const handleLogout = () => {
    logout();
    router.push("/login");
};

// Like function
const likePost = (postId) => {
    console.log(`Liked post ${postId}`);
    // Implement your like logic here
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

.font-body {
  font-family: 'Quicksand', sans-serif;
}
</style>