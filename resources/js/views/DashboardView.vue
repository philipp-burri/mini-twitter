<template>
  <Header />

  <!-- Feed from anzeige -->
  <div class="bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto mb-8 my-20">
        <p class="text-gray-600">Feed from</p>
        <h2 class="mb-9 text-3xl font-bold text-black break-words">{{ authUser.name }}</h2>
      </div>


      <!-- View tweet -->
      <ul v-if="posts.length" class="max-w-2xl mx-auto">
        <li v-for="post in posts" :key="post.id" class="mb-4 border border-gray-200 bg-white rounded-lg px-6 pt-4 pb-7">
          <p class="text-right text-sm"><ShowDate :date="post.created_at" /></p>
          <h3 class="text-xl font-semibold mb-2 break-words">{{ post.title }}</h3>
          <p class="text-gray-700 mb-4 break-words">{{ post.content }}</p>
          <div class="flex justify-between items-center">
            
            
          <RouterLink :to="{ name: 'single-post', params: { id: post.id } }" class="text-blue-500 hover:underline">
              <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-opacity-90">
                View Tweet
              </button>
          </RouterLink>


            <!-- Like Button -->
            <div class="flex space-x-4">
              <button @click="likePost(post.id)" class="flex items-center text-gray-500 hover:text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                Like
              </button>


              <!-- Dislike Button -->
              <button @click="dislikePost(post.id)" class="flex items-center text-gray-500 hover:text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                </svg>
                Dislike
              </button>

            </div>
          </div>
        </li>
      </ul>
      <p v-else class="text-center text-gray-500">No posts available.</p>
    </div>
  </div>

  <Footer />

</template>

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