<script lang="ts">

import userService from '@/service/userService';
import { User } from "@/model/user";
import {defineComponent} from "vue";
import router from '@/router';

const data = {
    user:{
        username: "guest",
            role: "guest",
            purchases: 0
    }
}
export default defineComponent({
    data() { return data },
    created() {
    this.getUser();
    //console.log(this.books);
  },

  methods: 
  {
        getUser(){
            //If we are not logged in
            if(sessionStorage.token === undefined || sessionStorage.token === "")
                {
                let user ={
                    username: "guest",
                    role: "guest",
                    purchases: 0
                }
                data.user = user;
                this.userDone();
                }
            else{
            //Await the user then run userDone()
            userService.getUser().then(data => this.user = data.user).then(this.userDone)
            }
        },

        userDone(){
            var authText = document.getElementById("authText");
            var authButton = document.getElementById("authButton");

            console.log("Logging user")
            console.log(data.user.username)
            
            //If you are guest
            if(data.user.username === "guest"){
                authText.textContent = "Browsing as guest...";
                authButton.textContent = "Sign in";

            }
            //If you are logged in
            else{
                //Set text to 'Browsing as {role} <{username}>'
                authText.textContent = "Browsing as " 
                + data.user.role.toLowerCase( )
                + " <" + this.user.username 
                + ">";

                //Set button text
                authButton.textContent = "Sign out"
            }
        },

        onPressedAuth(){
            //If you are guest and pressing 'Sign in'
            if(data.user.username === "guest"){
                //Redirects to login
                router.push({path: '/login'});
            }
            //If you are logged in and pressing 'Sign out'
            else{
                //Removes the access token
                sessionStorage.token = "";

                //Redirects to login
                router.push({path: '/login'});
            }
        }
  }

})

</script>

<template>
    <div id="header">
        <H1>Bookster website</H1>
        <div id="authInformation">
        <H3 id="authText">Browsing as guest...</H3>
        <button id="authButton" @click="onPressedAuth()">Sign in</button>
    </div>
    </div>
</template>

<style scoped>
@media (min-width: 1024px) {
#header
{
    display: flex;
    color:white;
    height: 100%;
    background-color: rgb(65, 65, 62);
    padding-top: 2em;
    padding-bottom: 2em;
}
#authInformation{
    
    margin-left: auto;
    margin-right: 10em;
}
H1
{
    
    text-align: center;
    position: absolute;
    left:50%;
    transform: translateX(-50%);
}
}
</style>