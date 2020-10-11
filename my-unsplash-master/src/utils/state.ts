import { reactive } from "vue";
import { ImageType } from "./interface";
import axios from "axios";

export const state = reactive({
  imageList: [] as ImageType[],
  password: "" as string,
  searchTerm: "" as string,
  searchImageList: (): ImageType[] => {
    if(!state.searchTerm.match(/^[a-zA-Z0-9_.-]*$/)) return []
    const re = new RegExp(`${state.searchTerm}`, 'i');
    if(state.searchTerm == "") return state.imageList
    else {
      return state.imageList.filter((image: ImageType) => {
        if(image.label == undefined) return false
        else {
          const str = image.label.search(re)
          if(str != -1) return true
        };
      });
    }
  },
  getImages: () => {
    return new Promise(function(resolve, reject) {
      axios
        .get("/api/getImages")
        .then((res) => {
          state.imageList = res.data;
          resolve("");
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  deleteImage: (_id: string, password: string) => {
    return new Promise(function(resolve, reject) {
      axios
        .post("/api/deleteImage", {
          _id,
          password,
        })
        .then((res) => {
          state
            .getImages()
            .then((res) => resolve(""))
            .catch((e) => {
              reject(e);
            });
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  uploadImage: (file: string, password: string, label: string) => {
    return new Promise(function(resolve, reject) {
      axios
        .post("/api/uploadImage", {
          file,
          password,
          label,
        })
        .then((res) => {
          state
            .getImages()
            .then((res) => resolve(""))
            .catch((e) => {
              reject(e);
            });
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
});
