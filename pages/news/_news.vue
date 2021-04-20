<template>
  <article class="main-page main-container mt-6 news-page-single px-3" v-if="newsPage">
    <v-row justify="center" class="py-6">
      <v-col cols="12" xl="10" lg="10" md="10" sm="12">
        <v-breadcrumbs :items="breadcrumbsItems" class="px-0">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item
              nuxt
              exact
              :to="localePath(item.to)"
              :disabled="item.disabled"
            >
              {{ item.text.toUpperCase() }}
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </v-col>
      <v-col cols="12" xl="10" lg="10" md="10" sm="12"
             class="news-page--section d-flex flex-column"
      >
        <template v-if="blog">
          <v-lazy min-height="200" transition="fade-transition">
            <v-img v-if="blog.image"
                   :src="blog.image.src"
                   :alt="isEnLang ? blog.image.alt_en : blog.image.alt"
                   class="mb-5"
            ></v-img>
          </v-lazy>
          <h3 class="darkBlue--text pb-5 text-h5 font-weight-bold">{{ isEnLang ? blog.title_en : blog.title }}</h3>
          <div class="blog-post-text flex-grow-1" v-html="$md.render(isEnLang ? blog.content_en : blog.content)"></div>
          <p class="footer--text font-weight-medium mb-0 py-3">{{ blog.date }}</p>
        </template>
        <template v-else>
          :(
        </template>
      </v-col>
    </v-row>
  </article>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';
    import getSiteMeta from "~/utils/getSiteMeta.js";

    export default {
        scrollToTop: true,
        name: "Blog",
        head () {
            return {
                title: `${this.$t('metaText.main.title')} | ${this.isEnLang ? this.blog.title_en : this.blog.title}`,
                meta: [
                    ...this.newsMeta
                ]
            }
        },
        async fetch ({ store, route }) {
            try {
                await store.dispatch('news/fetchNews');
                const newsList = store.state.news.newsPage.newsList;
                let foundNews = newsList.filter(item => item.id === route.path.split('/').reverse()[0]);
                store.commit('news/storeSelectedNews', foundNews[0]);
            } catch (err) {
                console.error(err)
            }
        },
        mounted() {
            const container = document.querySelector('.news-page--section');
            let anchors = container.querySelectorAll('a');
            for (let i = 0; i < anchors.length; i++) {
                anchors[i].setAttribute('target', '_blank')
            }
        },
        methods: {
            ...mapMutations({
                setNews: 'news/storeSelectedNews'
            })
        },
        computed: {
            ...mapState({
                blog: state => state.news.selectedNews,
                newsPage: state => state.news.newsPage
            }),
            newsMeta() {
                const metaData = {
                    title: this.isEnLang ? this.blog.title_en : this.blog.title,
                    description: this.isEnLang ? `${this.blog.content_en.substr(0, 150)} ...` : `${this.blog.content.substr(0, 150)} ...`,
                    url: `https://test.publicfinance.gov.ua/news/${this.blog.id}`,
                    mainImage: this.blog.image ? `https://test.publicfinance.gov.ua${this.blog.image.src}` : null
                };
                return getSiteMeta(metaData)
            },
            breadcrumbsItems() {
                return [
                    {
                        text: this.$t('newsTitle'),
                        disabled: false,
                        to: '/news',
                    },
                    {
                        text: this.isEnLang ? this.blog.title_en : this.blog.title,
                        disabled: true,
                        to: '',
                    }
                ]
            },
            isEnLang() {
                return this.$i18n.locale === 'en';
            }
        }
    }
</script>

<style lang="scss">
  @import '~assets/scss/vars.scss';

  .news-page-single {
    background: $lightBg;
  }
  @media all and (max-width: 1130px) {
    .news-page-single {
      .main-container {
        background: $white;
      }
    }
  }
</style>
