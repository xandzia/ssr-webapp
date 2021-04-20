<template>
  <v-row tag="article"
         justify="center"
         class="main-page main-container px-6 mt-6 documents-page mb-0"
         v-if="documents"
  >
    <v-toolbar flat class="justify-content-center">
      <v-toolbar-title class="text-center footer--text text-h5 font-weight-medium text-uppercase">
        {{ $t('documentsPage.title') }}
      </v-toolbar-title>
    </v-toolbar>
    <template v-if="$vuetify.breakpoint.mdAndUp">
      <v-tabs vertical color="accent">
        <v-tab class="justify-start"
               @change="changeTabHandler(pdf)"
               v-for="pdf in documents.pdfFiles"
               :key="pdf.title_en"
        >
          {{ isEnLang ? pdf.title_en : pdf.title }}
        </v-tab>

        <v-tab-item v-for="pdf in documents.pdfFiles"
                    :key="pdf.title_en">
          <v-card flat>
            <v-card-text class="pt-0" transition="fade-transition">
              <div class="control" v-if="numPages > 1">
                <v-btn icon color="primary" @click="onPrev" aria-label="Show previous page">
                  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                  </svg>
<!--                  <v-icon>mdi-chevron-left</v-icon>-->
                </v-btn>
                {{page}}/{{numPages}}
                <v-btn icon color="primary" @click="onNext" aria-label="Show next page">
                  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                  </svg>
<!--                  <v-icon>mdi-chevron-right</v-icon>-->
                </v-btn>
              </div>
              <pdf class="pdf-viewer" :src="pdf.src" :page="page" @num-pages="setPageNum"></pdf>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </template>
    <ul class="mobile-view" v-else>
      <li v-for="doc in documents.pdfFiles">
        <a :href="doc.src" _target="blank">{{ isEnLang ? doc.title_en : doc.title }} (pdf)</a>
      </li>
    </ul>
  </v-row>
</template>

<script>
    import { mapState } from 'vuex';
    import getSiteMeta from "~/utils/getSiteMeta.js";

    export default {
        scrollToTop: true,
        name: "Documents",
        data() {
            return {
                panel: [0],
                page: 1,
                activeElem: null,
                numPages: 0
            }
        },
        head () {
            return {
                title: `${this.$t('metaText.main.title')} | ${this.$t('documentsPage.title')}`,
                meta: [
                    { hid: 'description', name: 'description', content: this.$t('metaText.about.content') },
                    ...getSiteMeta()
                ]
            }
        },
        async fetch ({ store }) {
            try {
                await store.dispatch('about/fetchDocuments');
            } catch (err) {
                console.error(err)
            }
        },
        methods: {
            setPageNum(num) {
                this.numPages = num;
            },
            onPrev() {
                if (this.page > 1) {
                    this.page--
                }
            },
            onNext() {
                if (this.numPages > this.page) {
                    this.page++
                }
            },
            changeTabHandler (activeElem) {
                this.activeElem = activeElem
            }
        },
        computed: {
            ...mapState({
                documents: state => state.about.documents
            }),
            isEnLang() {
                return this.$i18n.locale === 'en';
            }
        },
        watch: {
            activeElem () {
                this.page = 1
            }
        }
    }
</script>

<style lang="scss">
  .documents-page {
    position: relative;
    min-height: 950px;
    .v-expansion-panel::before {
      box-shadow: none;
    }
    .v-tab {
      white-space: normal;
      text-align: left;
    }
    .v-toolbar__content {
      justify-content: center;
    }
    .pdf-viewer {
      min-height: 800px;
      top: 30px;
    }
    .control {
      position: absolute;
      z-index: 3;
      left: 50%;
      transform: translateX(-50%);
      font-size: 18px;
      text-align: center;
      top: 0px;
      & > * {
        display: inline-block;
        white-space: nowrap;
        font-size: 25px;
        cursor: pointer;
      }
    }
    .mobile-view {
      position: absolute;
      min-width: 450px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  @media(max-width: 500px) {
    .documents-page {
      min-height: 500px;
      .mobile-view {
        min-width: 80%;
      }
    }
  }
  @media(max-width: 959px) {
    .documents-page {
      min-height: 500px;
    }
  }
</style>
