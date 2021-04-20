export const state = () => ({
  mainPage: null
});

export const actions = {
  async fetchMainPage ({ commit }) {
    if (!state.mainPage) {
      try {
        const data = {
          mainPageProjects: [
            {
              link: '',
              title_en: '',
              title: '',
              content_en: '',
              content: '',
              image: {
                src: '',
                alt: 'a1',
                alt_en: 'a2'
              },
            },
            {
              link: '',
              title_en: '',
              title: '',
              content_en: '',
              content: '',
              image: {
                src: '',
                alt: 'a1',
                alt_en: 'a2'
              },
            },
            {
              link: '',
              title_en: '',
              title: '',
              content_en: '',
              content: '',
              image: {
                src: '',
                alt: 'a1',
                alt_en: 'a2'
              },
            },
          ],
          aboutCompany: {
            titleText_en: '',
            titleText: '',
            textP1_en: '',
            textP1: '',
            list_en: {
              role: 'list',
              title: '',
              items: [
                ''
              ]
            },
            list: {
              role: 'list',
              title: '',
              items: [
                ''
              ]
            },
            textP2: {
              role: 'paragraph',
              text: ''
            },
            textP2_en: {
              role: 'paragraph',
              text: ''
            }
          }
        };
        commit('SET_MAIN_PAGE', data)
      } catch (err) {
        throw err
      }
    }
  }
};

export const mutations = {
  ['SET_MAIN_PAGE'] (state, data) {
    state.mainPage = { ...data }
  }
};
