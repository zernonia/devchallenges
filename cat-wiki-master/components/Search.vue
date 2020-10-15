<template>
  <div class="relative">
    <div
      ref="button"
      class="search shadow-md w-full bg-white text-black flex flex-row justify-between items-center py-4 px-8 rounded-5xl"
      @click="searching = true"
    >
      <input
        v-model="searchTerm"
        autocomplete="false"
        class="text-black outline-none"
        type="text"
        name="cats"
        placeholder="Enter your breed"
      />
      <svg
        class="cursor-pointer"
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
    </div>
    <div
      v-if="searching"
      v-closable="{
        exclude: ['button'],
        handler: 'onClose',
      }"
      class="shadow-md search-list absolute w-full p-4 bg-white text-black z-10 rounded-5xl"
    >
      <div class="">
        <h4
          v-for="(item, index) in searchFilter"
          :key="item.id"
          class="font-medium py-4 px-4 hover:bg-gray-100 rounded-2xl cursor-pointer"
          @click="searchSelected(item.name, item.id)"
        >
          {{ item.name }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({
  data: () => ({
    searchTerm: '',
    searching: false,
  }),
  computed: {
    searchFilter() {
      const re = new RegExp(`${this.searchTerm}`, 'i')
      return this.$store.state.searchList.filter((val: { name: string }) => {
        const str = val.name.search(re)
        if (str !== -1) return true
      })
    },
  },
  mounted() {
    axios
      .get('/api/listCats')
      .then((res: { data: any }) => {
        this.$store.commit('UPDATE_SEARCHLIST', res.data)
      })
      .catch((e: any) => {
        console.log(e)
      })
  },
  methods: {
    searchSelected(name: string, name_id: string): void {
      this.$router.push(`/cats/${name_id}`)
      this.searchTerm = name
      this.searching = false
    },
    onClose() {
      this.searching = false
    },
  },
})
</script>
<style>
.search-list {
  top: 70px;
  left: 0;
}
.search-list > div {
  max-height: 200px;
  overflow-y: scroll;
}
</style>
