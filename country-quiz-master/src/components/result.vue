<template>
  <div class="start">
    <img src="../assets/winner.svg" alt="" />
    <h3 id="results">Results</h3>
    <h4 id="score">
      You got <span>{{ result }}</span> correct answers
    </h4>
    <button @click="$emit('restart')">Try Again</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "start",
  props: {
    result: Number
  }
});
</script>

<style>
#results {
  margin-top: 2rem;
  font-size: 48px;
}
#score {
  font-size: 18px;
}
#score span {
  font-size: 40px;
  color: #60bf88;
}
</style>
