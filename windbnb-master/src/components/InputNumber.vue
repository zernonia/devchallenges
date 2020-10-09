<template>
  <div class="input-number flex-row-center">
    <svg @click="this.$emit('minus')" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
    </svg>
    <span>{{ count }}</span>
    <svg @click="this.$emit('add')" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    count: Number
  },
}
</script>

<style>
.input-number {
  margin: 1.5rem 0 0 0;
  width: 100px;
  justify-content: space-between;
}
.input-number svg{
  border: 2px solid rgb(156, 156, 156);
  border-radius: 5px;
  color: rgb(156, 156, 156);
  cursor: pointer;
}
.input-number span {
  font-family: Mulish;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
}
.input-number {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>