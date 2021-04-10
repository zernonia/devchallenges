<template>
  <div class="mt-4 px-4 md:px-8">
    <header class="my-6 text-3xl font-poppins font-bold ">Github <span class=" ml-2 font-thin">Jobs</span></header>
      <router-view>
      </router-view>
    <footer class=" text-center text-gray-500 font-poppins my-8">Zernonia @ <a href="https://www.zernonia.com">zernonia.com</a></footer>
  </div>
</template>

<style>
#app {
  display: flex;
  flex-direction: row;
  justify-content: center;
  @apply bg-gray-100 min-h-screen;
}
#app > div {
  width: 100%;
  max-width: 1000px;
}

</style>
