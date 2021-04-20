<template>
  <div class="media-page" v-if="mediaPage">
    <article class="main-page main-container mt-6 pb-7 px-4">
      <v-toolbar flat>
        <v-toolbar-title class="text-center footer--text text-h5 font-weight-medium text-uppercase my-2">
          {{ $t('mediaTitle') }}
        </v-toolbar-title>
      </v-toolbar>
      <v-divider inset
                 class="col-12 divider my-6 mx-auto secondary--text"
      ></v-divider>
      <v-row justify="center"
             class="pt-3"
      >
        <the-card-block
          :items="mediaPage.items"
          :id="``"
          actions="true"
          @onGo="onGoToNews"
        ></the-card-block>
      </v-row>
    </article>
  </div>
</template>

<script>
    import { mapState } from 'vuex';
    import TheCardBlock from "~/components/TheCardBlock";
    import getSiteMeta from "~/utils/getSiteMeta.js";

    export default {
        scrollToTop: true,
        name: "Media",
        components: { TheCardBlock },
        head () {
            return {
                title: `${this.$t('metaText.main.title')} | ${this.$t('metaText.media.title')}`,
                meta: [
                    { hid: 'description', name: 'description', content: this.$t('metaText.media.content') },
                    ...getSiteMeta()
                ]
            }
        },
        async fetch (context) {
            try {
                await context.store.dispatch('news/fetchMedia');
            } catch (err) {
                context.error(err)
            }
        },
        methods: {
            onGoToNews(blog) {
                window.open(blog.source)
            }
        },
        computed: {
            ...mapState({
                mediaPage: state => state.news.mediaPage
            }),
            isEnLang() {
                return this.$i18n.locale === 'en';
            }
        }
    }
</script>

<style lang="scss">
  @import '~assets/scss/vars.scss';

  .media-page {
    .theme--light.v-toolbar.v-sheet {
      background-color: transparent;
    }
    .main-container {
      background: $lightBg;
    }
    .v-toolbar__content {
      justify-content: center;
    }
    .v-toolbar__title {
      white-space: normal;
    }
    .youtube-wrapper {
      box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    }
  }
  @media all and (max-width: 1130px) {
    .media-page {
      .main-container {
        background: $white;
      }
    }
  }

</style>
