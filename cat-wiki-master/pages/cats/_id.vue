<template>
  <div>
    <main class="flex flex-col md:flex-row px-8 sm:px-16 py-6">
      <div class="w-1/2 md:w-1/3 md:mr-10">
        <img
          class="block rounded-5xl object-cover"
          :src="catImage"
          :alt="catInfo.alt_names"
        />
      </div>
      <div class="mt-8 md:mt-0 flex flex-col md:ml-10 md:w-2/3">
        <h2 class="font-semibold text-4xl">{{ catInfo.name }}</h2>
        <p class="my-6">{{ catInfo.description }}</p>
        <p id="temperament">
          <span class="font-bold mr-4">Temperament: </span>
          {{ catInfo.temperament }}
        </p>
        <p id="origin">
          <span class="font-bold mr-4">Origin: </span> {{ catInfo.origin }}
        </p>
        <p id="life_span">
          <span class="font-bold mr-4">Life Span: </span>
          {{ catInfo.life_span }}
        </p>
        <div class="grid rating">
          <p id="adaptability">Adaptability:</p>
          <div class="flex items-center">
            <span
              v-for="i in 5"
              :key="i"
              class="rating-bar mx-1"
              :class="[i <= catInfo.adaptability ? 'highlight' : '']"
            ></span>
          </div>
          <p id="affection_level:">Affection level:</p>
          <div class="flex items-center">
            <span
              v-for="i in 5"
              :key="i"
              :class="[i <= catInfo.affection_level ? 'highlight' : '']"
              class="rating-bar mx-1"
            ></span>
          </div>
          <p id="child_friendly:">Child Friendly:</p>
          <div class="flex items-center">
            <span
              v-for="i in 5"
              :key="i"
              :class="[i <= catInfo.child_friendly ? 'highlight' : '']"
              class="rating-bar mx-1"
            ></span>
          </div>
          <p id="grooming:">Grooming:</p>
          <div class="flex items-center">
            <span
              v-for="i in 5"
              :key="i"
              :class="[i <= catInfo.grooming ? 'highlight' : '']"
              class="rating-bar mx-1"
            ></span>
          </div>
          <p id="intelligence:">Intelligence:</p>
          <div class="flex items-center">
            <span
              v-for="i in 5"
              :key="i"
              :class="[i <= catInfo.intelligence ? 'highlight' : '']"
              class="rating-bar mx-1"
            ></span>
          </div>
          <p id="health_issues:">Health issues:</p>
          <div class="flex items-center">
            <span
              v-for="i in 5"
              :key="i"
              :class="[i <= catInfo.health_issues ? 'highlight' : '']"
              class="rating-bar mx-1"
            ></span>
          </div>
          <p id="social_needs:">Social needs:</p>
          <div class="flex items-center">
            <span
              v-for="i in 5"
              :key="i"
              :class="[i <= catInfo.social_needs ? 'highlight' : '']"
              class="rating-bar mx-1"
            ></span>
          </div>
          <p id="stranger_friendly:">Stranger friendly:</p>
          <div class="flex items-center">
            <span
              v-for="i in 5"
              :key="i"
              :class="[i <= catInfo.stranger_friendly ? 'highlight' : '']"
              class="rating-bar mx-1"
            ></span>
          </div>
        </div>
      </div>
    </main>
    <figure class="p-8 sm:p-16">
      <h2 class="font-semibold text-4xl">Other photos</h2>
      <div class="grid gallery gap-6 mt-4">
        <img
          v-for="(item, index) in catGallery"
          :key="index"
          class="w-full h-64 md:h-full place-self-center object-cover rounded-5xl"
          :src="item.url"
        />
      </div>
    </figure>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import Vue from 'vue'
export default Vue.extend({
  async fetch() {
    const response: any = await this.$http.$get(
      `/api/getCatImages/${this.$route.params.id}`
    )
    this.catInfo = response[0].breeds[0]
    this.catGallery = response

    const response2: any = await this.$http.$get(
      `/api/updateSearchCount/${this.$route.params.id}`
    )
    this.catImage = response2.image
  },
  data: () => ({
    catInfo: {},
    catGallery: [],
    catImage: '',
  }),
})
</script>

<style>
.image-box {
  width: 350px;
  height: 350px;
}
.rating {
  grid-template-columns: 200px 1fr;
}
.rating > p {
  @apply font-bold;
}
.rating-bar {
  width: 45px;
  height: 8px;
  border-radius: 5px;
  @apply bg-orange-200;
}
.highlight {
  @apply bg-gray-800;
}
@media screen and (max-width: 640px) {
  .rating {
    grid-template-columns: 100px 1fr;
    column-gap: 20px;
  }
  .rating-bar {
    width: 35px;
  }
}
</style>

<style scoped>
p {
  @apply my-3;
}
.gallery {
  grid-template: repeat(auto-fill, minmax(200px, 1fr)) / repeat(
      auto-fill,
      minmax(200px, 1fr)
    );
}
</style>
