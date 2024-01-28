<script lang="ts">
import bookService from '@/service/bookService';
import {defineComponent} from "vue";
import PopupBookComponent from "@/components/PopupBookComponent.vue";
import router from "@/router";
import PopupUserComponent from "@/components/PopupUserComponent.vue";



export default defineComponent({
  components: {PopupUserComponent, PopupBookComponent},

  data(){
    return {
      popup: false,
      promote: false
    }
  },

  props: {
    username: String,
    role: String
  },

  setup(props) {
    console.log(props.title)
  },
  methods:{
    onPressedPromote() {
      this.promote = true;
      this.popup = true;

    },
    onPressedDelete() {
      this.promote = false;
      this.popup = true;
    },

    onClosePopup(){
      this.popup = false;
    }

  }
})

</script>

<template>
  <div id="header">
    <button v-if="role ==='ADMIN' " id="promote" @click="onPressedPromote()" disabled="true">Promote</button>
    <button v-else id="promote" @click="onPressedPromote()">Promote</button>
    <button id="delete" @click="onPressedDelete()">Delete</button>
  </div>
  <PopupUserComponent @closePopup="onClosePopup()" :username="this.username" :promote="this.promote" :popup="this.popup"/>
</template>

<style scoped>
@media (min-width: 1024px) {
  #header
  {
    display: flex;
    justify-content: center;

  }
  #delete{
    margin-left: 1em;
    background-color: rgb(150, 150, 150);
  }
}
</style>