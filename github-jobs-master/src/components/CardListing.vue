<template>
  <div class=" cursor-pointer flex flex-row bg-white p-6 sm:p-2 rounded-lg shadow-sm w-full mb-4">
    <div
      class=" h-24 w-24 rounded-md object-contain bg-white flex flex-row justify-center items-center"
    >
      <img class="rounded-md overflow-hidden" v-if="data.company_logo" :src="data.company_logo" alt="" />
      <h5 v-else class=" text-xs text-gray-500">not found</h5>
    </div>
    <div class="info flex flex-col flex-grow text-blue-900 ml-4">
      <h5 class=" font-semibold text-sm">{{ data.company }}</h5>
      <h3 class=" text-lg my-1 leading-8">{{ data.title }}</h3>
      <div class="info-sub flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h6
          class=" text-xs border-blue-900 border rounded-md py-1 px-3 font-bold"
          style="width: fit-content;"
        >
          {{ data.type }}
        </h6>
        <div class="flex flex-col sm:flex-row sm:items-center mt-2 sm:mt-0">
          <div class="info-location flex flex-row text-xs text-blue-500">
            <svg
              width="16"
              class="mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                clip-rule="evenodd"
              />
            </svg>
            {{ data.location }}
          </div>
          <div class="info-history sm:mx-2 flex flex-row text-xs text-blue-500">
            <svg
              width="16"
              class="mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {{ history }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Job } from "@/util/interface";
import { state } from '@/util/job';
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  name: "CardListing",
  props: {
    data: {
      type: Object as PropType<Job>,
      required: true,
    },
  },
  setup(props){
    const history = computed( () => {
     return state.convertTime(props.data.created_at)
    })
    return {
      history
    }
  }
});
</script>
