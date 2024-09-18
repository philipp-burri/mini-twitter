<template>
    <div class="min-h-screen bg-gradient-to-r from-teal-50 to-green-50">
      <Header />
      <LeftSidebar />
      <div class="container mx-auto pt-20">
        
        <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md relative">
          <h1 class="text-3xl font-bold mb-6">Einstellungen</h1>
          

          <button @click="goBack" class="absolute top-7 right-7 text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          
          <div v-if="authUser">
            <div class="mb-6 flex justify-between items-center">
              <div>
                <h2 class="text-xl font-semibold">Benutzername</h2>
                <p>{{ authUser.name }}</p>
              </div>
              <button @click="editUsername" class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Ändern
              </button>
            </div>
      
            <div class="mb-6 flex justify-between items-center">
              <div>
                <h2 class="text-xl font-semibold">E-Mail</h2>
                <p>{{ authUser.email }}</p>
              </div>
              <button @click="editEmail" class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Ändern
              </button>
            </div>
      
            <div class="mb-6 flex justify-between items-center">
              <div>
                <h2 class="text-xl font-semibold">Passwort</h2>
                <p>••••••••</p>
              </div>
              <button @click="editPassword" class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Ändern
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>



  <script setup>
  import Header from '../components/Header.vue';
  import { ref, onMounted } from 'vue';
  import { useAuthStore } from '@/store/AuthStore';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
import LeftSidebar from '../components/LeftSidebar.vue';
  

  const router = useRouter();
  const authStore = useAuthStore();
  const { authUser } = storeToRefs(authStore);
  const error = ref(null);
  
  onMounted(async () => {
    try {
      if (!authUser.value) {
        await authStore.getAuthUser();
      }
    } catch (e) {
      error.value = 'Fehler beim Laden der Benutzerdaten.';
      console.error('Error:', e);
    }
  });
  
  const editUsername = () => {
    // Implementieren Sie hier die Logik zum Ändern des Benutzernamens
    console.log('Benutzername ändern');
  };
  
  const editEmail = () => {
    // Implementieren Sie hier die Logik zum Ändern der E-Mail
    console.log('E-Mail ändern');
  };
  
  const editPassword = () => {
    // Implementieren Sie hier die Logik zum Ändern des Passworts
    console.log('Passwort ändern');
  };

  const goBack = () => {
  router.back();
};
  </script>