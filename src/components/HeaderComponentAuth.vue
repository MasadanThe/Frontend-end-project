<script lang="ts">

import bookService from '@/service/bookService';
import {defineComponent} from "vue";

const data ={
}
export default defineComponent({

})

</script>

<template>
    <div id="header">
        <H1>Bookster website</H1>
    </div>
</template>

<style scoped>
@media (min-width: 1024px) {
#header
{
    color:white;
    height: 100%;
    background-color: rgb(65, 65, 62);
    padding-top: 2em;
    padding-bottom: 2em;
}
H1
{
    text-align: center;
}
}
</style>