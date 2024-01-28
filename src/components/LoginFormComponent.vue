<script lang="ts">

import router from '@/router';
import authorizationService from '@/service/authorizationService';
import {defineComponent} from "vue";
import userService from "@/service/userService";

const data ={
  username: "",
  password: "",
  user:{
    username: "guest",
    role: "guest",
    purchases: 0
  }
}
export default defineComponent({

  data() { return data },
    methods: {
        async onPressedLogin(){
            //Await the login
            await authorizationService.login(this.username, this.password);

            //If successfully logged in, redirect.
            if(sessionStorage.token !== undefined){
            console.log("You are logged in!!");
            console.log(sessionStorage.token);
            //Await the user then run routLogin()
            await userService.getUser().then(data => this.user = data.user).then(this.routLogin)

            }
        },

        routLogin(){
          if (this.user.role === "ADMIN"){
            router.push({path: '/admin'});
          }
          else if (this.user.role === "USER"){

            router.push({path: '/user'});
          }
        },

        onPressedGuest(){
            router.push({path: '/guest'});
        },

    }
})

</script>

<template>
    <div id="loginForm">
        <div id="loginText">
            <h1>Login</h1>
        </div>
        <div class="input">
            <h2>Username</h2>
            <input id="username" type="text" v-model="username">
        </div>
        <div class="input">
            <h2>Password</h2>
            <input id="password" type="password" v-model="password">
        </div>
        <p>No account? Sign up <a href="http://localhost:5173/register" target="_self">here</a>!</p>
        <button id="login" @click="onPressedLogin()">Sign in</button>
        <button id="guest" @click="onPressedGuest()">Proceed as guest user</button>
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