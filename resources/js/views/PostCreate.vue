<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import LeftSidebar from "../components/LeftSidebar.vue";
import RightSidebar from "../components/RightSidebar.vue";
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { authClient } from '@/store/AuthStore';

const router = useRouter();
const newPost = ref({ name: '', title: '', content: '' });
const alertMessage = ref('');

const handleCreate = async () => {
    try {
      await authClient.post('/api/posts', newPost.value);
      newPost.value = { name: '', title: '', content: '' };
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating post:', error);
      alertMessage.value = 'Error creating post. Please try again.';
    }
  };
</script>

<template>
  <div class="bg-gradient-to-r from-teal-50 to-green-50 min-h-screen font-body">
    <Header />
    <div class="flex">
      <LeftSidebar />

      <div class="flex-grow container mx-auto px-4 py-8 w-3/5">
        <div class="max-w-2xl mx-auto mt-20">
          <h2 class="text-3xl font-bold mb-4 text-teal-700">Create New Post</h2>
          <p class="text-2xl text-gray-600 font-normal mb-6">What do you want to share?</p>
          
          <div v-if="alertMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            {{ alertMessage }}
          </div>

          <form @submit.prevent="handleCreate" class="bg-white shadow-md rounded-2xl px-8 pt-11 pb-6">
            <div class="mb-4">
              <label for="title" class="block text-gray-700 text-2xl font-normal mb-2">Title</label>
              <input 
                id="title"
                v-model="newPost.title" 
                placeholder="Enter title" 
                required
                class="min-h-[64px] w-full border rounded-lg py-2 px-3 text-2xl text-gray-700"
              >
            </div>
            <div class="mb-6">
              <label for="content" class="block text-gray-700 text-2xl font-normal mb-2">Content</label>
              <textarea 
                id="content"
                v-model="newPost.content" 
                placeholder="Enter content" 
                required
                class="min-h-[152px] w-full border rounded-lg text-2xl py-2 px-3 text-gray-700"
              ></textarea>
            </div>
            <div class="flex items-center justify-between mt-8">
              <button 
                type="submit"
                class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline text-xl transition duration-300"
              >
                Create tweet
              </button>
            </div>
          </form>
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