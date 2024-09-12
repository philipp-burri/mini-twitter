<script setup>
import { RouterLink, RouterView } from "vue-router";

import { useAuthStore } from '@/store/AuthStore';
import { storeToRefs } from "pinia";
const { authUser } = storeToRefs(useAuthStore());
</script>

<template>
    <header>
        <div>
            <nav>
                <RouterLink to="/" v-if="authUser">Home</RouterLink>
                <RouterLink to="/dashboard" v-if="authUser">Dashboard</RouterLink>
                <RouterLink to="/login" v-if= "authUser == 0">Login</RouterLink>
                <RouterLink to="/register" v-if= "authUser == 0">Register</RouterLink>
                <RouterLink :to="{name: 'post-create' }">Create</RouterLink>
            </nav>
        </div>
    </header>
    <RouterView />
</template>