<template>
    <div>
        <label for="email">Email address</label>
        <input type="text" name="email" id="email" v-model="credentials.email" />
    </div>
    <div>
        <label for="password">Password</label>
        <input type="text" name="password" id="password" v-model="credentials.password" />
    </div>
    <div>
        <button type="submit" @click="signIn">Sign in</button>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from 'axios';

const credentials = ref({
    email: null,
    password: null
});

async function signIn() {
    await axios.get('/sanctum/csrf-cookie')
    await axios.post('/login', credentials.value)
}
</script>

<style scoped>
a {
    color: #42b983;
}
label {
    margin: 0 0.5em;
    font-weight: bold;
}
code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
}
</style>
