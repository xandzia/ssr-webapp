<template>
  <v-row tag="article" justify="center" class="main-page main-container px-4 my-6 vacancies-page" v-if="vacancies">
    <v-toolbar flat class="justify-content-center">
      <v-toolbar-title class="text-center footer--text text-h5 font-weight-medium text-uppercase">
        {{ $t('vacanciesPageTitle') }}
      </v-toolbar-title>
    </v-toolbar>
    <template v-if="$vuetify.breakpoint.mdAndUp">
      <v-tabs vertical
              color="accent"
              class="mt-5"
              v-model="tabsValue"
      >
        <v-tab class="justify-start"
               v-for="vacancy in vacancies.vacanciesList"
               :key="vacancy.title_en"
        >
          {{ vacancy.title }}
        </v-tab>

        <v-tab-item v-for="vacancy in vacancies.vacanciesList"
                    :key="vacancy.title_en"
        >
          <v-card flat>
            <v-card-text class="footer--text pt-0" transition="fade-transition">
              <h3 class="text-h6 primary--text mb-6">{{ vacancy.title }}</h3>
              <p v-html="$md.render(vacancy.content)" class="mb-6 md--text"></p>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </template>
    <template v-else>
      <v-expansion-panels accordion v-model="tabsValue">
        <v-expansion-panel
          v-for="vacancy in vacancies.vacanciesList"
          :key="vacancy.title"
          :id="vacancy.title"
          @change="onChangeVacancy(vacancy.title)"
        >
          <v-expansion-panel-header class="pa-0">
            <div v-html="vacancy.title"></div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <h3 class="text-h6 primary--text mb-6">{{ vacancy.title }}</h3>
            <div v-html="$md.render(vacancy.content)"></div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>
    <v-row tag="section"
           class="main-container d-flex align-center justify-center mt-5"
    >
      <v-dialog
        v-model="dialog"
        max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            aria-label="Respond to the vacancy"
            class="primary--text mb-5"
            outlined
            color="primary"
            v-bind="attrs"
            v-on="on"
          >{{ $t('buttons.mailToVacancies') }}</v-btn>
        </template>
        <v-card>
          <v-btn
            aria-label="Close the dialog"
            absolute
            right
            icon
            class="mt-4"
            @click="dialog = false"
          >
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>
<!--            <v-icon>mdi-close</v-icon>-->
          </v-btn>
          <v-card-title>
            <span class="primary--text headline py-4">{{ $t('buttons.mailTo') }}</span>
          </v-card-title>
          <v-card-text>
            <contact-us></contact-us>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-row>
</template>

<script>
    import { mapState } from 'vuex';
    import ContactUs from "~/components/ContactUs";
    import getSiteMeta from "~/utils/getSiteMeta.js";

    export default {
        scrollToTop: true,
        name: "Vacancies",
        components: { ContactUs },
        data() {
            return {
                tabsValue: null,
                dialog: false
            }
        },
        head () {
            return {
                title: `${this.$t('metaText.main.title')} | ${this.$t('metaText.vacancies.title')}`,
                meta: [
                    { hid: 'description', name: 'description', content: this.$t('metaText.vacancies.content') },
                    ...getSiteMeta()
                ]
            }
        },
        async fetch (context) {
            try {
                await context.store.dispatch('about/fetchVacancies');
            } catch (err) {
                context.error(err)
            }
        },
        methods: {
            onChangeVacancy() {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
                // this.$nextTick(() => this.$vuetify.goTo(0)); // TODO: not workong???
            },
            onChangeTabs() {

            }
        },
        computed: {
            ...mapState({
                vacancies: state => state.about.vacancies
            })
        },
        watch: {
            tabsValue(val) {

            }
        }
    }
</script>

<style lang="scss">
  .v-dialog.v-dialog--active {
    margin: 0;
    max-height: 100%;
  }
  .vacancies-page {
    position: relative;
    .v-expansion-panel-content__wrap {
      padding: 0;
    }
    .md--text {
      ul {
        padding-bottom: 16px;
      }
    }
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
      min-height: 700px;
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
    .vacancies-page {
      .v-dialog {
        margin: 0!important;
      }
      .mobile-view {
        min-width: 80%;
      }
    }
  }
</style>
