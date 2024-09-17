<template>
  <div class="rounded-2xl p-4 mb-8">
    <form @submit.prevent="handleCreate" class="space-y-4">
      <div class="relative">
        <textarea 
          v-model="newPost.content" 
          placeholder="Share something" 
          required
          class="w-full border border-gray-300 rounded-3xl px-3 py- pr-24 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
          rows="2"
        ></textarea>
        <button 
          type="submit"
          class="text-xl bg-teal-500 text-white px-10 py-2 rounded-3xl hover:bg-teal-600 transition-colors duration-300"
        >
          Post
        </button>
      </div>
    </form>
  </div>
</template>
  
  <script setup>
  import { ref } from 'vue';
  import { authClient } from '@/store/AuthStore';
  
  const newPost = ref({ title: '', content: '' });
  const emit = defineEmits(['post-created']);
  
  const handleCreate = async () => {
    try {
      await authClient.post('/api/posts', newPost.value);
      emit('post-created');
      newPost.value = { title: '', content: '' };
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
  </script>