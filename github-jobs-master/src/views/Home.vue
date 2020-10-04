<template>
  <div class="search  flex flex-row justify-center items-center rounded-lg px-8 py-10">
    <div class="search-input flex flex-row bg-white rounded-lg px-2 py-2 w-full items-center justify-start">
      <svg class=" text-gray-500 mx-2" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      <input @keyup.enter="searchFunction" v-model="state.searchTerm" class=" outline-none w-full sm:flex-grow text-gray-500" type="text" placeholder="Title, companies, expertise or benefits">
      <button @click="searchFunction" class=" outline-none bg-blue-500 rounded-md text-white px-2 py-1 text-sm sm:text-md sm:px-6 sm:py-3">Search</button>
    </div>
  </div>
  <section class=" flex flex-col md:flex-row my-6">
    <aside>
      <input v-model="state.searchFullTime" class=" form-checkbox" type="checkbox" name="full-time" id="full-time">
      <label class=" ml-4 font-poppins text-sm text-gray-900" for="full-time">Full time</label>
      <div class="mt-6">
        <h5 class=" uppercase text-blue-500 font-bold text-sm font-poppins tracking-wider">Location</h5>
        <div class=" my-4 shadow-sm rounded-md p-4 text-gray-500 flex flex-row bg-white">
          <svg width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <input @keyup.enter="searchFunction" v-model="state.searchLocation" class=" outline-none ml-4 text-xs w-full" type="text" name="" placeholder="City, state, zip code or country" id="">
        </div>
        <div class="location-result">
        </div>
      </div>
    </aside>
    <main class=" md:ml-8 w-full" >
      <div v-if="!state.loading" >
        <div v-if="state.joblist.length">
          <CardListing @click="router.push(`/${job.id}`)" v-for="job in state.jobListArray[state.currentPage -1]" :key="job.id" :data="job" />
          <Pagination />
        </div>
        <p v-else class="mt-8 w-full text-center text-4xl font-bold text-gray-900">No result found</p>
      </div>
      <Loading v-else />
    </main>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import CardListing from '@/components/CardListing.vue'
import Loading from '@/components/Loading.vue'
import Pagination from '@/components/Pagination.vue'
import { state } from '@/util/job'
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Home',
  components: {
    CardListing,
    Pagination,
    Loading
  },
  setup() {
    const router = useRouter()
    const searchFunction = () => {
      state.getData(state.searchTerm, state.searchFullTime, state.searchLocation)
    }
    onMounted( async () => {
      state.searchTerm || state.searchFullTime || state.searchLocation || state.joblist.length ? '' : await state.getData('code')
    })

    return {
      state,
      router,
      searchFunction
    }
  }
});
</script>
<style>
.search {
  background-image: url('../assets/background.png');
}
.search-input {
  max-width: 700px;
}
aside {
  width: 100%;
  max-width: 300px;
}

</style>
