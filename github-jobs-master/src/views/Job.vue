<template>
  <section class="flex flex-col lg:flex-row my-6">
    <aside class="pr-8 ">
      <a class=" cursor-pointer text-blue-500 font-poppins flex flex-row" @click="$router.back()">
        <svg class=" mr-4 " width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>Back to search
      </a>
      <h5 class="mt-6 uppercase text-blue-500 font-bold text-sm font-poppins tracking-wider">How to apply</h5>
      <div class="mt-4 font-normal text-gray-900 how-to-apply" v-html="state.job.how_to_apply" />
    </aside>
    <main class="w-full">
      <div class=" flex flex-row items-center">
        <h1 class=" text-2xl font-bold text-gray-900 ">{{ state.job.title }}</h1> <span class=" border border-blue-500 rounded-md ml-4 text-blue-500 text-xs py-1 px-2">{{ state.job.type }}</span>
      </div>
      <h6 class=" flex flex-row items-center mt-2 text-xs text-gray-500">
        <svg width="20" class="mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ history }}
      </h6>
      <div class="flex flex-row mt-8">
        <img class=" h-16 w-16 rounded-md object-contain bg-white" v-if="state.job.company_logo" :src="state.job.company_logo" alt="">
        <div class="ml-4 text-gray-900">
          <h3 class=" font-bold text-lg">{{ state.job.company }}</h3>
          <div class=" text-gray-500 flex flex-row text-sm mt-2">
            <svg width="20" class=" mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd" />
            </svg>
            {{ state.job.location }}
          </div>
        </div>
      </div>
      <div class=" mt-6 description" v-html="state.job.description"></div>
    </main>
  </section>
</template>

<script lang="ts">
import { state } from '@/util/job';
import { computed, defineComponent, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'Job Info',
  setup(){
    const route = useRoute()
    const router = useRouter()

    const history = computed( () => {
      return state.convertTime(state.job.created_at)
    })

    onMounted( async () => {
      state.getSelectedData(route.params.id as string)
      if(!state.job) {
        await state.getSingleData(route.params.id as string)
      }    
    })
    
    return { route, router, state, history }
  }
});
</script>

<style>
.how-to-apply * {
  @apply  font-poppins ;
}
.how-to-apply a {
  @apply text-blue-500;
  overflow-wrap: anywhere;
}
.description * {
  @apply text-gray-900;
}
.description > p {
  @apply my-8;
}
.description li {
  @apply list-disc ml-6;
}
.description a {
  @apply text-blue-500;
}
</style>