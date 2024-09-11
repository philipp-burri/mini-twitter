<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/AuthStore";
import router from "@/router";
const { authUser } = storeToRefs(useAuthStore());
const { logout } = useAuthStore();

const handleLogout = () => {
    logout();
    router.push("/login");
};
</script>
<template>
    <div>
        <h1>Dashboard View</h1>
        <p>Welcome, {{ authUser.name }}</p>
        <button @click="handleLogout">Logout</button>
    </div>
</template>