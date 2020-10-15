<template>
  <div>
    <section class="header overflow-hidden rounded-6xl">
      <div class="hero bg-cover h-auto p-8 sm:p-16">
        <div class="max-w-sm text-white">
          <CatLogo :width="350" color="#ffffff" />
          <h3 class="text-2xl">Get to know more about your cat breed</h3>
          <Search class="my-10" />
        </div>
      </div>
      <div class="p-8 sm:p-16 pt-10 bg-orange-200">
        <h5 class="most-search font-medium relative">Most Searched Breeds</h5>
        <div
          class="mt-6 flex flex-col md:flex-row justify-between items-baseline md:items-center"
        >
          <h1 class="">66+ Breeds For you to discover</h1>
          <span
            class="flex my-4 flex-row capitalize font-semibold cursor-pointer"
            @click="$router.push('/top-10')"
            >See More
            <svg
              class="ml-2 cursor-pointer"
              width="15"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </div>
        <div
          class="flex flex-row flex-wrap justify-center md:justify-between mt-6 relative"
        >
          <div
            v-for="(item, index) in topSearchList"
            :key="index"
            class="gallery cursor-pointer mt-6"
            @click="$router.push(`/cats/${item.breed_id}`)"
          >
            <img
              class="h-64 w-64 md:h-48 md:w-48 rounded-5xl object-cover"
              :src="item.image"
              :alt="item.name"
            />
            <h6 class="font-semibold text-sm mt-2">{{ item.name }}</h6>
          </div>
        </div>
      </div>
    </section>
    <section
      class="p-8 sm:p-16 flex flex-row flex-wrap lg:flex-no-wrap justify-between items-center"
    >
      <div class="max-w-full md:max-w-sm">
        <h1 class="section2 relative">Why should you have a cat?</h1>
        <p class="my-10">
          Having a cat around you can actually trigger the release of calming
          chemicals in your body which lower your stress and anxiety leves
        </p>
        <a
          href="https://en.wikipedia.org/wiki/Bengal_(cat)"
          target="_blank"
          class="flex flex-row capitalize font-semibold cursor-pointer mb-12"
          >Read More
          <svg
            class="ml-2 cursor-pointer"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>
      <div class="grid gap-6 grid-cols-2 g-template">
        <img src="@/assets/image 2.png" alt="" />
        <img class="row-span-2" src="@/assets/image 3.png" alt="" />
        <img
          style="width: 70%"
          class="place-self-end"
          src="@/assets/image 1.png"
          alt=""
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CatLogo from '@/components/CatLogo.vue'
import Search from '@/components/Search.vue'
// import axios from 'axios'

export default Vue.extend({
  components: {
    CatLogo,
    Search,
  },
  async fetch() {
    const topSearchList: any = await this.$http.$get(`/api/getSearchCount`)
    this.topSearchList = topSearchList.slice(0, 4)
  },
  data: () => ({
    topSearchList: [] as any[],
  }),
})
</script>

<style>
h1 {
  @apply font-bold text-4xl max-w-md;
}
.hero {
  background-image: url('~assets/HeroImagemd.png');
}
.most-search::before {
  content: '';
  height: 4px;
  width: 50px;
  position: absolute;
  bottom: -7px;
  background: black;
  border-radius: 10px;
  overflow: hidden;
}
.gallery:first-child::before {
  content: '';
  position: absolute;
  left: -7px;
  bottom: 50px;
  width: 7px;
  height: 90px;
  border-radius: 10px 0 0 10px;
  background: orange;
  z-index: 0;
}
.g-template {
  grid-template-rows: auto 1fr;
}
.section2::before {
  content: '';
  width: 50px;
  height: 3px;
  border-radius: 5px;
  background: black;
  position: absolute;
  top: -20px;
}
@media screen and (max-width: 768px) {
  .gallery:first-child::before {
    display: none;
  }
}
</style>
