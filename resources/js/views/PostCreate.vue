<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

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
    <Header />
    <div class="flex justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-2xl px-4 py-8">
        
        <h2 class="text-3xl font-bold mb-4 mt-24">Create New Post</h2>
        <p class="text-2xl text-gray-600 font-normal mb-6">What do you want to share?</p>
        
        <div v-if="alertMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          {{ alertMessage }}
        </div>

        <form @submit.prevent="handleCreate" class="bg-white shadow-md rounded px-8 pt-11 pb-6">
          <div class="mb-4">
            
            <label for="title" class="block text-gray-700 text-2xl font-normal mb-2">Title</label>
            <input 
              id="title"
              v-model="newPost.title" 
              placeholder="Enter title" 
              required
              class="min-h-[64px] w-full border rounded py-2 px-3 text-2xl text-gray-700"
            >
          </div>

          <div class="mb-6">
            <label for="content" class="block text-gray-700 text-2xl font-normal mb-2">Content</label>
            <textarea 
              id="content"
              v-model="newPost.content" 
              placeholder="Enter content" 
              required
              class="min-h-[152px] w-full border rounded text-2xl py-2 px-3 text-gray-700"
            ></textarea>
          </div>

          <div class="flex items-center justify-between mt-8">
            <button 
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create tweet
            </button>
          </div>

        </form>
      </div>
    </div>

    <Footer />

  </template>