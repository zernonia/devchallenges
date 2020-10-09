<template>
  <div class="toast">
    <svg
      v-if="status == 'error'"
      style="color: red;"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
        clip-rule="evenodd"
      />
    </svg>
    <svg
      v-if="status == 'success'"
      width="20"
      style="color: blue"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clip-rule="evenodd"
      />
    </svg>
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Toast",
  props: {
    message: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  }
});
</script>

<style>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 200px;
  background: white;
  box-shadow: 0px 7px 12px 0px #e4e0e0bd;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.75rem 1rem;
}
.toast > svg {
  margin-right: 0.5rem;
}
</style>
