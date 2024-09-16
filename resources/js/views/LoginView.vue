<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/AuthStore";
import router from "@/router";
const { login, getAuthUser } = useAuthStore();
import Header from "../components/Header.vue";

const email = ref("");
const password = ref("");

const handleLogin = async () => {
    try {
        console.log("Versuche Login mit:", { email: email.value, password: password.value });
        const loginResponse = await login({ email: email.value, password: password.value });
        console.log("Login-Antwort:", loginResponse);
        
        const userResponse = await getAuthUser();
        console.log("Benutzer-Antwort:", userResponse);
        
        if (userResponse.status === 200) router.push("/dashboard");
    } catch (error) {
        console.error("Fehler beim Login:", error.response?.data || error.message);
    }
};
</script>


<template>
<Header />
<div class="bg-gray-100 min-h-screen flex flex-col items-center">
    <div class="w-[768px] text-left items-left mb-8 mt-[6.8rem]">
      <h1 class="text-3xl font-bold mb-1">Live and Trending</h1>
      <p class="text-xl text-gray-500 mb-8">Welcome Back!</p>
    </div>
    
    <div class="bg-white px-8 rounded-sm w-[768px] h-[437px]">
      <p class="text-3xl font-bold mt-10 mb-8">Login</p>
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-2xl font-normal text-gray-700 mb-1">E-Mail:</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div>
          <label for="password" class="block text-2xl font-normal text-gray-700 mb-1">Password:</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        

        <div class="flex justify-between">
          <p class="text-sm font-normal mt-8">
            Don't have an account? 
            <router-link to="/register" class="text-blue-600 hover:underline"> Sign up</router-link>
          </p>

          <button 
            type="submit" 
            class="text-sm px-3 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
      </div>
      </form>
    </div>

</div>
</template>