<template>
  <div id="nav">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  outline: 0;
  font-family: "Raleway";
}

#app {
  width: 100vw;
  height: 100vh;
}

#nav {
  display: flex;
  flex-direction: row;
}

@media screen and (max-width: 768px) {
  #nav {
    flex-direction: column;
  }
}
</style>
