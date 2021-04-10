<template>
  <div class="flex flex-row" id="container" v-if="currentRoute == 'Channel'">
    <router-view></router-view>
  </div>

  <div v-else>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import Cookie from "js-cookie";
import { useRoute, useRouter } from "vue-router";
import { state as stateChannel } from "./utils/stateChannel";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const currentRoute = computed(() => route.name);
    console.log(currentRoute.value);

    if (currentRoute.value == "Channel") {
      onMounted(() => {
        stateChannel.getChannel();
      });
    }
    const logout = () => {
      Cookie.remove("jwt");
      router.push("/");
    };
    return {
      logout,
      currentRoute
    };
  }
});
</script>
