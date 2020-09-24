<template>
  <div class="quote-content-list">
    <button class="quote-button" id="back-button" @click="$router.go(-1)">
      <svg width="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
      </svg>
      <div>
        <h2>Go Back</h2>
      </div>
    </button>
    <h3>{{ $route.params.author }}</h3>
    <transition name="slide-fade" mode="out-in">
      <div v-if="Quote.quotes.length">
        <transition name="slide-fade" mode="out-in">
          <div v-if="!loading">
            <h1 class="quote-text" v-for="quote in Quote.quotes" :key="quote._id">
              {{ quote.quoteText }}
            </h1>
          </div>
        </transition>
      </div>
      <h1 v-else class="quote-text" id="empty-list">/* No more Quote from {{ $route.params.author }} */</h1>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeQuote as Quote } from '../utils/quote'

export default defineComponent({
  name: 'Home',
  setup(){
    const loading = computed( () => {
      return Quote.loading
    })
    const route = useRoute()
    const getData = Quote.getQuotes(`${ route.params.author }`)
    onMounted( () => getData)
    return {
      Quote,
      loading
    }
  }
});
</script>

<style>
.quote-content-list {
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  position: relative;
}
.quote-content-list h3 {
  align-self: flex-start;
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
  color: var(--text);
  padding: 2rem 3rem;
}
#back-button {
  padding: 1.5rem 3rem;
  justify-content: flex-start;
}
#back-button:hover > svg {
  transform: translateX(-10px);
}
#empty-list {
  border: none;
  text-align: center;
  color: #7e7e7e;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
