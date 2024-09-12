<script setup>
import { ref } from 'vue';
import { authClient } from '@/store/AuthStore';

const title = ref ('')
const content = ref ('')
const alertMessage = ref("")

const handleCreate = async () => {
    try{
        const res = await authClient.post("/api/posts", {
            title: title.value,
            content: content.value
        })
        if(res.status == 201) alertMessage.value = "Your post was submitted"
    }catch(e){
        alert("Something went wrong")
        console.log(e)
    }
}
</script>

<template>
    <div v-if="alertMessage">{{  alertMessage  }} </div>
    <form method="POST" @submit.prevent="handleCreate">
    <div class= "form-group">
            <label for="title">Titel</label>
            <input type="text" id="title" v-model="title" />
        </div>
        <div class="form-group">
            <label for="content">Content</label>
            <textarea type="text" id="content" v-model="content" />
        </div>
        <button>Create Post</button>

    </form>
</template>