<template>
  <div class="side">
    <div>
      <div class="side-top">
        <button
          :class="{ 'is-active': state.temperatureFormat === 'C' }"
          @click="state.changeDegree(`C`)"
          id="celsius"
        >
          °C
        </button>
        <button
          :class="{ 'is-active': state.temperatureFormat === 'F' }"
          @click="state.changeDegree(`F`)"
          id="fahrenheit"
        >
          °F
        </button>
      </div>
      <div class="side-future">
        <WeatherCard
          v-for="(item, index) in futureData"
          :key="index"
          :data="item"
        />
      </div>
      <div class="side-highlight">
        <h1>Today’s Hightlights</h1>
        <HighlightCard :data="todayData" />
      </div>
    </div>
    <footer>Zernonia @ DevChallenges.io</footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import WeatherCard from "@/components/WeatherCard.vue";
import HighlightCard from "@/components/HighlightCard.vue";
import { Weather } from "@/util/interface";
import { state } from "@/util/getLocation";

export default defineComponent({
  name: "Side",
  components: {
    WeatherCard,
    HighlightCard
  },
  props: {
    futureData: {
      type: Array,
      required: true
    },
    todayData: {
      type: Object as PropType<Weather>,
      required: true
    }
  },
  setup() {
    return { state };
  }
});
</script>

<style lang="scss">
.side {
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  background: #100e1d;
  padding: 2rem;

  > div {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-width: 800px;
  }
  .side-top {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .side-future {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .side-highlight {
    margin-top: 1rem;
    h1 {
      font-weight: bold;
      font-size: 24px;
      line-height: 28px;
      color: #e7e7eb;
    }
  }
}

.side-top {
  button {
    border-radius: 50%;
    width: 36px;
    height: 36px;
    padding: 0.5rem;
    cursor: pointer;
    border: none;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    background: #585676;
    color: #e7e7eb;
  }
  #fahrenheit {
    margin-left: 0.5rem;
  }
}
.is-active {
  background: #e7e7eb !important;
  color: #110e3c !important;
}
footer {
  margin-top: 2rem;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #616475;
}
@media screen and (max-width: 768px) {
  .side-future {
    margin-top: 2rem;
  }
  .side-highlight {
    margin-top: 2.5rem !important;
  }
  .side {
    padding: 2rem 1rem;
  }
}
</style>
