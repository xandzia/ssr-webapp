export const state = () => ({
  projectsPage: null
});

export const actions = {
  async fetchProjectsPage ({ commit }) {
    if (!state.projectsPage) {
      try {
        // const data = await this.$axios.get('/api/projects');
        const data = {
          projects: [
            {
              img: '',
              name: '',
              text: '',
              text_en: '',
            }
            ]
        };
        commit('SET_PROJECTS_PAGE', data)
      } catch (err) {
        throw err
      }
    }
  }
};

export const mutations = {
  ['SET_PROJECTS_PAGE'] (state, data) {
    state.projectsPage = { ...data }
  }
};
