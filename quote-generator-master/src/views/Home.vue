<template>
  <div class="quote-content">
    <transition name="slide-fade" mode="out-in">
      <div v-if="!loading">
      <h1 class="quote-text" :key="Quote.quote._id">
        {{ Quote.quote.quoteText }}
      </h1>
      <button class="quote-button" @click="$router.push(`/${ Quote.quote.quoteAuthor }`)">
        <div>
          <h2>{{ Quote.quote.quoteAuthor }}</h2>
          <h6>{{ Quote.quote.quoteGenre }}</h6>
        </div>
        <svg width="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { storeQuote as Quote } from '../utils/quote'

export default defineComponent({
  name: 'Home',
  setup(){
    const loading = computed( () => {
      return Quote.loading
    })
    onMounted(Quote.getQuote)
    return {
      loading,
      Quote
    }
  },
  components: {
    
  },
});
</script>

<style>
.quote-content {
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.quote-text {
  width: calc(100% - 6rem);
  padding: 0 3rem;
  margin: 2rem 0 6rem 0 ;
  border-left: 5px solid #F7DF94;
  font-weight: 500;
  font-size: 36px;
  line-height: 120%;
}

.quote-button {
  width: 100%;
  padding: 4rem 3rem;
  background: var(--backg);
  text-align: start;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s;
  cursor: pointer;
}
.quote-button h2 {
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: var(--text-2);
  transition: all 0.3s;
}
.quote-button h6 {
  margin-top: 0.5rem;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #828282;
}
.quote-button svg {
  color: #F7DF94;
  margin-right: 1rem;
  transition: all 0.3s;
}
.quote-button:hover {
  background: var(--text);
}
.quote-button:hover h2{
  color: var(--backg);
  transition: all 0.3s;
}
.quote-button:hover svg {
  color: var(--backg);
  transform: translateX(10px);
  transition: all 0.3s;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
