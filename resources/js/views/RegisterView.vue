

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/AuthStore";
import router from "@/router";
import Header from "../components/Header.vue";




const { register,getAuthUser } = useAuthStore();


const data = ref({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
})

const handleRegister = async () => {
    const responseRegister = await register(
        {
            name: data.value.name,
            email: data.value.email,
            password: data.value.password,
            password_confirmation: data.value.password_confirmation
        }
    )
        if(responseRegister.status !== 201) {
            return alert("Something went wrong")
        }    

        const responseUser = await getAuthUser()
        if(responseUser.status == 200) router.push("/dashboard")
}
</script>


<template>
<Header />
<div class="bg-gray-100 min-h-screen flex flex-col items-center">
  <div class="w-[768px] text-left mb-8 mt-[6.8rem]">
    <h1 class="text-3xl font-bold mb-1">Live and Trending</h1>
      <p class="text-xl text-gray-500 mb-8">Join now!</p>
  </div>
    <div class="w-[768px] h-[681px] text-left mb-8 bg-white px-8 rounded-sm">
        <h1 class="text-3xl text-left font-bold mb-8 mt-10">Register</h1>
        
        <form method="POST" @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label for="name" class="block text-2xl font-normal text-gray-700 mb-1">Name*</label>
            <input 
              type="text" 
              id="name" 
              v-model="data.name" 
              class="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
  
          <div>
            <label for="email" class="mt-8 block text-2xl font-normal text-gray-700 mb-1">E-Mail*</label>
            <input 
              type="email" 
              id="email" 
              v-model="data.email" 
              class="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
  
          <div>
            <label for="password" class="mt-8 block text-2xl font-normal text-gray-700 mb-1">Password*</label>
            <input 
              type="password" 
              id="password" 
              v-model="data.password" 
              class="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
  
          <div>
            <label for="password_confirmation" class="mt-8 block text-2xl font-normal text-gray-700">Confirm password</label>
            <input 
              type="password" 
              id="password_confirmation" 
              v-model="data.password_confirmation" 
              class="w-full mb-8 px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
  
          
        <div class="flex justify-between">
          <p class="text-sm mt-8">
            Already have an account?
            <router-link to="/login" class="text-teal-600 hover:underline">Login</router-link>
          </p>
          <button 
            type="submit" 
            class=" bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600  mt-6"
          >
            Register
          </button>
        </div>
        </form>
      </div>


  </div>
  </template>