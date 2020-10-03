<template>
  <div class="today drawer">
    <div id="close-drawer">
      <svg
        @click="$emit('close')"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
    <div class="search">
      <div class="search-input">
        <svg
          width="20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          @input="searchInput"
          v-model="searchTerm"
          placeholder="Search location"
        />
      </div>
      <button>Search</button>
    </div>
    <div class="drawer-padding">
      <div
        v-for="(location, index) in state.locations"
        :key="index"
        class="location"
        @click="selectLocation(index)"
      >
        <a>
          {{ location.title }}
        </a>
        <svg
          width="20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { state } from "@/util/getLocation";

export default defineComponent({
  name: "SearchDrawer",
  emits: ["close"],
  setup(props, context) {
    const searchTerm = ref<string>("");
    const searchInput = () => {
      searchTerm.value === ""
        ? ""
        : state.searchLocation(searchTerm.value, "location");
    };

    const selectLocation = (index: number) => {
      state.getData(state.locations[index].woeid);
      context.emit("close");
    };
    return { state, searchInput, searchTerm, selectLocation };
  }
});
</script>

<style lang="scss">
#close-drawer {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 1rem 2rem 0 2rem;
  color: #e7e7eb;

  svg {
    cursor: pointer;
  }
}
.drawer {
  position: fixed !important;
  top: 0;
  left: 0;
  z-index: 20;

  input {
    border: none;
    background: none;
  }
}

.search-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid #e7e7eb;
  margin-right: 1rem;

  input {
    width: 100%;
    color: #e7e7eb;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
  }

  svg {
    background: none !important;
  }
}

button {
  border: none;
  background: none;
}
.drawer-padding {
  padding: 2rem;
}
.location {
  padding: 1rem;
  border: 1px solid transparent;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin: 1rem 0;
  &:hover {
    border: 1px solid #e7e7eb;
  }
  a {
    font-size: 16px;
    line-height: 19px;
    color: #e7e7eb;
  }
  svg {
    color: transparent;
  }
  &:hover > svg {
    color: #616475;
  }
}
</style>
