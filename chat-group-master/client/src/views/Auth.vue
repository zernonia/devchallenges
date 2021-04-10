<template>
  <div>
    <h1 @click.prevent="update">Auth</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { state } from "@/utils/stateUser";

export default defineComponent({
  setup() {
    return {
      state
    };
  },
  methods: {
    update() {
      const queryString = window.location.search;
      const params = new URLSearchParams(queryString);
      const code = params.get("code");
      axios
        .post("http://localhost:3000/users/loginWithGithub", {
          code
        })
        .then(() => {
          window.close();
        });
    }
  },
  mounted() {
    this.update();
  }
});
</script>

<style></style>
