<template>
  <div class="video-page">
    <article class="main-page main-container mt-6 pb-7 px-4" v-if="videoPage">
      <v-toolbar flat>
        <v-toolbar-title class="text-center footer--text text-h5 font-weight-medium text-uppercase my-2">
          {{ $t('videoTitle') }}
        </v-toolbar-title>
      </v-toolbar>
      <v-row v-for="video in videoPage.videos"
             :key="video.videoId"
             justify="center"
             class="pt-3"
      >
        <v-divider inset class="divider my-6 mx-1 secondary--text"></v-divider>
        <v-col cols="12" class="d-flex flex-column">
          <h3 class="darkBlue--text pb-5 text-h5 font-weight-bold text-center mx-auto">
            {{ isEnLang ? video.title_en : video.title }}
          </h3>
          <div class="flex-grow-1 mx-auto video-page__container">
            <youtube class="youtube-wrapper"
                     :video-id="video.videoId"
                     ref="youtube"
                     @playing="playing"
                     :resize="true"
                     :fitParent="true"
            ></youtube>
          </div>
        </v-col>
      </v-row>
    </article>
  </div>
</template>

<script>
    import { mapState } from 'vuex';
    import getSiteMeta from "~/utils/getSiteMeta.js";

    export default {
        scrollToTop: true,
        name: "Video",
        head () {
            return {
                title: `${this.$t('metaText.main.title')} | ${this.$t('metaText.video.title')}`,
                meta: [
                    { hid: 'description', name: 'description', content: this.$t('metaText.video.content') },
                    ...getSiteMeta()
                ]
            }
        },
        async fetch (context) {
            try {
                await context.store.dispatch('news/fetchVideo');
            } catch (reason) {
                context.error(reason)
            }
        },
        data() {
            return {}
        },
        methods: {
            playVideo() {
                this.player.playVideo()
            },
            playing() {
                console.log('\o/ we are watching!!!')
            }
        },
        computed: {
            ...mapState({
                videoPage: state => state.news.videoPage
            }),
            player() {
                return this.$refs.youtube.player
            },
            isEnLang() {
                return this.$i18n.locale === 'en';
            }
        }
    }
</script>

<style lang="scss">
  @import '~assets/scss/vars.scss';

  .video-page {
    &__container {
      width: 640px;
      height: 360px;
    }
    .theme--light.v-toolbar.v-sheet {
      background-color: transparent;
    }
    .main-container {
      background: $lightBg;
    }
    .v-toolbar__content {
      justify-content: center;
    }
    .youtube-wrapper {
      box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    }
  }
  @media all and (max-width: 1130px) {
    .video-page {
      .main-container {
        background: $white;
      }
    }
  }
  @media all and (max-width: 700px) {
    .video-page {
      &__container {
        width: 100%;
        height: 100%;
      }
    }
  }

</style>
