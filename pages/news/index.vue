<template>
  <div class="news-page">
    <article class="main-page main-container mt-6 pb-7 px-4" v-if="newsPage">
      <v-toolbar flat>
        <v-toolbar-title class="text-center footer--text text-h5 font-weight-medium text-uppercase my-2">
          {{ $t('newsTitle') }}
        </v-toolbar-title>
      </v-toolbar>
      <v-row v-for="blog in newsPage.newsList"
             :key="blog.title_en"
             justify="center"
             class="pt-3"
      >
        <v-divider inset
                   class="divider my-6 mx-1 secondary--text"
        ></v-divider>
          <v-col v-if="blog.image" cols="12" xl="5" lg="5" md="5" sm="12">
            <v-lazy min-height="200" transition="fade-transition">
              <v-img :src="blog.image.src"
                     :alt="isEnLang ? blog.image.alt_en : blog.image.alt"
              ></v-img>
            </v-lazy>
          </v-col>
          <v-col cols="12"
               :xl="blog.image ? 7 : 12"
               :lg="blog.image ? 7 : 12"
               :md="blog.image ? 7 : 12"
               sm="12"
               class="d-flex flex-column"
        >
          <h3 class="darkBlue--text pb-5 text-h5 font-weight-bold">
            {{ isEnLang ? blog.title_en : blog.title }}
          </h3>
          <div class="blog-post-text flex-grow-1"
               v-html="$md.render(textCutter(isEnLang ? blog.content_en : blog.content))"
          ></div>
          <v-row class="align-baseline justify-space-between flex-grow-0 pt-3 ma-0">
            <p class="footer--text font-weight-medium mb-0 pb-0">{{ blog.date }}</p>
            <v-btn
              aria-label="Show all news"
              text
              link
              @click="goToNews(blog)"
              color="darkBlue"
            >{{ $t('buttons.more') }}</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </article>
  </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';
    const MAX_LENGTH_NEWS = 500;
    import getSiteMeta from "~/utils/getSiteMeta.js";

    export default {
        scrollToTop: true,
        name: "News",
        head () {
            return {
                title: `${this.$t('metaText.main.title')} | ${this.$t('metaText.news.title')}`,
                meta: [
                    { hid: 'description', name: 'description', content: this.$t('metaText.news.content') },
                    ...getSiteMeta()
                ]
            }
        },
        async fetch (context) {
            try {
                await context.store.dispatch('news/fetchNews');
            } catch (err) {
                context.error(err)
            }
        },
        mounted() {
            const container = document.querySelector(".news-page");
            let anchors = container.querySelectorAll('a');
            for (let i = 0; i < anchors.length; i++) {
                anchors[i].setAttribute('target', '_blank')
            }
        },
        methods: {
            ...mapMutations({
                setNews: 'news/storeSelectedNews'
            }),
            goToNews(blog) {
                this.setNews(blog);
                this.$router.push(this.localePath(`/news/${blog.id}`));
            },
            textCutter(text) {
                return text.length < MAX_LENGTH_NEWS ? text : `${text.substr(0, MAX_LENGTH_NEWS)} ...`
            }
        },
        computed: {
            ...mapState({
                newsPage: state => state.news.newsPage
            }),
            lastNews() {
                return this.news[this.news.length - 1]
            },
            isEnLang() {
                return this.$i18n.locale === 'en';
            }
        }
    }
</script>

<style lang="scss">
  @import '~assets/scss/vars.scss';
  .news-page {
    .main-container {
      background: $lightBg;
    }
    .theme--light.v-toolbar.v-sheet {
      background-color: transparent;
    }
    .divider {
      min-width: 80%;
      border-color: $lightSecondary;
    }
    .divider.white--text {
      border-color: $white;
    }
    .v-toolbar__content {
      justify-content: center;
    }
  }
  @media all and (max-width: 1130px) {
    .news-page {
      .main-container {
        background: $white;
      }
    }
  }
</style>
