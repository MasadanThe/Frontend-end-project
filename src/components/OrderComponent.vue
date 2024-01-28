<script lang="ts">
import bookService from '@/service/bookService';
import {defineComponent} from "vue";
import router from "@/router";



export default defineComponent({
  data() {
    return {
    count: 0
  } },

  props: {
    title: String,
    quantity: Number,
  },

  setup(props) {
    console.log(props.title)
  },
    methods:{
    onPressedAdd() {
        if (this.count < this.quantity){
          this.count++;
        }
    },  
    onPressedSubtract() {
        if (this.count > 0){
          this.count--;
        }
    },
    onPressedOrder(){
        if(this.count > 0){
          bookService.buyBook(this.title, this.count).then(data => location.reload());

        }
    },

  }
})

</script>

<template>
    <div id="header" v-if="quantity === 0">
        <button id="subtract" @click="onPressedSubtract()" disabled="true">-</button>
        <p id="quantity">{{this.count}}</p>
        <button id="add" @click="onPressedAdd()" disabled="true">+</button>
        <button id="order" @click="onPressedOrder()" disabled="true">Order</button>
    </div>
  <div id="header" v-else>
    <button id="subtract" @click="onPressedSubtract()">-</button>
    <p id="quantity">{{this.count}}</p>
    <button id="add" @click="onPressedAdd()">+</button>
    <button id="order" @click="onPressedOrder()">Order</button>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  #header
  {
    display: flex;
    justify-content: center;

  }
  #order{
    margin-left: 1em;
  }
  #quantity{
    margin-left: 0.5em;
  }
  #add{
    margin-left: 0.5em;
  }
}
</style>