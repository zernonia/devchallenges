<template>
  <div class="highlight-card">
    <div id="wind-status">
      <h4>Wind Status</h4>
      <h2>{{ Math.round(data.windSpeed) }} <span>mph</span></h2>
      <div id="compass">
        <svg
          id="compass-direction"
          width="15"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448.011 448.011"
        >
          <path
            d="M438.731 209.463l-416-192c-6.624-3.008-14.528-1.216-19.136 4.48a15.911 15.911 0 00-.384 19.648l136.8 182.4-136.8 182.4c-4.416 5.856-4.256 13.984.352 19.648 3.104 3.872 7.744 5.952 12.448 5.952 2.272 0 4.544-.48 6.688-1.472l416-192c5.696-2.624 9.312-8.288 9.312-14.528s-3.616-11.904-9.28-14.528z"
          />
        </svg>
        <p>{{ data.compassDirection }}</p>
      </div>
    </div>
    <div id="humidity">
      <h4>Humidity</h4>
      <h2>{{ data.humidity }} <span>%</span></h2>
      <HumidityBar :data="data.humidity" />
    </div>
    <div id="visiblity">
      <h4>Visibility</h4>
      <h2>{{ visibility }} <span>miles</span></h2>
    </div>
    <div id="air-pressure">
      <h4>Air Pressure</h4>
      <h2>{{ data.airPressure }} <span>mb</span></h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Weather } from "@/util/interface";
import { computed, defineComponent, PropType, watch } from "vue";
import HumidityBar from "@/components/HumidityBar.vue";

export default defineComponent({
  name: "WeatherCard",
  components: {
    HumidityBar
  },
  props: {
    data: {
      type: Object as PropType<Weather>,
      required: true
    }
  },
  setup(props) {
    const visibility = computed(() => props.data.visibility.toFixed(2));
    const rotation = computed(() => props.data.windDirection - 90);

    const setRotation = () => {
      const compass = document.getElementById(
        "compass-direction"
      ) as HTMLDivElement;
      compass.style.transform = `rotate(${rotation.value}deg)`;
    };
    watch(rotation, setRotation);
    return {
      visibility
    };
  }
});
</script>

<style lang="scss">
.highlight-card {
  margin-top: 2rem;
  display: grid;
  grid-template: auto auto / 1fr 1fr;
  gap: 50px;

  > div {
    background: #1e213a;
    padding: 2rem;
  }

  h4 {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #e7e7eb;
  }

  h2 {
    margin: 1.25rem 0 0 0;
    font-weight: bold;
    font-size: 64px;
    line-height: 50px;
    color: #e7e7eb;
    text-align: center;
  }

  span {
    font-weight: 500;
    font-size: 32px;
  }
}

#compass {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 44px;

  svg {
    border-radius: 50%;
    background: #585676;
    padding: 5px;
    fill: #e7e7eb;
  }
  p {
    margin-left: 0.75rem;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #e7e7eb;
  }
}
#compass-direction {
  transform: rotate(-90deg);
  transition: transform 1s ease-in;
}
#humidity-bar {
  width: 100%;
}

@media screen and (max-width: 768px) {
  .highlight-card {
    grid-template: 1fr / 1fr;
  }
}
</style>
