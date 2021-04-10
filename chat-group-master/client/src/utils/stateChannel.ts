import { reactive } from "vue";
import axios from "axios";

export const state = reactive({
  channelList: [] as any[],
  getChannel: () => {
    axios
      .get("http://localhost:3000/channels/")
      .then((res) => {
        state.channelList = res.data;
        console.log(state.channelList);
        
      })
      .catch((e) => console.log(e));
  },
  createChannel: (name: string, userId: string) => {
    const data = {
      name,
      admin: userId,
    };
    axios.post("http://localhost:3000/channels", data).then((res) => {
      console.log(res.data);
    });
  },
  // joinChannel: (name: string, userId: string) => {},
});
