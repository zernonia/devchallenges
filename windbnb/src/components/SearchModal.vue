<template>
  <div class="modal" @click.self="closeModal">
    <div class="modal-content">
      <div>
        <div class="user-input">
          <div id="select-location" :class="{ highlight : openLocationList }" @click="openLocationList = true" >
            <h6>Location</h6>
            <input type="text" @input="typingLocation" v-model="stringForFilterLocation" placeholder="Search a location">
          </div>
          <div id="select-guest" :class="{ highlight : openGuestList }" @click="openGuestList = true">
            <h6>Guests</h6>
            <div placeholder="Search a location">{{ totalGuest ? `${totalGuest} guests` : `${totalGuest} guest` }} </div>
          </div>
          <div id="select-submit" @click="update" class="flex-row-center">
            <svg width="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </div>
        </div>
        <div class="user-selection">
          <div id="selection-location" >
            <div v-if="openLocationList">
              <div @click="selectLocation(index)" v-for="(item, index) in galleryLocationList" :key="index">
                <svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                {{ item }}
              </div>
            </div>
          </div>
          <div id="selection-guest" >
            <div v-if="openGuestList">
              <h5>Adults</h5>
              <h6>Ages 13 or above</h6>
              <InputNumber :count="numberOfAdult" @minus="numberOfAdult==0 ? '' : numberOfAdult--" @add="numberOfAdult++"  />
            </div>
            <div v-if="openGuestList">
              <h5>Children</h5>
              <h6>Ages 13 or above</h6>
              <InputNumber :count="numberOfKid" @minus="numberOfKid==0? '' : numberOfKid--" @add="numberOfKid++"  />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { filterStore as filter } from '../store/filter'
import getGallery from '../store/gallery'
import InputNumber from '../components/InputNumber'

import { onMounted } from 'vue'
export default {
  components: {
    InputNumber
  },
  setup() {
    const { galleryLocationList, getGalleryItem } = getGallery()
    onMounted(getGalleryItem)
    
    return { filter,  galleryLocationList}
  },
  methods:{
    update(){
      console.log('firing')
      filter.updateFilter(this.stringForFilterLocation, this.numberOfAdult, this.numberOfKid)
      this.$emit('close')
    },
    closeModal(){
      this.$emit('close')
    },
    selectLocation(index){
      this.stringForFilterLocation = this.galleryLocationList[index]
      this.openLocationList = false
    },
    typingLocation(e){
      console.log(e);
    },
    outside(){
      this.openGuestList = false
    }
  },
  data: () => ({
    stringForFilterLocation: '',
    numberOfAdult : 0,
    numberOfKid : 0,
    openLocationList: false,
    openGuestList: false
  }),
  computed: {
    totalGuest() {
      return this.numberOfAdult + this.numberOfKid
    },
  },
  mounted(){
    filter.stringForFilterLocation ? this.stringForFilterLocation = filter.stringForFilterLocation : ''
    filter.numberOfAdult ? this.numberOfAdult = filter.numberOfAdult : ''
    filter.numberOfKid ? this.numberOfKid = filter.numberOfKid : ''

    let location = document.getElementById('select-location')
    let locationSelection = document.getElementById('selection-location')

    let guest = document.getElementById('select-guest')
    let guestSelection = document.getElementById('selection-guest')
    
    document.addEventListener('click', (e) => {
      if(this.openLocationList) {
        if (!(e.path.indexOf(location) != -1 || e.path.indexOf(locationSelection) != -1)) {
          this.openLocationList = false
        }
      }

      if(this.openGuestList) {
        if (!(e.path.indexOf(guest) != -1 || e.path.indexOf(guestSelection) != -1)) {
          this.openGuestList = false
        }
      }
    })
  },
  unmounted(){
    document.removeEventListener('click', () => {
    })
  }
}
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(119, 119, 119, 0.308);
  z-index: 10;
}
.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 4rem;
  height: 400px;
  background: var(--backg);
}
.modal-content > div {
  max-width: 1200px;
  width: 100%;
  height: 350px;
}
.user-input , .user-selection {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 3fr 3fr 1fr;
}
.user-input {
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  cursor: pointer;
  overflow: hidden;
}
.user-input > div{
  padding: 0.75rem 1.5rem ;
}
#select-location h6, #select-guest h6 {
  font-family: Mulish;
  font-style: normal;
  font-weight: 800;
  font-size: 9px;
  line-height: 11px;
  text-transform: uppercase;
}
#select-location {
  border-radius: 15px 0 0 15px;
}
#select-location, #select-guest {
  background-color: var(--search);
}
#select-location input, #select-guest div{
  width: 100%;
  border: none;
  font-family: Mulish;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  margin-top: 0.5rem;
  background: transparent;
  color: var(--text);
}
#select-location input:focus {
  outline: none;
  border: none;
}
#select-location input::placeholder {
  color: var(--text-alt);
}
#select-guest {
  border-left: 1px solid var(--shadow);
  border-right: 1px solid var(--shadow);
}
#select-submit {
  background:  rgba(235, 87, 87, 0.9);
  color: white;
  justify-content: center;
}
#select-submit svg {
  margin-right: 0.5rem;
}
#selection-location, #selection-guest {
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: start ;
}
#selection-location div > div, #selection-guest > div {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1.25rem 1.5rem;
  font-family: Mulish;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  cursor: pointer;
  border-radius: 15px ;
}
#selection-location div div:hover {
  background: var(--shadow);
}
#selection-location svg {
  margin-right: 0.5rem;
  color:  rgba(235, 87, 87, 0.9);
}
#selection-guest > div {
  flex-direction: column;
  align-items: flex-start;
}
#selection-guest div h5, #selection-guest div h6  {
  font-family: Mulish;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
}
#selection-guest div h6 {
  color: rgb(202, 202, 202);
}
.highlight {
  box-shadow: inset 0px 0px 3px 1px #da1313;
}
@media screen and (max-width: 768px){
.modal {
  margin-top: 0;
}
}
@media screen and (max-width: 425px) {
.user-input, .user-selection {
  display: flex;
  flex-direction: column;
  position: relative;
}
.modal-content {
  height: 450px;
  justify-content: start;
  padding: 3rem;
}
#select-location  {
  border-radius: 15px 15px 0 0;
}
#selection-guest {
  border-radius: 0;
  position: absolute;
  top: 0;
  left: 0;
}
#select-guest {
  border-top: 1px solid var(--shadow);
  border-bottom: 1px solid var(--shadow);
  border-left: 0;
  border-right: 0;
  }
}
</style>