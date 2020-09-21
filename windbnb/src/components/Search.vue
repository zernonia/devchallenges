<template>
  <div class="search" @click="this.$emit('open')">
    <div id="location"> {{ filter.stringForFilterLocation ? filter.stringForFilterLocation : 'Search location' }}</div>
    <div class="guest">
      <span>{{ filter.totalGuest() > 0 ? `${filter.totalGuest()} Guests` : 'Add Guests'}}</span>
    </div>
    <div class="search-icon">
      <svg width="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  </div>
</template>

<script>
import { filterStore as filter } from '../store/filter'

export default {
  setup(){
    return { filter }
  }
}
</script>

<style>
.search {
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 500px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  font-family: Mulish;
  font-style: normal;
  font-weight: normal;
  font-size: clamp(12px, 4vw ,14px);
  cursor: pointer;
  background-color: var(--search) ;
}
.search > div {
  padding: 0rem 0.75rem;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#location {
  width: 150px;
  font-family: Mulish;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  justify-content: start;
}
.guest {
  border-left: 1px solid var(--shadow);
  border-right: 1px solid var(--shadow);
  width: 100px;
  
}
.guest span {
  color: #BDBDBD;
  font-weight: normal;
  font-family: Mulish;
  font-style: normal;
  font-weight: normal;
  font-size: clamp(12px, 4vw ,14px);
}
.search-icon {
  color: var(--svg);
}
@media screen and (max-width: 425px) {
.search {
  width: 300px;
}
}
</style>