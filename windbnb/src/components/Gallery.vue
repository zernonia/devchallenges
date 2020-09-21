<template>
  <div class=" content">
    <div class="content-header">
      <h1>Stays in Finland</h1>
      <h5>{{ galleryCount }} stays</h5>
    </div>
    <div class="gallery" v-if="galleryCount">
      <div v-for="(item, index) in filteredGallery" :key="index" class="gallery-item">
        <img :src="item.photo" alt="">
        <div class="item-info">
          <div class="item-header">
            <div class="flex-row-center">
              <h4 v-if="item.superHost">Super Host</h4>
              <h5>{{ item.type }}  {{ item.beds ? `. ${item.beds} beds` : '' }}</h5>
            </div>
            <div class="item-rating">
              <svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {{ item.rating }}
            </div>
          </div>
          <h6>{{ item.title }}</h6>
        </div>
      </div>
    </div>
    <div class="no-result" v-else>
      Opps.. Not results found
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import getGallery from '../store/gallery'
import { filterStore as filter } from '../store/filter'

export default {
  setup(){

    const { gallery , getGalleryItem } = getGallery()

    onMounted(getGalleryItem)
    
    const filteredGallery = computed( () => {
      let filteredLocation, filteredMaxGuests
      if(filter.stringForFilterLocation) {
        filteredLocation = gallery.value.filter( item => `${item.city}, ${item.country}` == filter.stringForFilterLocation)
      } else {
        filteredLocation = gallery.value
      }
      if(filter.totalGuest()) {
        filteredMaxGuests = filteredLocation.filter( item => item.maxGuests >= filter.totalGuest())
      } else {
        filteredMaxGuests = filteredLocation
      }
      return filteredMaxGuests
    })

    const galleryCount = computed( () => {
      return filteredGallery.value.length
    })
    return {
      gallery,
      galleryCount,
      getGalleryItem,
      filter,
      filteredGallery
    }
  }
}
</script>

<style>
.content {
  margin-top: 3rem;
}
.content-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}
.content-header h1 {
  font-size: clamp(18px, 2vw, 24px);
}
.content-header h5 {
  font-weight: 500;
  font-size: clamp(12px, 2vw, 14px);
}
.gallery {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: clamp(15px, 3vw, 30px);
  grid-row-gap: 40px;
}
.gallery-item {
  display: flex;
  flex-direction: column;
}
.gallery img {
  width: 100%;
  border-radius: 25px;
  height: 250px;
  object-fit: cover;
}
.item-info {
  margin-top: 1rem;
}
.item-info h4 {
  font-weight: bold;
  font-size: clamp(10px, 2vw, 12px);
  text-transform: uppercase;
  color: var(--text-super-host);
  border: solid 2px var(--text-super-host);
  border-radius: 15px;
  padding: 7px 14px;
  margin-right: 0.5rem;
}
.item-info h5 {
  font-weight: 500;
  font-size: clamp(12px, 2vw, 14px);
  color: var(--text-alt);
}
.item-info h6 {
  margin-top: 0.5rem;
  font-weight: 500;
  font-size: clamp(12px, 2vw, 14px);
}
.item-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.item-rating {
  justify-self: self-end ;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 500;
  font-size: clamp(12px, 2vw, 14px);
}
.item-rating svg {
  margin-right: 0.25rem;
  color: rgba(235, 87, 87, 0.72);
}
.no-result {
  margin-top : 5rem;
  font-size: 28px;
  text-align: center;
}

@media screen and (max-width: 1024px) {
.gallery {
  grid-template-columns: repeat(2, 1fr);
}
}
@media screen and (max-width: 768px) {
.gallery {
  grid-template-columns: repeat(1, 1fr);
}
.gallery img {
  height: 50vw;
}
}
@media screen and (max-width: 425px) {
body{
  padding:2rem !important;
}
}
</style>