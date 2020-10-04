<template>
  <div class=" mt-6 flex flex-row justify-end">
    <div class="flex flex-row">
      <div @click="leftArrow" class="left pagination">
        <svg width="15" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <div @click=" state.currentPage = 1 " class="pagination" :class="{ 'pagination-active' : state.currentPage==1 }">
        1
      </div>
      <div v-if="state.jobListArray.length > 1" class="flex flex-row">
        <svg v-if="state.currentPage !=1 &&  state.currentPage !=2 && state.currentPage !=3" class=" text-blue-500" width="15" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
        <div  v-for="(item, index) in state.jobListArray.slice(1, state.jobListArray.length -1)" :key="index"> 
          <div class="pagination" @click=" state.currentPage = index+2 " :class="{ 'pagination-active' : state.currentPage==index+2 }"
          v-if="index+2 == state.currentPage + 1 || index+2 == state.currentPage - 1 || index+2 == state.currentPage"
          >
            {{ index + 2 }}
          </div>
        </div>
          <svg v-if="state.currentPage !=state.jobListArray.length -2 && state.currentPage !=state.jobListArray.length -1 &&  state.currentPage != state.jobListArray.length"  width="15" class=" text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        <div @click=" state.currentPage = state.jobListArray.length " class="pagination" :class="{ 'pagination-active' : state.currentPage==state.jobListArray.length }">
          {{ state.jobListArray.length }}
        </div>
      </div>
      <div @click="rightArrow" class="right pagination">
        <svg width="15" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { state } from '@/util/job'

export default defineComponent({
  name: 'Pagination',
  setup(){
    const leftArrow = () => {
      state.currentPage == 1 ? '' : state.currentPage-=1
    }
    const rightArrow = () => {
      state.currentPage == state.jobListArray.length ? '' : state.currentPage+=1
    }
    return { state, leftArrow, rightArrow }
  }
});
</script>

<style>
.pagination {
  user-select: none;
  @apply border border-blue-500 h-8 w-8 cursor-pointer rounded-md text-sm text-center flex flex-row justify-center items-center mx-1 text-blue-500;
}
.pagination:hover {
  @apply text-white bg-blue-500;
}
.pagination-active {
  @apply text-white bg-blue-500;
}
</style>