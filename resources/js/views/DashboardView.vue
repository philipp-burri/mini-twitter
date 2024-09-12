<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/AuthStore";
import router from "@/router";
import PostView from "./PostView.vue";
import Header from "../components/Header.vue";
const { authUser } = storeToRefs(useAuthStore());
const { logout } = useAuthStore();

const handleLogout = () => {
    logout();
    router.push("/login");
};
</script>
<template>
        <Header />
    <div>
        <h1>Dashboard View</h1>
        <p>Welcome, {{ authUser.name }}</p>
        <button @click="handleLogout">Logout</button>
        <PostView />
    </div>
</template>