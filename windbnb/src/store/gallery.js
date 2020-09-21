import { ref, computed } from 'vue'
import stays from '../assets/stays.json'

export default function getGallery() {
  const gallery = ref([])
  const galleryCount = computed( () => gallery.value.length)


  const galleryLocationList = computed( () => {
    const tempList = []
    gallery.value.forEach( item => {
      let location = `${item.city}, ${item.country}`
      if(tempList.indexOf(location) == -1) {
        tempList.push(location)
      }
    })

    return tempList
  })

  const getGalleryItem = async () => {
    gallery.value = await stays
  }

  return {
    gallery,
    galleryCount,
    galleryLocationList,
    getGalleryItem
  }
}