<script lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue';
import AdminListViewBooksComponent from '@/components/AdminListViewBooksComponent.vue';
import {defineComponent, reactive, ref, watch} from "vue";
import bookService from "@/service/bookService";
import AdminListUserComponent from "@/components/AdminListUserComponent.vue";
export default {
  components: {AdminListUserComponent, AdminListViewBooksComponent, HeaderComponent},
  data(){
    return{
      search: "",
      searchString: "",
      booksPage: true
    }
  },
  methods: {


    onBlur() {
      this.searchString = this.search;
    },

    onPressedBooks(){
      this.booksPage = true;
    },

    onPressedUsers(){
      this.booksPage = false;
    }
  }
}
</script>

<template>
  <main>
    <HeaderComponent />
    <div id="searchButtons">
      <input id="search" type="text" v-model="this.search"  @change="onBlur" placeholder="Search query...">
      <div v-if="booksPage">
        <button class="choiceButton" id="Books" @click="onPressedBooks()">Books</button>
        <button class="choiceButton" id="UsersNotActive" @click="onPressedUsers()">Users</button>
      </div>
      <div v-else>
        <button class="choiceButton" id="BooksNotActive" @click="onPressedBooks()">Books</button>
        <button class="choiceButton" id="Users" @click="onPressedUsers()">Users</button>
      </div>
    </div>
    <AdminListViewBooksComponent v-if="booksPage" :search="this.searchString"/>
    <AdminListUserComponent v-else :search="this.searchString"/>
  </main>
</template>

<style scoped>
@media (min-width: 1024px) {
  #search{
    margin-top: 2em;
    margin-bottom: 0.5em;
    margin-left: 3em;
  }

  #searchButtons{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
  .choiceButton{
    margin-top: 2em;
  }

  #UsersNotActive{
    background-color: rgb(150, 150, 150);
  }
  #BooksNotActive{
    background-color: rgb(150, 150, 150);
  }



}
</style>
