<template>
  <div
    id="bar-width"
    class=" h-screen bg-black text-white flex flex-col justify-between"
  >
    <div class=" top-bar " id="bar-navigate">
      <h3>All Channels</h3>
    </div>
    <div id="bar-title" class=" flex-grow">
      <span v-for="channel in stateChannel.channelList" :key="channel._id">
        {{ channel.name }}
      </span>
    </div>
    <div>
      <div class=" px-6 py-4 flex flex-row items-center">
        <img
          style="width: 50px"
          class=" rounded-lg"
          :src="state.photo"
          alt=""
        />
        <h4 class=" font-normal text-gray-300 ml-4 flex-grow">
          {{ state.name }}
        </h4>
        <svg
          width="15"
          style="min-width: 15px;"
          class=" text-gray-200 justify-self-end"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { state } from "../utils/stateUser";
import { state as stateChannel } from "../utils/stateChannel";
export default defineComponent({
  setup() {
    return {
      state,
      stateChannel
    };
  }
});
</script>

<style>
.top-bar {
  height: 50px;
  @apply grid items-center shadow-lg px-6;
}

h3 {
  @apply text-lg font-bold tracking-wider;
}

#bar-width {
  width: 350px;
}
</style>
