<template>
  <img alt="Vue logo" src="../assets/logo.png" />
  <input type="text" name="email" v-model="email" id="email" />
  <input type="password" name="password" v-model="password" id="password" />
  <button @click="loginWithEmail">Email</button>
  <button @click="loginWithGithub">Github</button>
  <button @click="signUp">Sign Up</button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const router = useRouter();
    const email = ref<string>("");
    const password = ref<string>("");

    const loginWithEmail = () => {
      axios
        .post("http://localhost:3000/users/loginWithEmail", {
          email: email.value,
          password: password.value
        })
        .then(res => {
          console.log(res);
          router.push("/channel/welcome");
        })
        .catch(e => console.log(e));
    };

    const signUp = () => {
      axios
        .post("http://localhost:3000/users/signup", {
          email: email.value,
          password: email.value
        })
        .then(res => {
          console.log(res);
          router.push("/channel/welcome");
        })
        .catch(e => console.log(e));
    };

    const src =
      "https://github.com/login/oauth/authorize?client_id=686f5323f518cfc824f3&scope=user";
    const popup = ref<Window>();
    const loginWithGithub = () => {
      const params = `height=700,width=550,left=${(screen.width - 550) /
        2},top=${(screen.height - 700) / 2}&state=randomstring`;
      popup.value = window.open(src, "github", params) as Window;

      setInterval(() => {
        if (popup.value?.closed) {
          clearInterval();
          router.push("/channel/welcome");
        }
      }, 500);
    };
    return {
      loginWithGithub,
      loginWithEmail,
      signUp,
      email,
      password
    };
  }
});
</script>

<style></style>
