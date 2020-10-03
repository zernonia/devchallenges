<template>
  <Today :data="state.weatherData[0]" :location="state.location" />
  <Side :futureData="state.sideData()" :todayData="state.weatherData[0]" />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted } from "vue";
import Today from "@/components/Today.vue";
import Side from "@/components/Side.vue";
import { state } from "@/util/getLocation";
import axios from "axios";

export default defineComponent({
  name: "Home",
  components: {
    Today,
    Side
  },
  setup() {
    const initialFetch = async () => {
      const { data } = await axios.get("/api");
      return data;
    };
    onBeforeMount(state.initialData);
    onMounted(async () => {
      const { ip } = await initialFetch();
      state.initialData();
      await state.searchLocation(ip, "lattlong");
      state.getData(state.locations[0].woeid);
    });
    return {
      state
    };
  }
});
</script>
