<template>
    <div>
      <h2>Create New Post</h2>
      <form @submit.prevent="createPost">
        <input v-model="newPost.title" placeholder="Title" required>
        <input v-model="newPost.content" placeholder="Content" required>
        <button type="submit">Create Post</button>
      </form>
  
      <h2>Posts</h2>
      <ul v-if="posts.length">
        <li v-for="post in posts" :key="post.id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.content }}</p>
          <button @click="deletePost(post.id)">Delete</button>
        </li>
      </ul>
      <p v-else>No posts available.</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { authClient } from '@/store/AuthStore';
  
  const posts = ref([]);
  const newPost = ref({ title: '', content: '' });
  
  const fetchPosts = async () => {
    try {
      const response = await authClient.get('/api/posts');
      posts.value = response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  
  const createPost = async () => {
    try {
      await authClient.post('/api/posts', newPost.value);
      newPost.value = { title: '', content: '' };
      await fetchPosts(); // Refresh the post list
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const deletePost = async (id) => {
  try {
    await authClient.delete(`/api/posts/${id}`);
    await fetchPosts(); // Aktualisiere die Liste nach dem Löschen
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};
  
  onMounted(fetchPosts);
  </script>