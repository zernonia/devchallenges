<template>
  <teleport to="body">
    <div class="modal" @click.self="closeModal">
      <div class="upload">
        <h2 style="font-weight: 700; color: #3db46d ;">Upload your image</h2>
        <h5 style="font-size: 12px; margin-top: 0.5rem">
          File should be Jpeg, Png,...
        </h5>
        <div
          v-if="uploadFiles.length == 0"
          class="upload-input"
          @drop.prevent="handleDrop"
        >
          <input
            accept="image/*"
            type="file"
            name="upload-file"
            id="upload-file"
            @change="inputFile"
          />
          <img src="../assets/image.svg" alt="" />
          <h4>Drag & Drop your image here <br />or<br />Click to upload</h4>
        </div>
        <div class="result" v-else>
          <img :src="uploadFiles[0].result" alt="" />
          <div v-if="!loading" class="result-send">
            <div>
              <div class="result-label">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 36.5 36.5"
                  style="transform: scaleX(-1)"
                  fill="currentColor"
                >
                  <path
                    d="M34 7.404H8.323c-.817 0-1.583.399-2.051 1.069L.45 16.819a2.495 2.495 0 000 2.861l5.822 8.346a2.502 2.502 0 002.051 1.069H34a2.5 2.5 0 002.5-2.5V9.903A2.5 2.5 0 0034 7.404zM7.23 20.793a2.541 2.541 0 11.039-5.084 2.542 2.542 0 11-.039 5.084z"
                  />
                </svg>
                <input
                  v-model="uploadLabel"
                  type="text"
                  name="label"
                  placeholder="Label the picture"
                />
              </div>
              <span v-if="invalidLabel">Invalid Label</span>
              <div class="result-label" style="margin-top: 0.5rem">
                <svg
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <input
                  v-model="uploadPassword"
                  type="text"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <span v-if="invalidPassword">Invalid Password</span>
            </div>
            <a @click="uploadButton"
              ><svg
                width="17"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448.011 448.011"
              >
                <path
                  d="M438.731 209.463l-416-192c-6.624-3.008-14.528-1.216-19.136 4.48a15.911 15.911 0 00-.384 19.648l136.8 182.4-136.8 182.4c-4.416 5.856-4.256 13.984.352 19.648 3.104 3.872 7.744 5.952 12.448 5.952 2.272 0 4.544-.48 6.688-1.472l416-192c5.696-2.624 9.312-8.288 9.312-14.528s-3.616-11.904-9.28-14.528z"
                /></svg
            ></a>
          </div>
          <div v-else style="width: 100%">
            <div class="progress">
              <div class="progress-bar"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Files } from "@/utils/interface";
import { state } from "@/utils/state";

export default defineComponent({
  name: "Upload",
  emits: ["close"],
  setup(props, context) {
    const uploadFiles = ref<Files[]>([]);
    const uploadLabel = ref<string>("");
    const uploadPassword = ref<string>("");
    const loading = ref<boolean>(false);
    const invalidLabel = ref<boolean>(false);
    const invalidPassword = ref<boolean>(false);

    const closeModal = () => {
      context.emit("close");
    };

    const uploadButton = () => {
      if (uploadLabel.value == "") invalidLabel.value = true;
      else invalidLabel.value = false;
      if (uploadPassword.value == "") invalidPassword.value = true;
      else invalidPassword.value = false;
      if (
        typeof uploadFiles.value[0].result == "string" &&
        uploadLabel.value != "" &&
        uploadPassword.value != ""
      ) {
        loading.value = true;
        state
          .uploadImage(
            uploadFiles.value[0].result,
            uploadPassword.value,
            uploadLabel.value
          )
          .then(res => context.emit("close"))
          .catch(e => {
            console.log(e);
            loading.value = false;
            invalidLabel.value = false;
            invalidPassword.value = false;
          });
      }
    };

    const validateImage = (image: File) => {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (validTypes.indexOf(image.type) === -1) {
        return false;
      }

      const maxSize = 10e6;
      if (image.size > maxSize) {
        return false;
      }

      return true;
    };

    const handleFiles = () => {
      uploadFiles.value.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          file.result = reader.result;
        };
        reader.readAsDataURL(file.file);
      });
    };

    const inputFile = (e: InputEvent) => {
      const input = e.target as HTMLInputElement;
      if (input.files) {
        for (let i = 0; i < input.files.length; i++) {
          const file = input.files[i];
          const valid = validateImage(file);
          if (valid) {
            uploadFiles.value.push({
              file: input.files[i],
              progress: 0,
              result: "",
              url: ""
            });
          }
        }
        handleFiles();
      }
    };

    const handleDrop = (e: DragEvent) => {
      if (e.dataTransfer) {
        if (e.dataTransfer.items) {
          for (let i = 0; i < e.dataTransfer.items.length; i++) {
            if (e.dataTransfer.items[i].kind === "file") {
              const file = e.dataTransfer.items[i].getAsFile() as File;
              const valid = validateImage(file);
              if (valid) {
                uploadFiles.value.push({
                  file,
                  progress: 0,
                  result: "",
                  url: ""
                });
              }
            }
          }
          handleFiles();
        } else {
          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            const file = e.dataTransfer.files[i];
            const valid = validateImage(file);
            if (valid) {
              uploadFiles.value.push({
                file: e.dataTransfer.files[i],
                progress: 0,
                result: "",
                url: ""
              });
            }
          }
          handleFiles();
        }
      }
    };

    return {
      handleDrop,
      inputFile,
      closeModal,
      uploadFiles,
      uploadLabel,
      uploadPassword,
      uploadButton,
      loading,
      invalidLabel,
      invalidPassword,
      state
    };
  }
});
</script>

<style>
.modal {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.349);
}
.upload {
  background: white;
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
  background-image: url("data:image/svg+xml,<svg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'><rect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='%233db46dFF' stroke-width='3' stroke-dasharray='6%2c 14' stroke-dashoffset='43' stroke-linecap='square'/></svg>");
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
  background-color: #3db46d25;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='%233db46dFF' stroke-width='3' stroke-dasharray='6%2c 14' stroke-dashoffset='43' stroke-linecap='square'/%3e%3c/svg%3e");
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
.result {
  width: auto;
  height: auto;
  max-height: 500px;
  margin-top: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.result > img {
  width: 100%;
  object-fit: contain;
  border-radius: 15px;
  max-height: 400px;
}
.result-send {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
}
.result-send > div {
  flex-grow: 1;
  margin-right: 1rem;
}
.result-send > a {
  fill: currentColor;
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3db46d;
  cursor: pointer;
}
.result-send span {
  font-size: 10px;
  margin-left: 30px;
  color: red;
}
.result-label {
  display: flex;
  flex-direction: row;
  align-items: center;
  /* border: 1px solid #3db46d; */
  color: #3db46d;
  /* padding: 0.5rem 1rem; */
}
.result-label > input {
  border: none;
  width: 100%;
  padding: 0.5rem;
  margin: 0 0.5rem;
  border-bottom: 1px solid #3db46d;
  border-radius: 0;
}
.progress {
  margin-top: 2rem;
  width: 100%;
  background: #e0ebe4;
  border-radius: 5px;
  position: relative;
  height: 10px;
  overflow: hidden;
}

.progress-bar {
  width: 30%;
  height: 10px;
  background: #3db46d;
  border-radius: 5px;
  position: absolute;
  top: 0;
  animation: loading 2s infinite linear;
}

@keyframes loading {
  0% {
    left: -30%;
  }
  100% {
    left: 100%;
  }
}
</style>
