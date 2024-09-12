<template>
    <div>
      <p>Feed from</p>
      <h2> {{ authUser.name }}</h2>
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
  const { authUser } = storeToRefs(useAuthStore());
  import { storeToRefs } from "pinia";
  import { useAuthStore } from "@/store/AuthStore";

  
  const posts = ref([]);

  
  const fetchPosts = async () => {
    try {
      const response = await authClient.get('/api/posts');
      posts.value = response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const deletePost = async (id) => {
  try {
    await authClient.delete(`/api/posts/${id}`);
    await fetchPosts();
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};
  
  
  onMounted(fetchPosts);
  </script>