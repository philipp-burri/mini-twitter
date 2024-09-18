<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import LeftSidebar from "../components/LeftSidebar.vue";
import RightSidebar from "../components/RightSidebar.vue";
import { ref, onMounted } from 'vue';
import { authClient } from '@/store/AuthStore';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const post = ref({});
const title = ref('');
const content = ref('');
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
        if(res.status == 200) {
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
  <div class="bg-gradient-to-r from-teal-50 to-green-50 min-h-screen font-body">
    <Header />
    <div class="flex">
      <LeftSidebar />

      <div class="flex-grow container mx-auto px-4 py-8 w-3/5">
        <div class="max-w-2xl mx-auto mt-20">
          <h2 class="text-3xl font-bold mb-6 text-teal-700">Edit Tweet</h2>
          <div class="bg-white rounded-2xl shadow-md">
            <div class="p-8">
              <form @submit.prevent="updatePost">
                <div class="mb-6">
                  <label for="title" class="block text-gray-700 text-2xl font-normal mb-2">Title</label>
                  <input 
                    type="text" 
                    id="title" 
                    v-model="title" 
                    class="w-full px-3 py-2 border text-2xl border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div class="mb-6">
                  <label for="content" class="block text-gray-700 text-2xl font-normal mb-2">Content</label>
                  <textarea 
                    id="content" 
                    v-model="content" 
                    class="w-full px-3 py-2 border text-2xl border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" 
                    rows="6"
                  ></textarea>
                </div>
                <div>
                  <button 
                    type="submit"
                    class="bg-teal-500 text-white text-xl px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors duration-300"
                  >
                    Update Tweet
                  </button>
                </div>
              </form>
            </div>
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