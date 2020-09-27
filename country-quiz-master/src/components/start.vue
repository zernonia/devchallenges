<template>
  <div class="start">
    <h3>Simple Quiz to test your Country knowledge</h3>
    <button @click="$emit('start')">Start</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "start"
});
</script>

<style>
.start {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 24px;
  color: #2f527b;
}
.start > button {
  cursor: pointer;
  margin-top: 3rem;
  width: 100%;
  border: none;
  border-radius: 15px;
  color: white;
  background: #f9a826;
  padding: 1rem;
  text-transform: uppercase;
}
</style>
