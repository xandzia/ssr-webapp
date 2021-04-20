<template>
  <div class="main-section about-page mb-6" v-if="aboutPageContent">
    <v-row tag="article" justify="center" class="main-page main-container mt-6 pb-6">
      <h2 class="about-page__title text-center footer--text text-h5 font-weight-medium text-uppercase px-2 py-4 mb-3"
      >
        {{ $t('mainPage.subTitle') }}
        <span :class="{ 'no-wrap': $vuetify.breakpoint.width < 550 && $vuetify.breakpoint.width > 320 }">
          {{ $t('mainPage.title') }}
        </span>
      </h2>
      <div class="about-page__main-wrapper">
        <the-main-section
          class="textLightGrey--text about-page__main-section"
          :imgFirst="false"
          :content="isEnLang ? aboutPageContent.content_en : aboutPageContent.content"
          :imgSrc="'/images/about/about.png'"
          :imgLazySrc="'/images/about/about_preload.png'"
          :imgSizes="{ width: 562, height: 468}"
        ></the-main-section>
      </div>
    </v-row>
      <div class="px-4 about-page__head-section">
        <h2 class="text-center footer--text text-h6 font-weight-medium text-uppercase pb-4 pt-6 mb-3">
          {{ $t('teamTitle') }}
        </h2>
        <v-row tag="article"
               justify="center"
               align="start"
               class="main-page main-container pt-0 my-0"
        >
          <v-col v-for="member in aboutPageContent.team"
                 cols="12"
                 sm="4"
                 :key="member.title_en"
                 class="d-flex flex-column align-center mb-4"
          >
            <v-lazy min-height="160" transition="fade-transition">
              <v-img
                :lazy-src="member.image.src"
                max-height="auto"
                max-width="150"
                :alt="isEnLang ? member.image.alt_en : member.image.alt"
                :src="member.image.src"
              ></v-img>
            </v-lazy>
            <h3 class="font-weight-medium primary--text pt-3">{{ isEnLang ? member.title_en : member.title }}</h3>
            <span class="footer--text text-center">{{ isEnLang ? member.position_en : member.position }}</span>
          </v-col>
        </v-row>
      </div>
  </div>
</template>

<script>
    import { mapState } from 'vuex';
    import getSiteMeta from "~/utils/getSiteMeta.js";

    export default {
        scrollToTop: true,
        name: "About",
        head () {
            return {
                title: `${this.$t('metaText.main.title')} | ${this.$t('metaText.about.title')}`,
                meta: [
                    { hid: 'description', name: 'description', content: this.$t('metaText.about.content') },
                    ...getSiteMeta()
                ]
            }
        },
        async fetch (context) {
            try {
                await context.store.dispatch('about/fetchAboutPage');
            } catch (err) {
                context.error(err)
            }
        },
        computed: {
            ...mapState({
                aboutPageContent: state => state.about.aboutPageContent
            }),
            isEnLang() {
                return this.$i18n.locale === 'en';
            }
        }
    }
</script>

<style lang="scss">
  @import '~assets/scss/vars.scss';
  .main-section {
    background: $lightBg;
  }
  .about-page {
    min-height: 890px;
    .no-wrap {
      white-space: nowrap;
    }
    &__title,
    &__main-wrapper {
      width: 100%;
    }
    &__head-section {
      background: $white;
      .v-image {
        border-radius: 50%;
      }
    }
    &__main-section {
      .text-center {
        text-align: left!important;
      }
      .v-responsive__content {
        width: 100%!important; // TODO: need to fix
      }
    }
    ul {
      margin-bottom: 16px;
      margin-top: -16px;
    }
    .textLightGrey--text p {
      text-align: justify;
    }
  }
</style>
