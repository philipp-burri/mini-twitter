<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

import { ref, onMounted } from 'vue';
import { authClient } from '@/store/AuthStore';
import { useRoute, useRouter } from 'vue-router';



const route = useRoute();
const router = useRouter();
const post = ref({});
const title = ref('');  // Fügen Sie diese Zeile hinzu
const content = ref('');  // Fügen Sie diese Zeile hinzu
const post_id = route.params.id;

const getPost = async (id) => {
    try {
        const res = await authClient.get(`/api/posts/${id}`);
        post.value = res.data;
        title.value = res.data.title;
        content.value = res.data.content;
    } catch (error) {
        console.error('Error fetching post:', error);
    }
};

const updatePost = async () => {
    try {
        const res = await authClient.put(`/api/posts/${post_id}`, {
            title: title.value,
            content: content.value
        });

        if(res.status ==200) {
          router.push({name: "dashboard"})
        }
        } catch (error) {
        console.error('Error updating post:', error);
    }
};

onMounted(() => {

  getPost(post_id);
});
</script>


<template>
  <Header />
  <div class="flex justify-center bg-gray-100 min-h-screen p-4">
    <div class="w-full max-w-2xl">
      <h2 class="mt-20 text-3xl font-bold">Edit Tweet</h2>
      <div class="bg-white rounded-sm mt-11">
        <div class="p-6 sm:p-10">
          <form @submit.prevent="updatePost">
            <div class="mb-6">
              <label for="title" class="font-normal text-gray-600 block mb-1 text-2xl">Title</label>
              <input 
                type="text" 
                id="title" 
                v-model="title" 
                class="w-full font-normal px-3 py-2 border text-2xl border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="mt-8">
              <label for="content" class="font-normal text-gray-600  block mb-1 text-2xl">Content</label>
              <textarea 
                id="content" 
                v-model="content" 
                class="w-full font-normal px-3 py-2 border text-2xl border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                rows="4"
              ></textarea>
            </div>
            <div>
              <button 
                type="submit"
                class="mt-8 sm:w-auto bg-blue-500 text-white text-sm px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
              >
                Update Tweet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

<Footer />

</template>