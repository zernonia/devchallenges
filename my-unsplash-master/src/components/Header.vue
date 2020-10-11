<template>
  <div class="header">
    <div>
      <img src="../assets/my_unsplash_logo.svg" alt="" />
      <div class="header-search">
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
          type="text"
          name="searchLabel"
          placeholder="Search label"
          v-model="state.searchTerm"
        />
      </div>
    </div>
    <button @click="addPhoto = true">Add Photo</button>
    <Upload @close="closeModal" v-if="addPhoto" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { state } from "../utils/state";
import Upload from "./Upload.vue";

export default defineComponent({
  name: "Header",
  components: {
    Upload
  },
  setup() {
    const addPhoto = ref<boolean>(false);
    const closeModal = () => {
      addPhoto.value = false;
    };
    const search = state.searchTerm;

    watch(
      () => state.searchTerm,
      () => {
        state.searchImageList();
      }
    );
    return { state, addPhoto, closeModal, search };
  }
});
</script>

<style>
.header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.header > div {
  display: flex;
  flex-direction: row;
}
.header-search {
  margin-left: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 20px;
  border: 1px solid #3db46d;
  display: flex;
  flex-direction: row;
  color: gray;
}
.header-search > input {
  border: none;
  width: 100%;
  margin-left: 0.5rem;
}
.header button {
  padding: 0.75rem 1rem;
  border-radius: 20px;
  border: none;
  color: white;
  background: #3db46d;
  cursor: pointer;
}
.header button:hover {
  background: #309257;
}
</style>
