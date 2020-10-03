<template>
  <div class="weather-card">
    <h5>{{ data.applicableDate }}</h5>
    <img :src="imgLink" alt="" />
    <div>
      <h6 class="maxTemp">
        {{
          state.temperatureFormat === "C"
            ? Math.round(data.maxTemp)
            : Math.round(data.maxTempF)
        }}
        {{ state.temperatureFormat === "C" ? "°C" : "°F" }}
      </h6>
      <h6 class="minTemp">
        {{
          state.temperatureFormat === "C"
            ? Math.round(data.minTemp)
            : Math.round(data.minTempF)
        }}
        {{ state.temperatureFormat === "C" ? "°C" : "°F" }}
      </h6>
    </div>
  </div>
</template>

<script lang="ts">
import { Weather } from "@/util/interface";
import { defineComponent, PropType, computed } from "vue";
import { state } from "@/util/getLocation";

export default defineComponent({
  name: "WeatherCard",
  props: {
    data: {
      type: Object as PropType<Weather>,
      required: true
    }
  },
  setup(props) {
    const imgLink = computed((): string => {
      const removeWhiteSpaces = props.data.condition.replaceAll(/\s+/g, "");
      const images = require.context("../assets/", false, /\.png$/);
      if (props.data.condition == "") return images("./" + "Clear" + ".png");
      return images("./" + removeWhiteSpaces + ".png");
    });

    return { imgLink, state };
  }
});
</script>

<style lang="scss">
.weather-card {
  margin: 2rem 0rem;
  background: #1e213a;
  // min-width: 100px;
  // width: 10vw;
  max-width: 100px;
  padding: 1rem;
  color: #e7e7eb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  h5 {
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
  }

  img {
    width: 80%;
    margin: 1rem 0;
    transform: translate(-2px, -7px);
  }

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .maxTemp {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    margin-right: 0.75rem;
  }

  .minTemp {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #a09fb1;
  }
}
@media screen and (max-width: 768px) {
  .weather-card {
    margin: 0.75rem 0;
  }
}
</style>
