<template>
  <header>
    <div class="flex-row-center">
      <img @click="returnDefault" height="40" src="../assets/logo.png" alt="">
      <svg @click="darkMode" style="cursor : pointer; align-self:auto ; margin-left: 10px" id="dark" xmlns="http://www.w3.org/2000/svg" width="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </div>
    <Search @open="this.modal = true" />
    <SearchModal v-if="modal" @close="this.modal = false" />
  </header>
</template>

<script>
import Search from './Search.vue'
import SearchModal from './SearchModal.vue'
import { filterStore as filter } from '../store/filter'

export default {
  components: {
    Search,
    SearchModal
  },
  setup(){
    return filter
  },
  data: () => ({
    modal: false,
    dark: false
  }),
  methods: {
    darkMode(){
      if(this.dark) {
        document.documentElement.setAttribute('data-theme', 'light')
      } else {
        document.documentElement.setAttribute('data-theme', 'dark')
      }
      this.dark = !this.dark
    },
    returnDefault(){
      filter.updateFilter('',0,0)
    }
  },
  mounted(){
    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
      this.darkMode()
      this.dark = true
    } else {
      this.dark = false
    }
  }
}
</script>

<style>
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
header > div > img {
  cursor: pointer;
}
@media screen and (max-width: 768px) {
header {
  flex-direction: column;
  align-items: flex-start;
}
.search {
  margin-top: 2rem;
  align-self: center;
}
}
</style>