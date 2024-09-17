<script setup>
import ShowDate from '../components/ShowDate.vue';
import Footer from '../components/Footer.vue';
import Header from '../components/Header.vue';
import LeftSidebar from "../components/LeftSidebar.vue";
import RightSidebar from "../components/RightSidebar.vue";
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { authClient, useAuthStore } from '@/store/AuthStore';
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { authUser } = storeToRefs(useAuthStore());
const route = useRoute();
const router = useRouter();
const post = ref(null);
const isLoading = ref(true);
const error = ref(null);

const getPost = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const res = await authClient.get(`/api/posts/${route.params.id}`);
    post.value = res.data;
  } catch (err) {
    console.error('Error fetching post:', err);
    error.value = 'Failed to load the post. Please try again.';
  } finally {
    isLoading.value = false;
  }
};

const deletePost = async (id) => {
  try {
    await authClient.delete(`/api/posts/${id}`);
    router.push({ name: 'dashboard' });
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};

onMounted(getPost);
</script>

<template>
  <div class="bg-gradient-to-r from-blue-100 to-green-100 min-h-screen font-body">
    <Header />
    <div class="flex">
      <LeftSidebar />

      <div class="flex-grow container mx-auto px-4 py-8 w-3/5">
        <div class="max-w-2xl mx-auto mt-20">
          <div v-if="isLoading" class="text-center text-gray-500 text-xl">
            Loading post...
          </div>
          
          <div v-else-if="error" class="text-center text-red-500 text-xl">
            {{ error }}
          </div>
          
          <div v-else-if="post" class="bg-white rounded-2xl shadow-md p-8">
            <p class="text-gray-500 mb-2">Tweet from <ShowDate :date="post.created_at" /></p>
            <p class="text-xl text-teal-600 font-semibold mb-4">Posted by @{{ authUser.name }}</p>
            <h1 class="text-3xl font-bold mb-4 text-teal-800">{{ post.title }}</h1>
            <p class="text-gray-700 text-xl mb-8">{{ post.content }}</p>
            <div class="flex space-x-4">
              <RouterLink :to="{ name: 'post-edit', params: { id: post.id } }" class="text-blue-500 hover:underline">
                <button class="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-300">
                  Edit
                </button>
              </RouterLink>
              <button @click="deletePost(post.id)" 
                class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          </div>
          
          <div v-else class="text-center text-gray-500 text-xl">
            No post found.
          </div>
        </div>
      </div>

      <RightSidebar />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

.font-body {
  font-family: 'Quicksand', sans-serif;
}
</style>