<template>
  <div class="heading">
    <header>#todo</header>
    <svg @click="isDarkMode = !isDarkMode" style="cursor : pointer; align-self:auto ; margin-left: 10px" id="dark" xmlns="http://www.w3.org/2000/svg" width="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  setup() {
    // setting ref , reactive
    const isDarkMode = ref(true)

    // methods to mutate ref, reactive
    const updateMode = function(newVal: boolean): void {
      if(newVal) {
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.documentElement.setAttribute('data-theme', 'light')
      }
    }

    // watching for dark-mode to change and update LocalStorage
    watch(isDarkMode, (newVal: boolean) => {
      localStorage.setItem('dark-mode', JSON.stringify(newVal))
      updateMode(newVal)
    })
    
    if (typeof localStorage.getItem('dark-mode') === "string"){
      const parseString: string = localStorage.getItem('dark-mode') as string
      const darkModeFromLocalStorage = JSON.parse(parseString)
      updateMode(darkModeFromLocalStorage)
    } else {
      document.documentElement.setAttribute('data-theme', 'dark')
    }
    
    return {
      isDarkMode
    }
  }
});
</script>

<style>
.heading {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
header {
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
  text-align: center;
  letter-spacing: -0.045em;
}
</style>
