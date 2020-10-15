import { GetterTree, MutationTree } from 'vuex'

export const state = () => ({
  searchTerm: '',
  searchList: [] as any[],
})

export type RootState = ReturnType<typeof state>

// export const getters: GetterTree<RootState, RootState> = {
//   searchTerm: (state) => state.searchTerm,
// }

export const mutations: MutationTree<RootState> = {
  UPDATE_SEARCHTERM: (state, newTerm: string) => (state.searchTerm = newTerm),
  UPDATE_SEARCHLIST: (state, newList: []) => (state.searchList = newList),
}

// export const actions: ActionTree<RootState, RootState> = {
//   async fetchThings({ commit }) {
//     const things = await this.$axios.$get('/things')
//     console.log(things)
//     commit('CHANGE_NAME', 'New name')
//   },
// }
