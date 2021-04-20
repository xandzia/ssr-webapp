<template>
  <div class="main-page main-container my-6 partners-page" v-if="partnersPage">
    <v-row class="main-container align-center my-1" tag="section">
      <v-col tag="header" class="b-block text-center py-3 footer--text text-h5 font-weight-medium text-uppercase">
        {{ $t('partnersPageTitle') }}
      </v-col>
      <the-partners
        :partners="partnersPage.partners"
      ></the-partners>
    </v-row>
  </div>
</template>

<script>
    import { mapState } from 'vuex';
    import ThePartners from "~/components/ThePartners";
    import getSiteMeta from "~/utils/getSiteMeta.js";

    export default {
        scrollToTop: true,
        name: "PartnersPage",
        head () {
            return {
                title: `${this.$t('metaText.main.title')} | ${this.$t('metaText.news.title')}`,
                meta: [
                    { hid: 'description', name: 'description', content: this.$t('metaText.news.content') },
                    ...getSiteMeta()
                ]
            }
        },
        components: { ThePartners },
        async fetch (context) {
            try {
                await context.store.dispatch('partners/fetchPartnersPage');
            } catch (err) {
                context.error(err)
            }
        },
        computed: {
            ...mapState({
                partnersPage: state => state.partners.partnersPage,
            }),
            isEnLang() {
                return this.$i18n.locale === 'en';
            }
        }
    }
</script>

<style lang="scss">
  @import '~assets/scss/vars.scss';

</style>
