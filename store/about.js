export const state = () => ({
  aboutPageContent: null,
  documents: null,
  vacancies: null
});

export const actions = {
  async fetchAboutPage ({ state, commit }) {
    if (!state.aboutPageContent) {
      try {
        // const data = await this.$axios.get('/api/about');
        const data = {
          content_en: {
            role: 'paragraph',
            text: ''
          },
          content: {
            role: 'paragraph',
            text: ''
          },
          team: [
            {
              title_en: "",
              title: "",
              position_en: "СЕО",
              position: "Директор",
              image: {
                src: '',
                alt: '',
                alt_en: ''
              },
            },
            {
              title_en: "",
              title: "",
              position_en: "Deputy Director",
              position: "Заступник директора",
              image: {
                src: '',
                alt: '',
                alt_en: ''
              },
            },
            {
              title_en: "",
              title: "",
              position_en: "",
              position: "",
              image: {
                src: '',
                alt: 'a1',
                alt_en: 'a2'
              },
            }
          ],
        };
        commit('SET_ABOUT_PAGE', data)
      } catch (e) {
        throw e
      }
    }
  },
  async fetchDocuments ({ commit }) {
    if (!state.documents) {
      try {
        const data = {
          pdfFiles: [
            {
              title_en: '',
              title: '',
              src: ''
            }
          ]
        };
        commit('SET_DOCUMENTS', data)
      } catch (e) {
        throw e
      }
    }
  },
  async fetchVacancies ({ commit }) {
    if (!state.vacancies) {
      try {
        // const data = await this.$axios.get('/api/vacancies');
        const data = {
          vacanciesList: [
            {
              title: '',
              content: '',
            }
          ]
        };
        commit('SET_VACANCIES', data)
      } catch (e) {
        throw e
      }
    }
  }
};

export const mutations = {
  ['SET_ABOUT_PAGE'] (state, data) {
    state.aboutPageContent = { ...data }
  },
  ['SET_DOCUMENTS'] (state, data) {
    state.documents = { ...data }
  },
  ['SET_VACANCIES'] (state, data) {
    state.vacancies = { ...data }
  },
};
