<template>
  <div class=" mt-8 flex flex-row w-full justify-center">
    <svg id="loading" width="70" class="text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
  </div>
</template>

<style>
#loading {
  animation: opac infinite alternate 0.5s ease-in-out;
}

@keyframes opac {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>