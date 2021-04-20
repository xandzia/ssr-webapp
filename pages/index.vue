<template>
  <article class="main-page" v-if="mainPage">
    <section class="main-bg">
      <v-row class="main-container align-center">
        <v-col cols="12" md="6" class="flex-column order-2 order-md-1">
          <h2 class="main-bg__h2">{{ $t('mainPage.subTitle') }}<br> {{ $t('mainPage.title') }}</h2>
          <p>{{ isEnLang ? aboutCompany.titleText_en : aboutCompany.titleText  }}</p>
          <v-btn
            outlined
            color="white"
            aria-label="Go to the article about the company"
            @click="scrollToElement"
          >{{ $t('buttons.aboutCompany') }}</v-btn>
        </v-col>
        <v-col cols="12" md="6" lg="6" xl="6" class="main-picture__wrap order-1 order-md-2">
          <the-main-picture></the-main-picture>
        </v-col>
      </v-row>
    </section>
    <div class="main-section pb-9" id="aboutCompany">
      <v-row tag="section" class="main-container align-center pt-8">
        <v-col cols="12" md="8" offset-md="2" lg="8" offset-lg="2" xl="8" offset-xl="2">
          <v-col tag="h2" class="b-block text-center py-3 footer--text text-h5 font-weight-medium text-uppercase">
            {{ $t('buttons.aboutCompany') }}
          </v-col>
          <p class="text-center textLightGrey--text px-3">
            {{ isEnLang ? aboutCompany.textP1_en : aboutCompany.textP1 }}
          </p>
        </v-col>
      </v-row>
      <the-main-section
          :imgFirst="false"
          :content="isEnLang ? aboutCompany.list_en : aboutCompany.list"
          :imgSrc="'/images/main/feature2.png'"
          :imgSizes="{ width: 562, height: 468}"
        ></the-main-section>
      <the-main-section
          :imgFirst="true"
          :content="isEnLang ? aboutCompany.textP2_en : aboutCompany.textP2"
          :imgSrc="'/images/main/feature4.png'"
          :imgSizes="{ width: 550, height: 360 }"
        ></the-main-section>
    </div>

      <v-row
        tag="section"
        class="main-container align-center py-8 my-3 card-block__container"
      >
        <the-card-block
          :title="$t('projectsTitle')"
          :items="projects"
          :id="`projects`"
          @onGo="onGoToProject"
        ></the-card-block>
      </v-row>
      <section class="main-section">
        <the-card-block
          :title="$t('newsTitle')"
          :items="lastNews"
          :id="`newsTitle`"
          actions="true"
          @onGo="onGoToNews"
        ></the-card-block>
      </section>
  </article>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import getSiteMeta from "~/utils/getSiteMeta.js";
import TheMainSection from "~/components/TheMainSection";
import TheCardBlock from "~/components/TheCardBlock";
import TheMainPicture from "~/components/TheMainPicture";
import ContactUs from "~/components/ContactUs";

export default {
    scrollToTop: true,
    name: "Main",
    components: { TheMainSection, TheCardBlock, ContactUs, TheMainPicture },
    head () {
        return {
            title: this.$t('metaText.main.title'),
            meta: [
                ...this.metaData
            ]
        }
    },
    data() {
        return {
            dialog: false,
            showLogos: false
        }
    },
    async fetch (context) {
        try {
            await context.store.dispatch('fetchMainPage');
            await context.store.dispatch('news/fetchNews');
        } catch (err) {
            context.error(err)
        }
    },
    mounted() {
    },
    computed: {
        ...mapState({
            news: state => state.news.newsPage.newsList,
            mainPage: state => state.mainPage,
            projects: state => state.mainPage.mainPageProjects,
            aboutCompany: state => state.mainPage.aboutCompany,
        }),
        metaData() {
            const metaData = {
                title: this.$t('metaText.main.title'),
                description: this.$t('metaText.main.content')
            };
            return getSiteMeta(metaData)
        },
        lastNews() {
            return this.news.slice(0, 3)
        },
        isEnLang() {
            return this.$i18n.locale === 'en';
        }
    },
    methods: {
        ...mapMutations({
            setNews: 'news/storeSelectedNews'
        }),
        onGoToNews(blog) {
            this.setNews(blog);
            this.$router.push(this.localePath(`/news/${blog.id}`));
        },
        onGoToProject(item) {
            this.$router.push(this.localePath(item.link));
        },
        scrollToElement() {
            const el = this.$el.querySelector('#aboutCompany').offsetTop - 60;
            if (el) {
                window.scroll({ top: el, behavior: "smooth" });
            }
        }
    }
}
</script>

<style lang="scss">
  @import '~assets/scss/vars.scss';

  .v-dialog.v-dialog--active {
    margin: 0;
  }
  .main-page {
    .main-bg.mt-5 {
      padding-top: 3.33333em;
    }
  }
  .main-picture__wrap {
    position: relative;
  }
  .main-section {
    background: $lightBg;
  }
  .main-bg {
    background: $primary;
    background: -webkit-gradient(linear, left top, right top, from($primary), to($lightBlue));
    background: linear-gradient(to right, $primary, $lightBlue);
    color: $white;
    padding: 3.33333em 4vw 2.5em;
  }

  .links {
    padding-top: 15px;
  }
  .main-bg {
    &__h2 {
      font-size: 2em;
      position: relative;
      font-weight: 500;
      line-height: 1.4;
      margin: 0 0 0.5em;
      text-rendering: optimizeLegibility;
      color: $white;
    }
    &__h2:after {
      border-color: currentColor;
      border-left: 1.5em solid $white;
      display: block;
      content: "";
      height: 2px;
      margin-top: 0.5em;
    }
  }
  @media all and (min-width: 601px) {
    .main-bg {
      padding-bottom: 3.33333em;
      padding-top: 4.16667em;
    }
    .main-bg__h2 {
      font-size: 2.44444em;
    }
  }
</style>
