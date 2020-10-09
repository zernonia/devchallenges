import { reactive } from 'vue'

export const filterStore = reactive({
  stringForFilterLocation : '',
  numberOfAdult: 0,
  numberOfKid : 0,
  totalGuest : () => filterStore.numberOfAdult + filterStore.numberOfKid,

  updateFilter: (location, numberOfAdult, numberOfKid) => {
    filterStore.stringForFilterLocation = location
    filterStore.numberOfAdult = numberOfAdult
    filterStore.numberOfKid = numberOfKid
  }
})