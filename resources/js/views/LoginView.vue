<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/AuthStore";
import router from "@/router";
const { login, getAuthUser } = useAuthStore();

const email = ref("test@example.com");
const password = ref("password1234");

const handleLogin = async () => {
    // wir geben die email und password Werte an die login Funktion in unserem Store weiter
    await login({ email: email.value, password: password.value });

    // nach dem Login holen wir uns den authentifizierten User um ihn im Store zu speichern
    const res = await getAuthUser();

    // wenn der Status 200 ist, leiten wir den Benutzer auf die Dashboard-Seite weiter
    if (res.status === 200) router.push("/dashboard");
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