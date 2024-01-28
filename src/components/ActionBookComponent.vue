<script lang="ts">
import bookService from '@/service/bookService';
import {defineComponent} from "vue";
import PopupBookComponent from "@/components/PopupBookComponent.vue";
import router from "@/router";



export default defineComponent({
  components: {PopupBookComponent},

  data(){
    return {
      popup: false
    }
  },

  props: {
    title: String,
    author: String,
    quantity: Number,
    edit: Boolean

  },

  setup(props) {
    console.log(props.title)
  },
  methods:{
    onPressedEdit() {
      this.popup = true;


    },
    onPressedDelete() {
      bookService.deleteBook(this.title).then(data => location.reload());
    },

    onClosePopup(){
      this.popup = false;
    }

  }
})

</script>

<template>
  <div id="header">
    <button id="edit" @click="onPressedEdit()">Edit</button>
    <button id="delete" @click="onPressedDelete()">Delete</button>
  </div>
  <PopupBookComponent @closePopup="onClosePopup()"  :title="this.title" :author="this.author" :quantity="this.quantity" :edit="true" :popup="this.popup"/>
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