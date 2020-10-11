<template>
  <div>
    <div class="gallery">
      <div
        class="gallery-image"
        v-for="(image, index) in state.searchImageList()"
        :key="image._id"
      >
        <div id="vignette"></div>
        <span id="label">{{ image.label }}</span>
        <span @click="deleteThisImage(index)" id="delete">Delete</span>
        <img :src="image.url" :alt="image.label" />
      </div>
    </div>

    <Delete
      v-if="showDeleteModal"
      @close="showDeleteModal = false"
      :index="deleteImageIndex"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { state } from "../utils/state";
import Delete from "@/components/Delete.vue";

interface Grid {
  _el: Element;
  gap: number;
  items: ChildNode[];
  ncol: number;
}

export default defineComponent({
  name: "Gallery",
  components: {
    Delete
  },
  setup() {
    const imageReady = ref<boolean>(false);
    const grids = ref<Element[]>([]);
    const gridsFormat = ref<Grid[]>([]);
    const showDeleteModal = ref<boolean>(false);
    const deleteImageIndex = ref<number>(0);
    const deleteThisImage = (index: number) => {
      showDeleteModal.value = true;
      deleteImageIndex.value = index;
    };

    const layout = () => {
      if (grids.value.length) {
        gridsFormat.value = grids.value.map(grid => {
          return {
            _el: grid,
            gap: parseFloat(getComputedStyle(grid).gridRowGap),
            items: [...grid.childNodes].filter(c => c.nodeType === 1),
            ncol: 0
          } as Grid;
        });
      }

      gridsFormat.value.forEach(grid => {
        /* get the post relayout number of columns */
        const ncol = getComputedStyle(grid._el).gridTemplateColumns.split(" ")
          .length;

        /* if the number of columns has changed */
        if (grid.ncol !== ncol) {
          /* update number of columns */
          grid.ncol = ncol;
          /* revert to initial positioning, no margin */
          grid.items.forEach(c => {
            const child = c as HTMLElement;
            child.style.removeProperty("margin-top");
          });
          if (grid.ncol > 1) {
            grid.items.slice(ncol).forEach((c, i) => {
              const child = c as HTMLElement;
              const gridItem = grid.items[i] as HTMLElement;
              const prevFin = gridItem.getBoundingClientRect()
                  .bottom /* bottom edge of item above */,
                currIni = child.getBoundingClientRect()
                  .top /* top edge of current item */;

              child.style.marginTop = `${prevFin + grid.gap - currIni}px`;
            });
          }
        }
      });
      imageReady.value = true;
    };

    watch(
      () => state.searchImageList(),
      () => {
        setTimeout(() => {
          grids.value = [...document.querySelectorAll(".gallery")];
          layout();
        }, 10);
      }
    );

    onMounted(() => {
      setTimeout(() => {
        grids.value = [...document.querySelectorAll(".gallery")];
        layout(); /* initial load */
      }, 100);
    });

    return {
      state,
      imageReady,
      showDeleteModal,
      deleteThisImage,
      deleteImageIndex
    };
  }
});
</script>

<style>
.gallery {
  margin-top: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, min(19rem, 100%));
  /* grid-template-rows: masonry; */
  justify-content: center;
  grid-gap: 1.5rem;
  padding: 0.5rem;
}
.gallery-image {
  width: min(19rem, 100%);
  height: fit-content;
  position: relative;
  border-radius: 15px;
  /* width: 33%; */
}
.gallery-image img {
  width: 100%;
  border-radius: 15px;
  display: block;
}
.ready {
  opacity: 1;
}
.gallery-image:hover #vignette,
.gallery-image:hover #label,
.gallery-image:hover #delete {
  display: block;
}
#vignette {
  display: none;
  height: 100%;
  width: 100%;
  border-radius: 15px;
  position: absolute;
  top: 0;
  box-shadow: 0 0 60px 3px rgba(0, 0, 0, 0.637) inset;
}
#label {
  display: none;
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 0.5rem;
  color: white;
  font-size: 14px;
}
#delete {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 12px;
  padding: 0.5rem;
  border-radius: 10px;
  background: #3db46d;
  color: white;
  margin: 0.25rem;
  cursor: pointer;
}
</style>
