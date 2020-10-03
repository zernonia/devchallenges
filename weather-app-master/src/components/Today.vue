<template>
  <div class="today">
    <div class="search">
      <button @click="searchOpen = true">Search for places</button>
      <svg
        @click="geolocation"
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 384"
      >
        <path
          d="M192 136c-30.872 0-56 25.12-56 56s25.128 56 56 56 56-25.12 56-56-25.128-56-56-56zm0 80c-13.232 0-24-10.768-24-24s10.768-24 24-24 24 10.768 24 24-10.768 24-24 24z"
        />
        <path
          d="M368 176h-32.944C327.648 109.368 274.632 56.352 208 48.944V16c0-8.832-7.168-16-16-16s-16 7.168-16 16v32.944C109.368 56.352 56.352 109.368 48.944 176H16c-8.832 0-16 7.168-16 16s7.168 16 16 16h32.944C56.352 274.632 109.368 327.648 176 335.056V368c0 8.832 7.168 16 16 16s16-7.168 16-16v-32.944c66.632-7.408 119.648-60.424 127.056-127.056H368c8.832 0 16-7.168 16-16s-7.168-16-16-16zM192 304c-61.76 0-112-50.24-112-112S130.24 80 192 80s112 50.24 112 112-50.24 112-112 112z"
        />
      </svg>
    </div>
    <div v-if="data" class="main-image">
      <img :src="imgLink" alt="" />
    </div>
    <div v-if="data" class="main-content">
      <h2>
        {{
          state.temperatureFormat === "C"
            ? Math.round(data.theTemp)
            : Math.round(data.theTempF)
        }}
        <span>{{ state.temperatureFormat === "C" ? "°C" : "°F" }}</span>
      </h2>
      <h3>{{ data.condition }}</h3>
      <div>
        <p>Today . {{ data.applicableDate }}</p>
        <div>
          <svg
            width="20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            />
          </svg>
          {{ location }}
        </div>
      </div>
    </div>
  </div>
  <SearchDrawer @close="closeDrawer" v-if="searchOpen" />
</template>

<script lang="ts">
import { Weather, LattLong } from "@/util/interface";
import SearchDrawer from "@/components/SearchDrawer.vue";
import { computed, defineComponent, PropType, reactive, ref } from "vue";
import { state } from "@/util/getLocation";

export default defineComponent({
  name: "Today",
  components: {
    SearchDrawer
  },
  props: {
    location: String,
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

    const geolocationAPI = reactive<LattLong>({
      latitude: 0,
      longitude: 0
    });

    const geolocation = () => {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
      } else {
        navigator.geolocation.getCurrentPosition(
          async position => {
            geolocationAPI.latitude = position.coords.latitude;
            geolocationAPI.longitude = position.coords.longitude;
            await state.searchLocation(geolocationAPI, "lattlong");
            state.getData(state.locations[0].woeid);
          },
          error => {
            console.log(error);
          }
        );
      }
    };

    const searchOpen = ref<boolean>(false);

    const closeDrawer = () => {
      searchOpen.value = false;
    };

    return { imgLink, searchOpen, closeDrawer, geolocation, state };
  }
});
</script>

<style lang="scss">
.today {
  width: 25vw;
  min-width: 300px;
  max-width: 375px;
  min-height: 100vh;
  background: #1e213a;
  color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  .search {
    padding: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: white;
    fill: white;
    align-items: center;

    button {
      background: #6e707a;
      color: white;
      padding: 1rem 1.5rem;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      cursor: pointer;
      border: none;
      height: 50px;
    }
    svg {
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      padding: 0.5rem;
      cursor: pointer;
    }
  }
}

.main-image {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  max-height: 200px;

  img {
    transform: scale(0.75);
  }
}
.main-image::before {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("../assets/Cloud-background.png");
  background-blend-mode: hard-light;
  background-size: cover;
  opacity: 0.1;
  content: "";
  transform: scale(1);
}
.main-content {
  position: relative;
  margin: 2rem 0;
  display: flex;
  height: auto;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  h2 {
    font-size: 100px;
    font-weight: 500;
    color: #e7e7eb;

    span {
      color: #e7e7ebb7;
      font-size: 40px;
      margin-left: -1.5rem;
    }
  }

  h3 {
    font-weight: 600;
    font-size: 36px;
    line-height: 42px;
    color: #a09fb1;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #88869d;
    font-size: 18px;
    line-height: 21px;

    > div {
      margin-top: 1rem;
      display: flex;
      flex-direction: row;
      font-weight: 600;

      p {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-weight: 500;
      }
      svg {
        margin-right: 0.5rem;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .today {
    max-width: unset;
    width: 100%;
  }

  .side .side-future {
    justify-content: space-evenly !important;
  }
  .weather-card {
    width: 30%;
    max-width: unset !important;
  }
}
</style>
