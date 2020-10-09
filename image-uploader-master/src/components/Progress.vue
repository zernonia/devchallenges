<template>
  <div class="upload">
    <div class="progress-heading">
      <h3 style="font-weight: 500">Uploading</h3>
    </div>
    <div id="progress-container">
      <div id="progress"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Files } from "@/utils/interface";
import { defineComponent, computed, watch } from "vue";

export default defineComponent({
  name: "Result",
  props: {
    uploadFiles: {
      type: Array as () => Array<Files>,
      required: true
    }
  },
  setup(props) {
    const currentWidth = computed(() => {
      let sum = 0;
      props.uploadFiles.forEach(file => (sum += file.progress));
      return sum;
    });
    const setWidth = () => {
      const bar = document.getElementById("progress") as HTMLDivElement;
      bar.style.width = props.uploadFiles[0].progress + "%";
    };
    watch(currentWidth, setWidth);
  }
});
</script>

<style>
#progress-container {
  margin-top: 1rem;
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: rgb(191, 230, 243);
  display: relative;
}
#progress {
  background: blue;
  height: 8px;
  display: absolute;
  top: 0;
  left: 0;
  border-radius: 5px;
  transition: width 0.3s;
}
</style>
