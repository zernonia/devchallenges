<template>
  <div id="nav">
    <header>
      <svg @click="updateMode" style="cursor: pointer;" width="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
      <button @click="getCurrentRoute">random
        <svg :class="{ spinning : loading }" width="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </header>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
    <footer>Zernonia @ zernonia.com</footer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import { storeQuote as Quote } from './utils/quote'

export default defineComponent({
  setup(){
    const isDarkMode = ref<boolean>(true)
    // methods to mutate ref, reactive
    const updateMode = function(): void {
      if(!isDarkMode.value) {
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.documentElement.setAttribute('data-theme', 'light')
      }
      isDarkMode.value = !isDarkMode.value
    }
    onMounted( () => document.documentElement.setAttribute('data-theme', 'dark'))

    const route = useRoute()
    const currentRoute = computed( () => { return route.name })
    const loading = computed( () => {
      return Quote.loading
    })
    const { getQuote, getQuotes } = Quote
    const getCurrentRoute = () => {
      currentRoute.value == 'Home' ? getQuote() : getQuotes(`${ route.params.author }`)
    }
    return {
      updateMode,
      loading,
      getCurrentRoute
    }
  }
});
</script>

<style>
@import './assets/style.css';

#app {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow: auto;
}
#nav {
  padding: 2rem;
  max-width: 1000px;
  width: 100%;
  height: calc(100vh - 4rem);
  display: grid;
  grid-template-rows: 50px 1fr 50px;
  color: var(--text);
}

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
footer {
  display: grid;
  place-content: center;
  font-family: 'Montserrat';
  color: #A9A9A9;
}

header > button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
  padding: 1rem;
  background: none;
  cursor: pointer;
  font-size: 18px;
  color: var(--text);
}
header > button > svg {
  margin-left: 1rem;
}
.spinning {
  animation: spin 500ms infinite linear;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>
