<script lang="ts">
import bookService from '@/service/bookService';
import {defineComponent} from "vue";
import router from "@/router";
import userService from "@/service/userService";

export default defineComponent({

  emits: ['closePopup'],

  props: {
    username: String,
    promote: Boolean,
    popup: Boolean

  },

  setup(props, ctx) {
    ctx.emit('closePopup')
  },
  methods:{
    onPressedProceed(){
      if (this.promote) {
        userService.promoteUser(this.username).then(data => location.reload());
      }
      else{
        userService.deleteUser(this.username).then(data => location.reload());
      }
    },
    onPressedCancel(){
      this.$emit('closePopup')
    }

  }
})

</script>

<template>
  <div id="popup" v-if="this.popup">
    <H2>Change user settings</H2>
    <div id="divTag">
      <p>Are you sure you wish to</p>
      <p v-if="promote">promote user</p>
      <p v-else>delete user</p>
      <p>{{this.username}}?</p>
    </div>
    <div id="buttons">
      <button id="save" @click="onPressedProceed()">Proceed</button>
      <button id="discard" @click="onPressedCancel()">Cancel</button>
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
    height: 12em;
    width: 20em;
  }

  #buttons{
    display: flex;
    justify-content: center;
    margin-top: 1em;
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
    text-align: center;
    color: white;
    list-style-type: none;
  }
}
</style>