<template>
  <div class="upload result">
    <div class="result-heading">
      <svg
        style="fill: blue; margin-bottom: 0.5rem"
        width="40"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clip-rule="evenodd"
        />
      </svg>
      <h3>Upload Success</h3>
    </div>
    <div
      v-for="(file, index) in uploadFiles"
      :key="index"
      class="result-content"
    >
      <img class="img" :src="file.url" alt="" />
      <div class="result-button">
        <input class="input" type="text" :value="file.url" />
        <div>
          <svg
            @click="copyToClipboard(index)"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
          <svg
            @click="downloadImage(index)"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style="margin-left: 0.25rem"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="result-back" @click="returnMain">
      <svg
        width="20"
        style="margin-right: 0.5rem"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 16l-4-4m0 0l4-4m-4 4h18"
        />
      </svg>
      <span>Upload More...</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Files } from "@/utils/interface";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Result",
  props: {
    uploadFiles: {
      type: Array as () => Array<Files>,
      required: true
    }
  },
  emits: ["return"],
  setup(props, context) {
    const copyToClipboard = async (index: number) => {
      if (!navigator.clipboard) return;

      try {
        await navigator.clipboard.writeText(props.uploadFiles[index].url);
      } catch (e) {
        console.log(e);
      }
    };

    const downloadImage = async (index: number) => {
      const a = document.createElement("a");
      a.href = props.uploadFiles[index].result as string;
      a.download = `image-${index}`;
      a.click();
    };

    const returnMain = () => {
      context.emit("return");
    };
    return {
      copyToClipboard,
      downloadImage,
      returnMain
    };
  }
});
</script>

<style>
.result-content {
  margin: 1rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.img {
  width: 100%;
  height: auto;
  object-fit: contain;
  background: rgba(243, 243, 243, 0.363);
  border-radius: 15px;
}

.result-button {
  width: 100%;
  margin-top: 0.75rem;
  display: flex;
  flex-direction: row;
  border: 1px solid lightgray;
  border-radius: 12px;
  padding: 0.25rem 0.5rem;
  justify-content: space-between;
  align-items: center;
}
.input {
  border: none;
  flex-grow: 1;
  padding-right: 0.75rem;
  /* width: calc(100% - 1rem); */
}
.result-button > div {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.result-button > div > svg {
  color: white;
  background: blue;
  padding: 0.5rem;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.25s;
}
.result-button > div > svg:hover {
  background: rgb(126, 126, 255);
  transition: background 0.25s;
}
.result-heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.result-back {
  cursor: pointer;
  color: blue;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
