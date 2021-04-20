export const state = () => ({
  newsPage: null,
  selectedNews: null,
  mediaPage: null,
  videoPage: null
});

export const actions = {
  async fetchNews ({ state, commit }) {
    if (!state.newsPage) {
      try {
        // const data = await this.$axios.get('/api/news');
        const data = {
          newsList: [
            {
              id: '15',
              image: {
                src: '',
                alt: 'a1',
                alt_en: 'a2'
              },
              title_en: '',
              title: '',
              date: '',
              content_en: '',
              content: ''
            }
          ],
        };
        commit('SET_NEWS_PAGE', data)
      } catch (e) {
        throw e
      }
    }
  },

  async fetchMedia ({ state, commit }) {
    if (!state.mediaPage) {
      try {
        // const data = await this.$axios.get('/api/media');
        const data = {
          items: [
            {
              id: '1',
              source: '',
              image: {
                src: '',
                alt: 'a1',
                alt_en: 'a2'
              },
              title_en: '',
              title: '',
              date: '',
              content_en: '',
              content: ''
            }
          ]
        };
        commit('SET_MEDIA_PAGE', data)
      } catch (e) {
        throw e
      }
    }
  },

  async fetchVideo ({ state, commit }) {
    if (!state.videoPage) {
      try {
        // const data = await this.$axios.get('/api/mail');
        const data = {
          videos: [
            {
              title_en: '',
              title: '',
              videoId: '',
            }
          ]
        };
        commit('SET_VIDEO_PAGE', data)
      } catch (e) {
        throw e
      }
    }
  }
};

export const mutations = {
  storeSelectedNews(state, news) {
    state.selectedNews = news;
  },
  ['SET_NEWS_PAGE'] (state, data) {
    state.newsPage = { ...data }
  },
  ['SET_MEDIA_PAGE'] (state, data) {
    state.mediaPage = { ...data }
  },
  ['SET_VIDEO_PAGE'] (state, data) {
    state.videoPage = { ...data }
  }
};
