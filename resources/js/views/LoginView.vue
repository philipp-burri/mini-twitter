<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/AuthStore";
import router from "@/router";
const { login, getAuthUser } = useAuthStore();

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
    <div>
        <h1>Login View</h1>
        <form @submit.prevent="handleLogin">
            <label for="email">Email:</label>
            <input type="text" v-model="email" />
            <label for="password">Password:</label>
            <input type="password" v-model="password" />
            <button type="submit">Login</button>
        </form>
    </div>
</template>