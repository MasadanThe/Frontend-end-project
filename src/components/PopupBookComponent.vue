<script lang="ts">
import bookService from '@/service/bookService';
import {defineComponent} from "vue";
import router from "@/router";

export default defineComponent({

  emits: ['closePopup'],

  data() {
    return {
      newTitle: "",
      newAuthor: "",
      newQuantity: null
      }
    },

  props: {
    title: String,
    author: String,
    quantity: Number,
    edit: Boolean,
    popup: Boolean

  },

  setup(props, ctx) {
    ctx.emit('closePopup')
    console.log(props.title)
  },
  methods:{
    onPressedSave(){
      if (this.edit) {
        bookService.editBook(this.title, this.newTitle, this.newAuthor, this.newQuantity).then(data => location.reload());
      }
      else{
        bookService.addBook(this.newTitle, this.newAuthor, this.newQuantity).then(data => location.reload())
      }
    },
    onPressedDiscard(){
      this.newTitle = "";
      this.newAuthor = "";
      this.newQuantity = null;
      this.$emit('closePopup')
    }

  }
})

</script>

<template>
  <div id="popup" v-if="this.popup">
    <H2 v-if="edit">Edit book</H2>
    <H2 v-else>Add book</H2>
    <div id="divTag">
      <p>Title - {{this.title}}</p>
      <input id="title" type="text" v-model="newTitle" placeholder="Insert new title...">
    </div>
    <div id="divTag">
      <p>Author - {{this.author}}</p>
      <input id="author" type="text" v-model="newAuthor" placeholder="Insert new author...">
    </div>
    <div id="divTag">
      <p v-if="edit">Quantity - {{this.quantity}}</p>
      <p v-else>Quantity - New quantity</p>
      <input id="title" type="text" v-model="newQuantity" placeholder="Insert new quantity...">
    </div>
    <div id="buttons">
      <button id="save" @click="onPressedSave()">Save changes</button>
      <button id="discard" @click="onPressedDiscard()">Discard Changes</button>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {

  H2{
    color: white;
    list-style-type: none;
    text-align: center;

  }
  #popup
  {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
    background-color: rgb(75, 75, 75);
    border: 0.1em;
    border-style: solid;
    border-color: white;
    height: 20em;
    width: 20em;
  }

  #buttons{
    display: flex;
    justify-content: center;
    margin-top: 2em;
  }

  #discard{
    background-color: rgb(200, 200, 200);
    margin-left: 1em;
  }

  #divTag{
    width: fit-content;
    margin: auto;

  }
  p{
    margin-top: 1em;
    text-align: left;
    color: white;
    list-style-type: none;
  }
}
</style>