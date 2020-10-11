<template>
  <teleport to="body">
    <div class="modal" @click.self="closeModal">
      <div class="delete">
        <h2 style="font-weight: 700; color: #3db46d ;">Delete this photo?</h2>
        <div v-if="!loading">
          <div>
            <input
              v-model="password"
              type="passwordLabel"
              name="delete"
              placeholder="Type in the password"
            />
            <svg
              @click="deleteImage"
              width="25"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <span id="invalidMsg" v-if="invalidMsg">{{ invalidMsg }}</span>
        </div>
        <div v-else style="width: 100%">
          <div class="progress">
            <div class="progress-bar"></div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { state } from "../utils/state";

export default defineComponent({
  name: "Delete",
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  emits: ["close"],
  setup(props, context) {
    const deletePhoto = ref<boolean>(false);
    const password = ref<string>("");
    const invalidMsg = ref<string>("");
    const loading = ref<boolean>(false);

    const closeModal = () => {
      context.emit("close");
    };

    const deleteImage = () => {
      if (password.value == "") invalidMsg.value = "Type a password";
      else {
        loading.value = true;
        invalidMsg.value = "";
        state
          .deleteImage(state.imageList[props.index]._id, password.value)
          .then(res => context.emit("close"))
          .catch(e => {
            loading.value = false;
            invalidMsg.value = "Wrong password";
            console.log(e);
          });
      }
    };
    return {
      state,
      deletePhoto,
      closeModal,
      password,
      deleteImage,
      invalidMsg,
      loading
    };
  }
});
</script>

<style>
.delete {
  padding: 2rem;
  border-radius: 15px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  box-shadow: 0px 7px 12px 0px #e4e0e0;
}
.delete > div {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.delete > div > div {
  margin-top: 1rem;
  color: #3db46d;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
}
.delete input {
  border: none;
  width: 100%;
  padding: 0.5rem;
  border-bottom: 1px solid #3db46d;
  flex-grow: 1;
  margin-right: 0.75rem;
}
.delete svg {
  cursor: pointer;
}
#invalidMsg {
  font-size: 12px;
  align-self: flex-start;
  margin-left: 12%;
  margin-top: 0.25rem;
  color: red;
}
</style>
