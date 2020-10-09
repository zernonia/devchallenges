<template>
  <div class="main">
    <transition name="slide-toast">
      <Toast v-if="toast" :message="toastMessage" :status="toastStatus" />
    </transition>
    <transition name="slide-left" mode="out-in">
      <Upload
        v-if="uploadFiles.length == 0"
        :uploadFiles="uploadFiles"
        :handleDrop="handleDrop"
        :inputFile="inputFile"
      />
      <Progress v-else-if="!progressDone" :uploadFiles="uploadFiles" />
      <Result v-else :uploadFiles="uploadFiles" @return="resetDefault" />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import Upload from "@/components/Upload.vue";
import Progress from "@/components/Progress.vue";
import Result from "@/components/Result.vue";
import Toast from "@/components/Toast.vue";
import { Files } from "@/utils/interface";

export default defineComponent({
  name: "App",
  components: {
    Upload,
    Progress,
    Result,
    Toast
  },
  setup() {
    const dragEnterBorder = ref<boolean>(false);
    const uploadFiles = ref<Files[]>([]);
    const progressDone = ref<boolean>(false);
    const toast = ref<boolean>(false);
    const toastMessage = ref<string>("");
    const toastStatus = ref<string>("");

    const toastTrigger = (message: string, status: string) => {
      toast.value = true;
      toastMessage.value = message;
      toastStatus.value = status;
      setTimeout(() => {
        toast.value = false;
      }, 2000);
    };

    const validateImage = (image: File) => {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (validTypes.indexOf(image.type) === -1) {
        toastTrigger(`Invalid File Type`, "error");
        return false;
      }

      const maxSize = 10e6;
      if (image.size > maxSize) {
        toastTrigger(`File Size Too Large`, "error");
        return false;
      }

      return true;
    };

    const handleFiles = () => {
      uploadFiles.value.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          file.result = reader.result;
          if (typeof file.result == "string") {
            const formData = new FormData();
            formData.append(
              "upload_preset",
              process.env.VUE_APP_CLOUDINARY_PRESET
            );
            formData.append("file", file.result);

            axios
              .post(
                `https://api.cloudinary.com/v1_1/${process.env.VUE_APP_CLOUDINARY_CLOUDNAME}/upload`,
                formData,
                {
                  onUploadProgress: (progresEvent: ProgressEvent) => {
                    file.progress =
                      (progresEvent.loaded / progresEvent.total) * 100;
                  }
                }
              )
              .then(res => {
                file.url = res.data.secure_url;
                progressDone.value = true;
                toastTrigger(`Upload Successful`, "success");
              })
              .catch(e => {
                console.log(e);
              });
          }
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

    const resetDefault = () => {
      uploadFiles.value = [];
      progressDone.value = false;
    };

    return {
      uploadFiles,
      dragEnterBorder,
      progressDone,
      handleDrop,
      resetDefault,
      inputFile,
      toast,
      toastMessage,
      toastStatus
    };
  }
});
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
}

.main {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease-out;
}

.slide-left-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
.slide-left-enter-from {
  transform: translateX(20px);
  opacity: 0;
}
.slide-toast-enter-active,
.slide-toast-leave-active {
  transition: all 0.3s ease-out;
}
.slide-toast-leave-to,
.slide-toast-enter-from {
  transform: translateX(20px);
  opacity: 0;
}
</style>
