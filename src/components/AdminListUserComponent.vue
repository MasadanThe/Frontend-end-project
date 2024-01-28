<script lang="ts">
import type { Book } from '@/model/book';
import bookService from '@/service/bookService';
import {defineComponent, reactive, ref, watch} from "vue";
import OrderComponent from './OrderComponent.vue';
import ActionComponent from "@/components/ActionBookComponent.vue";
import PopupBookComponent from "@/components/PopupBookComponent.vue";
import userService from "@/service/userService";
import PopupUserComponent from "@/components/PopupUserComponent.vue";
import ActionUserComponent from "@/components/ActionUserComponent.vue";
const data = {
  users: new Array<User>,
  popup: false,
}

export default defineComponent({
  components: {ActionUserComponent, PopupUserComponent, PopupBookComponent, OrderComponent, ActionComponent},

  data(){return data},

  props: ["search"],

  created() {
    this.getUsers("");
    console.log(this.users);
  },

  methods: {
    async getUsers(search: string){
      //Await the books then run booksDone()
      console.log("Logging data")
      await userService.getAllUsers(search).then(data => this.users = data)
      console.log(this.users);

    },
    onPressedAddBook(){
      this.popup = true;
      console.log(this.search);
    },
    onClosePopup(){
      this.popup = false;
    }
  },

  watch: {
    search: {
      immediate:true,
      deep:true,
      handler(val, oldVal){
        console.log("VALUE CHANGED");
        this.getUsers(this.search);
      }
    }
  }

})

</script>

<template>
  <div id="idList">
    <ul id="titleUL">
      <h3 class="headerBooks">Username</h3>
      <li class="liText" v-for="user in this.users">
        <p>{{user.username}}</p>
      </li>
    </ul>
    <ul id="authorUL">
      <h3 class="headerBooks">Role</h3>
      <li class="liText" v-for="user in this.users">
        <p>{{user.role}}</p>
      </li>
    </ul>
    <ul id="quantityUL">
      <h3 class="headerBooks">Purchases</h3>
      <li class="liText" v-for="user in this.users">
        <p>{{user.purchases}} purchases</p>
      </li>
    </ul>
    <ul id="actionUL">
      <h3 class="headerBooks">Action</h3>
      <li class="liText" v-for="user in this.users">
        <ActionUserComponent :username="user.username" :role="user.role"/>
      </li>
    </ul>
  </div>
</template>

<style scoped>
#quantityUL{
  position: relative;
}

#idList{
  display: flex;
  justify-content: center;
}

.headerBooks{
  color: white;
  background-color: rgb(100, 100, 100);
  padding: 1em;
  border: 0.2em;
  border-style: solid;
  border-color: white;
}

ul{
  list-style-type: none;
  width: 80%;
  text-align: center;
}

.liText{
  color:white;
  padding: 0.5em;
  margin: 0.1em;
  background-color: rgb(75, 75, 75);
  border: 0.1em;
  border-style: solid;
  border-color: white;
}
</style>
