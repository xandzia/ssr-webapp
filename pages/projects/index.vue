<template>
  <article class="main-page main-container mt-6 px-2 pb-4 projects-wrapper wrapper" v-if="projectsPage">
    <v-toolbar flat class="justify-content-center">
      <v-toolbar-title class="text-center footer--text text-h5 font-weight-medium text-uppercase">
        {{ $t('projectsPageTitle') }}
      </v-toolbar-title>
    </v-toolbar>
    <template v-if="$vuetify.breakpoint.mdAndUp">
      <v-tabs vertical
              color="accent"
              :value="tabsValue"
              @change="onChangeTabs"
      >
        <template v-for="project in projectsPage.projects">
          <v-tab class="justify-start" v-html="project.img"></v-tab>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p v-html="$md.render(isEnLang ? project.text_en : project.text)" class="text-justify"></p>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </template>
      </v-tabs>
    </template>

    <template v-else>
      <v-expansion-panels accordion :value="tabsValue">
        <v-expansion-panel
          v-for="project in projectsPage.projects"
          :key="project.name"
          @change="showProject(project.name)"
        >
          <v-expansion-panel-header class="pa-0">
            <div v-html="project.img"></div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div v-html="$md.render(isEnLang ? project.text_en : project.text)" class="text-justify"></div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>
  </article>
</template>

<script>
    import { mapState } from 'vuex';
    import getSiteMeta from "~/utils/getSiteMeta.js";

    export default {
        scrollToTop: true,
        name: "Projects",
        data() {
            return {
                show: null,
                tabsValue: 'a'
            }
        },
        head () {
            return {
                title: `${this.$t('metaText.main.title')} | ${this.$t('metaText.projects.title')}`,
                meta: [
                    { hid: 'description', name: 'description', content: this.$t('metaText.projects.content') },
                    ...getSiteMeta()
                ]
            }
        },
        async fetch (context) {
            try {
                await context.store.dispatch('projects/fetchProjectsPage');
            } catch (err) {
                context.error(err)
            }
        },
        mounted() {
            switch (this.$route.query.p) {
                case 'c': this.tabsValue = 1; this.show = 1; break;
                case 'b': this.tabsValue = 2; this.show = 2; break;
                case 'a': this.tabsValue = 0; this.show = 0; break;
                default: this.tabsValue = 0;
            }
        },
        methods: {
            onChangeTabs(val) {
                let query;
                switch (val) {
                    case 0: query = 'a'; break;
                    case 1: query = 'b'; break;
                    case 2: query = 'c'; break;
                    default: return;
                }
                this.$nextTick(() => {
                    this.$vuetify.goTo(0);
                });
                this.$router.push({path: this.$route.path, query: { p: query }});
            },
            showProject(name) {
                this.$router.push({path: this.$route.path, query: { p: name }});
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
                // this.$nextTick(() => { this.$vuetify.goTo(0) }); // TODO: not workong???
            }
        },
        computed: {
            ...mapState({
                projectsPage: state => state.projects.projectsPage
            }),
            isEnLang() {
                return this.$i18n.locale === 'en';
            }
        },
        watch: {
            tabsValue(val) {
                this.onChangeTabs(val);
            }
        }
    }
</script>

<style lang="scss">
  @import '~assets/scss/vars.scss';
 /* .wrapper {
    width: 100%;
    position: relative;
    z-index: 2;
  }
  .background-shape {
    background: $lightBg;
    width: 100%;
    height: 200px;
    -ms-transform: skewY(-20deg);
    -webkit-transform: skewY(-20deg);
    transform: skewY(-20deg);
    border-radius: 30px;
    position: absolute;
    top: 0px;
    left: 50px;
    z-index: 3;
  }*/

  .projects-wrapper {
    .theme--light.v-tabs-items,
    .theme--light.v-card {
      background-color: transparent;
    }
    .v-window.v-item-group.theme--light.v-tabs-items {
      border-radius: 0 4px 4px 4px;
    }
    .v-window-item,
    .v-tab--active {
      background-color: $lightBlueBg;
    }
    header .v-toolbar__content {
      justify-content: center;
    }
    .v-expansion-panel::before {
      box-shadow: none;
    }
    .v-expansion-panel-header {
      min-height: 52px;
    }
    .v-expansion-panel-content__wrap {
      padding: 10px 10px 10px 16px;
    }
    .v-expansion-panel-header--active,
    .v-expansion-panel-content__wrap {
      background: $lightBg;
    }
  }
  #a {
    max-width: 160px;
    width: 160px;
  }
  #b {
    max-width: 205px;
    width: 205px;
  }
  #c {
    max-width: 183px;
    width: 183px;
    padding-left: 10px;
  }
</style>
