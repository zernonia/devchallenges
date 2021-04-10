import { reactive } from 'vue'

export const state = reactive({
  email: '' as string,
  id: '' as string,
  name: '' as string,
  photo: '' as string | undefined,
  channel: [],
  populateUser: (id: string, name: string, channel: [], photo?: string) => {
  state.name = name
  state.id = id
  state.channel = channel
  state.photo = photo
}
})