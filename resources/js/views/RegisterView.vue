

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/AuthStore";



const { register } = useAuthStore();


const data = ref({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
})

const handleRegister = () => {
    register(
        {
            name: data.value.name,
            email: data.value.email,
            password: data.value.password,
            password_confirmation: data.value.password_confirmation
        }
    )
    console.log(data.value.name);
}
</script>

<template>
    <form method="POST" @submit.prevent="handleRegister">
        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="data.name" />
        </div>
        <div class="form-group">
            <label for="email">E-Mail:</label>
            <input type="email" id="email" v-model="data.email" />
        </div>
        <div class="form-group">
            <label for="password">Passwort</label>
            <input type="password" id="password" v-model="data.password" />
        </div>
        <div class="form-group">
            <label for="password_confirmation">Passwort bestätigen</label>
            <input type="password" id="password_confirmation" v-model="data.password_confirmation" />
        </div>
        <button type="submit">Submit</button>
    </form>
</template>