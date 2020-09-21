<template>
  <Header />
  <Gallery />
  <Footer />
</template>

<script>
import Header from './components/Header.vue'
import Gallery from './components/Gallery.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Gallery,
    Footer
  }
}
</script>

<style>
  @import './assets/style.css';
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;800&display=swap');
</style>
