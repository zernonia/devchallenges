<template>
  <Header></Header>
  <ToDo></ToDo>
  <Footer></Footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import ToDo from './components/ToDo.vue';
import Footer from './components/Footer.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    ToDo,
    Footer
  }
});
</script>

<style>
@import './assets/style.css';
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Raleway:wght@700&display=swap');
</style>