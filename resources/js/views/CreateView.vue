<script setup>
import Header from "../components/Header.vue";
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { authClient } from '@/store/AuthStore';

const router = useRouter();
const newPost = ref({ name: '', title: '', content: '' });

const createPost = async () => {
    try {
      await authClient.post('/api/posts', newPost.value);
      newPost.value = { name: '', title: '', content: '' };
      router.push('/dashboard');
      /* await fetchPosts(); */
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

</script>

<template>
<Header />
<h2>Create New Post</h2>
<p>What do you want to share?</p>
<form @submit.prevent="createPost">
  <input v-model="newPost.title" placeholder="Title" required>
  <input v-model="newPost.content" placeholder="Content" required>
  <button type="submit">Create tweet</button>
  

</form>
</template>
