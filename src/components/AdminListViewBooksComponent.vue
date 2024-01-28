<script lang="ts">
import type { Book } from '@/model/book';
import bookService from '@/service/bookService';
import {defineComponent, reactive, ref, watch} from "vue";
import OrderComponent from './OrderComponent.vue';
import ActionComponent from "@/components/ActionBookComponent.vue";
import PopupBookComponent from "@/components/PopupBookComponent.vue";
const data = {
  books: new Array<Book>,
  popup: false,
}

export default defineComponent({
  components: {PopupBookComponent, OrderComponent, ActionComponent},

  data(){return data},

  props: ["search"],

  created() {
    this.getBooks("");
    console.log(this.books);
  },

  methods: {
    async getBooks(search: string){
      //Await the books then run booksDone()
      console.log("Logging data")
      await bookService.getBooks(search).then(data => this.books = data)
      console.log(this.books);

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
        this.getBooks(this.search);
      }
    }
  }

})

</script>

<template>
  <div id="idList">
    <ul id="titleUL">
      <h3 class="headerBooks">Book title</h3>
      <li class="liText" v-for="book in this.books.books">
        <p>{{book.title}}</p>
      </li>
    </ul>
    <ul id="authorUL">
      <h3 class="headerBooks">Book author</h3>
      <li class="liText" v-for="book in this.books.books">
        <p>{{book.author}}</p>
      </li>
    </ul>
    <ul id="quantityUL">
      <button id="addBook" @click="onPressedAddBook()">Add new book</button>
      <h3 class="headerBooks">Availability</h3>
      <li class="liText" v-for="book in this.books.books">
        <p v-if="book.quantity === 0">Out of stock</p>
        <p v-else>{{book.quantity}} left</p>
      </li>
    </ul>
    <ul id="orderUL">
      <h3 class="headerBooks">Order</h3>
      <li class="liText" v-for="book in this.books.books">
        <OrderComponent :title="book.title" :quantity="book.quantity"/>
      </li>
    </ul>
    <ul id="actionUL">
      <h3 class="headerBooks">Order</h3>
      <li class="liText" v-for="book in this.books.books">
        <ActionComponent :title="book.title" :author="book.author" :quantity="book.quantity" :edit="true"/>
      </li>
    </ul>
  </div>
  <PopupBookComponent @closePopup="onClosePopup()"  :title="'New title'" :author="'New author'" :quantity="0" :edit="false" :popup="this.popup"/>
</template>

<style scoped>
#quantityUL{
  position: relative;
}
#addBook{
  position: absolute;
  bottom: 100%;
  margin-bottom: 0.5em;
  width: 92%;
  margin-left: 8%;
  left: 0;
  height: 3em;
  background-color: rgb(120, 120, 120);
  color: white;
}
#search{
  margin: 1em;
  margin-left: 4em;
  height: 3em;
  width: 20em;
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
