<template>
  <article class="main-page main-container my-6 contacts-page px-3">
    <v-toolbar flat>
      <v-toolbar-title class="text-center footer--text text-h5 font-weight-medium text-uppercase my-2">
        {{ $t('contacts.title') }}
      </v-toolbar-title>
    </v-toolbar>
    <v-row tag="article" class="justify-center py-4">
      <v-col cols="12" xl="6" lg="6" md="6" sm="9">
        <contact-us></contact-us>
      </v-col>
      <v-col cols="12" xl="6" lg="6" md="6" sm="12" v-if="contactsPage">
        <v-list
          flat
          dense
          class="primary--text pa-0 text-left mb-4"
        >
          <strong class="text-h6">{{ $t('contacts.addressTitle') }}</strong>

          <v-list-item-group
            color="footer"
            class="footer--text text-left pa-2"
            tag="address"
          >
            <div
              v-for="item in contactsPage.contacts"
              :key="item.title_en"
              class="v-list-item footer--text ma-0 pa-0"
            >
              <strong class="primary--text mr-3">{{ isEnLang ? item.title_en : item.title }}</strong>
              <template v-if="item.name === 'email'">
                <a :href="`mailto:${item.content}}`">{{ item.content }}</a>
              </template>
              <template v-else>{{ isEnLang ? item.content_en : item.content }}</template>
            </div>
          </v-list-item-group>
          <strong class="text-h6 pt-3">{{ $t('contacts.postTitle') }}:</strong>
          <div class="v-list-item font-italic footer--text ma-0 pa-0 pl-2">
            {{ isEnLang ? contactsPage.postAddress.en : contactsPage.postAddress.ua }}
          </div>
        </v-list>
      </v-col>
    </v-row>
  </article>
</template>

<script>
    import { mapState } from 'vuex';
    import ContactUs from "~/components/ContactUs";
    import getSiteMeta from "~/utils/getSiteMeta.js";

    export default {
        scrollToTop: true,
        components: { ContactUs },
        name: "Contacts",
        head () {
            return {
                title: `${this.$t('metaText.main.title')} | ${this.$t('metaText.contacts.title')}`,
                meta: [
                    { hid: 'description', name: 'description', content: this.$t('metaText.contacts.content') },
                    ...getSiteMeta()
                ]
            }
        },
        async fetch (context) {
            try {
                await context.store.dispatch('contacts/fetchContactsPage');
            } catch (err) {
                context.error(err)
            }
        },
        computed: {
            ...mapState({
                contactsPage: state => state.contacts.contactsPage,
            }),
            isEnLang() {
                return this.$i18n.locale === 'en';
            }
        },
    }
</script>

<style lang="scss">
  @import '~assets/scss/vars.scss';

  .contacts-page {
    article {
      background: $lightBg;
    }
    .v-sheet.theme--light.v-toolbar.v-toolbar--flat,
    .theme--light.v-list {
      background-color: transparent;
    }
    .v-toolbar__content {
      justify-content: center;
    }
  }
  @media all and (max-width: 1130px) {
    .contacts-page {
      article {
        background: $white;
      }
    }
  }
</style>
