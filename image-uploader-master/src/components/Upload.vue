<template>
  <div class="upload">
    <h2 style="font-weight: 500; color: blue">Upload your image</h2>
    <h5 style="font-size: 12px; margin-top: 0.5rem">
      File should be Jpeg, Png,...
    </h5>
    <div
      class="upload-input"
      :class="{ 'drag-enter-border': dragEnterBorder }"
      @drop.prevent="handleDrop"
    >
      <input
        multiple
        accept="image/*"
        type="file"
        name="upload-file"
        id="upload-file"
        @change="inputFile"
      />
      <img src="../assets/image.svg" alt="" />
      <h4>Drag & Drop your image here <br />or<br />Click to upload</h4>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
// import { Files } from "@/utils/interface";

export default defineComponent({
  name: "Upload",
  props: {
    uploadFiles: {
      type: Array,
      required: true
    },
    dragEnterBorder: {
      type: Boolean,
      default: false
    },
    handleDrop: {
      type: Function as PropType<() => void>
    },
    inputFile: {
      type: Function as PropType<() => void>
    }
  }
});
</script>

<style>
.upload {
  width: 400px;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0px 7px 12px 0px #e4e0e0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.upload-input {
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='%230501FFFF' stroke-width='3' stroke-dasharray='6%2c 14' stroke-dashoffset='43' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 15px;
  margin-top: 2rem;
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.upload-input:hover {
  background-color: #caf4ff38;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='%238684FFFF' stroke-width='3' stroke-dasharray='6%2c 14' stroke-dashoffset='43' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 15px;
}
.upload-input > input {
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
}
.upload-input > h4 {
  color: rgb(192, 192, 192);
  text-align: center;
  font-size: 12px;
  margin-top: 2rem;
}
.drag-enter-border {
  border: 1px solid black;
}
</style>
