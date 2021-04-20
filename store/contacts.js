export const state = () => ({
  contactsPage: null
});

export const actions = {
  async fetchContactsPage ({ state, commit }) {
    if (!state.contactsPage) {
      try {
        // const data = await this.$axios.get('/api/media');
        const data = {
          postAddress: {
            en: '',
            ua: ''
          },
          contacts: [
            {
              title_en: 'Address:',
              title: '',
              content_en: '',
              content: '',
              name: 'address'
            },
            {
              title_en: 'Phone:',
              title: 'Телефон:',
              content_en: '',
              content: '',
              name: 'phone'
            },
            {
              title_en: 'Hours:',
              title: 'Графік роботи:',
              content_en: 'Mon-Fri 09:00-18:00',
              content: 'Пн-Пт 09:00-18:00',
              name: 'workingHours'
            },
            {
              title_en: 'E-mail:' ,
              title: 'E-mail:' ,
              content: '',
              name: 'email'
            }
          ]
        };
        commit('SET_CONTACTS_PAGE', data)
      } catch (e) {
        throw e
      }
    }
  }
};

export const mutations = {
  ['SET_CONTACTS_PAGE'] (state, data) {
    state.contactsPage = { ...data }
  }
};
