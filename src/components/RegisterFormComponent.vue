<script lang="ts">

import router from '@/router';
import authorizationService from '@/service/authorizationService';
import {defineComponent} from "vue";

const data ={
}
export default defineComponent({

    methods: {
        async onPressedRegister(){
            //Await the registration
            await authorizationService.register(this.username, this.password);

            router.push({path: '/login'});
            
        }

    }
})

</script>

<template>
    <div id="loginForm">
        <div id="loginText">
            <h1>Register</h1>
        </div>
        <div class="input">
            <h2>Username</h2>
            <input id="username" type="text" v-model="username">
        </div>
        <div class="input">
            <h2>Password</h2>
            <input id="password" type="password" v-model="password">
        </div>
        <p>Already have an account? Sign in <a href="http://localhost:5173/login" target="_blank">here</a>!</p>
        <button id="login" @click="onPressedRegister()">Register new account</button>
    </div>
</template>

<style scoped>
@media (min-width: 1024px) {
#loginForm
{
    color:white;
    height: 100%;
    width: 25em;
    background-color: rgb(65, 65, 62);
    padding: 1em;
    margin:auto;
    margin-top: 1em;
    

    text-align: center;
    
}
#loginText
{
    height: 6em;
    background-color: rgb(92, 89, 89);
    display: flex;
    justify-content: center;
    align-items: center;
}

.input{
    margin-top: 0.5em;
    margin-bottom: 0.5em;
}

button
{
    width:80%;
    height: 3em;
    margin-top: 1em;
}
}
</style>