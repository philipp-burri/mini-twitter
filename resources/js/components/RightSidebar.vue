<template>
  <div class="w-1/5 pr-[5rem] mt-[5rem]">
    <!-- Freundesliste -->
    <div class="bg-white rounded-2xl shadow-sm p-6 mb-6 pt-7 sticky top-2">
      <h2 class="text-2xl font-bold text-teal-700 mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Friends
      </h2>
      <ul class="space-y-4">
        <li v-for="friend in friends" :key="friend.id" class="flex items-center bg-teal-50 rounded-xl p-3 transition-all duration-300 hover:bg-teal-100 hover:shadow-md">
          <img :src="friend.avatar || 'default-avatar.png'" alt="Friend's avatar" class="w-12 h-12 rounded-full mr-3 border-2 border-teal-300">
          <div>
            <span class="text-sm font-semibold text-teal-800">{{ friend.name }}</span>
          </div>
        </li>
      </ul>
      <button 
        v-if="friends.length >= 5" 
        @click="showAllFriends" 
        class="w-full mt-4 bg-teal-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-teal-600 transition-colors duration-300"
      >
        View All Friends
      </button>
    </div>

    <!-- Alle Benutzer -->
    <div class="bg-white rounded-2xl shadow-sm p-6 mb-6 pt-7">
      <h2 class="text-2xl font-bold text-teal-700 mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        All Users
      </h2>
      <ul class="space-y-4">
        <li v-for="user in users" :key="user.id" class="flex items-center bg-teal-50 rounded-xl p-3 transition-all duration-300 hover:bg-teal-100 hover:shadow-md">
          <img :src="user.avatar || 'default-avatar.png'" alt="User's avatar" class="w-12 h-12 rounded-full mr-3 border-2 border-teal-300">
          <div class="flex flex-col">
            <span class="text-sm font-semibold text-teal-800">{{ user.name }}</span>
            <button class="border rounded-xl bg-teal-500 px-1 py-2 text-sm text-white" 
                    type="submit"
                    @click="sendFriendRequest(user.id)"
                    >Add Friend
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from "pinia";
import { useAuthStore, authClient} from "@/store/AuthStore";  

import router from "@/router";

const { authUser } = storeToRefs(useAuthStore());
const { logout } = useAuthStore();
const baseUrl = import.meta.env.VITE_BASE_URL;

const friends = ref([]);
const users = ref([])

const getFriends = async () => {
  try {
    // Hier sollten Sie Ihre API-Anfrage implementieren, um die Freundesliste zu erhalten
    // Beispiel:
    // const response = await authClient.get('/api/friends');
    // friends.value = response.data;

    // Für dieses Beispiel verwenden wir Dummy-Daten
    friends.value = [
      { id: 1, name: 'John Doe', avatar: 'john.jpg', status: 'Online' },
      { id: 2, name: 'Jane Smith', avatar: 'jane.jpg', status: 'Away' },
      { id: 3, name: 'Alice Johnson', avatar: 'alice.jpg', status: 'Offline' },
      { id: 4, name: 'Bob Brown', avatar: 'bob.jpg', status: 'Online' },
      { id: 5, name: 'Charlie Davis', avatar: 'charlie.jpg', status: 'Busy' },
    ];
  } catch (error) {
    console.error('Error fetching friends:', error);
  }
};

const showAllFriends = () => {
  router.push('/friendlist');
};

/* const getFriends = async () => {
    try {
        const response = await authClient.get('/api/friends');
        friends.value = response.data;
      } catch (error) {
        console.error('Error fetching friends:', error)
    }
 */

const getUsers = async () => {
    try {
        const res = await authClient.get(`/api/users`)
        users.value = res.data
        console.log('Fetched posts:', res.data)
    } catch (error) {
        console.error('Error fetching posts:', error)
    }
}

const sendFriendRequest = async (userId) => {
  try{
    const response = await authClient.post(`/api/friends/add/${userId}`);
    console.log('Friend Request sent')

  } catch{
    console.error('Error sending Friendrequest')
  }
}


const handleLogout = () => {
  logout();
  router.push("/login");
};

onMounted(() => {
  getFriends();
  getUsers();
});
</script>