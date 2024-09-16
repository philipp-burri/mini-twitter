<script setup>
import ShowDate from '../components/ShowDate.vue';
import Footer from '../components/Footer.vue';

import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { authClient } from '@/store/AuthStore';
import Header from '../components/Header.vue';
import { format, parseISO } from 'date-fns'; // Importieren Sie diese Funktionen
import { de } from 'date-fns/locale'; // Importieren Sie die deutsche Lokalisierung, falls gewünscht



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
    <Header />
    <div class="bg-gray-100 min-h-screen">
  <div class="container mx-auto max-w-2xl px-4 py-8">
 
    
    <div v-if="isLoading" class="text-center text-gray-500">
      Loading post...
    </div>
    
    <div v-else-if="error" class="text-center text-red-500">
      {{ error }}
    </div>
    
    <div class="mt-20" v-else-if="post">
      <p>Tweet from <ShowDate :date="post.created_at" /></p>
      <h1 class="text-2xl font-bold mt-8">{{ post.title }}</h1>
      <p class="text-gray-700 mt-3 mb-[3.25rem]">{{ post.content }}</p>
      <RouterLink :to="{ name: 'post-edit', params: { id: post.id } }" class="text-blue-500 hover:underline">
        <button class="bg-black text-white px-4 py-2 mr-1 rounded-xl ">
          Edit
        </button>
      </RouterLink>
      <button @click="deletePost(post.id)" 
        class="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-500 transition-colors"
        >
          Delete
        </button>
    </div>
    
    <div v-else class="text-center text-gray-500">
      No post found.
    </div>
  </div>
</div>

<Footer />

</template>