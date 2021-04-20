export const state = () => ({
  partnersPage: null
});

export const actions = {
  async fetchPartnersPage ({ state, commit }) {
    if (!state.partnersPage) {
      try {
        const data = {
          partners: [
            { alt: '', src: '', link: '' }
          ]
        };
        commit('SET_PAGE', data)
      } catch (e) {
        throw e
      }
    }
  }
};

export const mutations = {
  ['SET_PAGE'] (state, data) {
    state.partnersPage = { ...data }
  }
};
