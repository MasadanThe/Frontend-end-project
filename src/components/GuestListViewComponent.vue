<script lang="ts">
import type { Book } from '@/model/book';
import bookService from '@/service/bookService';
import {defineComponent} from "vue";

const data ={
   books: new Array<Book>
}
export default defineComponent({

  data() { return data },

   mounted() {
    this.getBooks("");
    console.log(this.books);
  },

  methods: {
        getBooks(search: string){
            //Await the books then run booksDone()
            console.log("Logging data")
            bookService.getBooks(search).then(data => this.books = data)
            
        },


        onBlur(){
      this.getBooks(this.search);
    }


    }
})

</script>

<template>
  <div>
    <input id="search" type="text" v-model="search"  @change="onBlur" placeholder="Search query...">
  </div>
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
      <h3 class="headerBooks">Availability</h3>
      <li class="liText" v-for="book in this.books.books">
        <p v-if="book.quantity === 0">Out of stock</p>
        <p v-else>{{book.quantity}} left</p></li>
    </ul>
    </div>
</template>

<style scoped>
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