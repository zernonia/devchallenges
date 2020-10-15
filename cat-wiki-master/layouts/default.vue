<template>
  <div class="container w-screen min-h-screen px-4 flex-col flex">
    <div class="py-4 flex flex-row justify-between items-center">
      <div class="cursor-pointer" @click="$router.push('/')">
        <CatLogo class="my-2" />
      </div>
      <Search v-if="$route.path !== '/'" />
    </div>
    <Nuxt class="flex-grow" />
    <footer
      class="w-full h-20 p-8 sm:px-16 rounded-t-3xl text-white flex flex-col sm:flex-row justify-between items-center bg-black"
    >
      <CatLogo color="#ffffff" />
      <span>Zernonia @ DevChallenge.io </span>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CatLogo from '@/components/CatLogo.vue'
import Search from '@/components/Search.vue'

export default Vue.extend({
  components: {
    CatLogo,
    Search,
  },
})
</script>

<style>
.container {
  max-width: 1100px;
}
</style>
