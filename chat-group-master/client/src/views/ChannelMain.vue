<template>
  <SideBar />
  <div class="w-full h-screen flex-grow flex flex-col bg-gray-900 text-white">
    <div class=" top-bar">
      <h3 class=" ml-12">Public</h3>
    </div>
    <div
      id="chat-body"
      class=" overflow-y-scroll h-auto flex-grow px-16 flex flex-col"
    >
      <div class=" flex-grow flex flex-col justify-end ">
        <div class="py-3" v-for="message in messages" :key="message.id">
          <div class=" flex flex-row justify-start items-start">
            <img
              class=" rounded-lg"
              style="width: 50px"
              v-if="message.user.photo"
              :src="message.user.photo"
              alt=""
            />
            <img
              class=" rounded-lg"
              style="width: 50px"
              v-else
              src="../assets/avatar.png"
              alt=""
            />
            <div class=" ml-6 flex flex-col">
              <span class="text-gray-500">{{ message.user.name }}</span>
              <p
                style="overflow-wrap: anywhere"
                class=" mt-1"
                v-for="msg in message.message"
                :key="msg._id"
              >
                {{ msg }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="px-16 py-3 relative">
      <textarea
        class=" bg-black w-full rounded-lg p-4 overflow-hidden pr-10"
        v-model="text"
        placeholder="Type message here..."
        name="text"
        id=""
        cols="30"
        rows="1"
        style="resize: none; max-height: 100px"
        ref="textarea"
        @input="resizeTextArea(this)"
      ></textarea>
      <svg
        width="20px"
        @click="sendMsg"
        style="transform: rotate(90deg) translate(23px, 4.75rem);"
        class="bg-blue-500 text-white h-8 w-8 p-2 cursor-pointer rounded-md absolute top-0 right-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import io, { Socket } from "socket.io-client";
import { state } from "../utils/stateUser";
import { state as stateChannel } from "../utils/stateChannel";
import { useRoute, useRouter } from "vue-router";
import SideBar from "../components/ChannelSideBar.vue";

export default defineComponent({
  components: {
    SideBar
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const socket = ref(Socket);
    const text = ref("");

    const messages = ref<any[]>([]);

    const resizeTextArea = (el: any) => {
      const area = el.$refs.textarea;
      area.style.height = "56px";
      area.style.height = area.scrollHeight + "px";
    };

    const changeRoom = (index: number) => {
      router.push(`/channel/${index}`);
      socket.value.emit("switch room", index);
      socket.value.on("update room", (rooms: string, currentRoom: string) => {
        console.log(rooms, currentRoom);
      });
    };

    const sendMsg = () => {
      if (text.value) {
        const data = {
          user: {
            name: state.name,
            photo: state.photo
          },
          message: [text.value]
        };
        const prevIndex = messages.value.length - 1;
        if (messages.value[prevIndex].user._id == state.id) {
          messages.value[prevIndex].message.push(text.value);
        } else {
          messages.value.push(data);
        }
        console.log(messages.value);

        socket.value.emit("message", text.value, state.id);
        text.value = "";
      }
    };

    const rearrangeMessage = (data: any[]) => {
      const organizedList: any[] = [];
      for (let i = 0; i < data.length; i++) {
        const message = data[i].message;
        if (i == 0) {
          data[i].message = [message];
          organizedList.push(data[i]);
        } else if (
          organizedList[organizedList.length - 1].user._id == data[i].user._id
        ) {
          organizedList[organizedList.length - 1].message.push(message);
        } else {
          data[i].message = [message];
          organizedList.push(data[i]);
        }
      }
      return organizedList;
    };

    onMounted(() => {
      socket.value = io("http://localhost:3000/channel", {
        query: {
          room: `${route.params.id}`
        }
      });
      socket.value.on("connect", () => {
        console.log("connected");
      });
      socket.value.on("fetch data", (data: any) => {
        const temp = rearrangeMessage(data.message);
        messages.value = temp;
        console.log(temp);
      });

      socket.value.on("disconnect", () => {
        console.log("disconeected");
      });

      socket.value.on("messageFromServer", (data: any) => {
        const temp = rearrangeMessage(data.message);
        messages.value = temp;
        console.log(data);
      });
    });

    return {
      state,
      stateChannel,
      changeRoom,
      sendMsg,
      text,
      messages,
      resizeTextArea
    };
  }
});
</script>

<style></style>
