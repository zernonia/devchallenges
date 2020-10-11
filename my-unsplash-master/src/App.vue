<template>
  <Header />
  <transition name="fade-in" mode="out-in">
    <Gallery v-if="state.imageList.length" />
    <Loader v-else />
  </transition>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Header from "./components/Header.vue";
import Gallery from "./components/Gallery.vue";
import Loader from "./components/Loader.vue";
import { state } from "./utils/state";

export default defineComponent({
  name: "App",
  components: {
    Header,
    Gallery,
    Loader
  },
  setup() {
    onMounted(state.getImages);
    return {
      state
    };
  }
});
</script>

<style>
* {
  padding: 0;
  margin: 0;
  outline: none;
  font-family: "Noto Sans";
}
body {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(22, 22, 22);
  margin: 2.5rem 1rem;
  max-width: 1000px;
  width: 100%;
}
.fade-in-enter-active,
.fade-in-leave-active {
  transition: all 0.75s ease-in-out;
}

.fade-in-enter-from,
.fade-in-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
