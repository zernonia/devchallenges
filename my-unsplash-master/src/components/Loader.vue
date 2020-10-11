<template>
  <div class="loader">
    <div class="progress">
      <div class="progress-bar"></div>
    </div>
  </div>
</template>

<style>
.loader {
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.loader > div {
  width: 50%;
}
</style>
