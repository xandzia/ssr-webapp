<template>
  <div class="header-container flex-grow-0 flex-shrink-0">
    <v-navigation-drawer
      v-model="sidebar"
      fixed
      temporary
    >
      <v-list
        nav
        dense
        class="pa-0"
      >
        <v-list-item-group
          v-model="group"
          color="primary"
          active-class="primary--text"
          tag="div"
        >
          <v-list-item
            role="button"
            tag="a"
            nuxt
            v-for="item in navigationDriwerMenu"
            :key="item.title_en"
            color="primary"
            exact-active-class="primary--text"
            class="ma-0 pa-1 pl-4"
            :class="[item.style, item.role]"
            :to="localePath(item.path)"
          >
            <v-list-item-title>{{ isEnLang ? item.title_en : item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar ref="navbar" color="white" fixed>
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        aria-label="Open the menu"
        @click.stop="sidebar = !sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#757575"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="pl-1 pt-2">
          <router-link :to="localePath('/')" tag="a" style="cursor: pointer" :title="$t('toTheMainPage')">
            <Logo/>
          </router-link>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <template v-for="item in menuItems"
        >
          <v-menu offset-y open-on-hover
                  v-if="item.role === 'aboutCompany'"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                aria-label="Open the submenu"
                text
                v-bind="attrs"
                v-on="on"
                class="primary--text active-class"
                :class="`${item.role}`"
              >
                {{ isEnLang ? aboutCompanyMenu.title_en : aboutCompanyMenu.title }}
              </v-btn>
            </template>
            <v-list tag="ul">
              <v-list-item
                dense
                tag="li"
                v-for="item in aboutCompanyMenu.items"
                :key="item.title_en"
                :to="localePath(item.path)"
                class="primary--text"
                exact-active-class="primary--text"
              >
                {{ isEnLang ? item.title_en : item.title }}
              </v-list-item>
            </v-list>
          </v-menu>
          <v-menu offset-y open-on-hover
                  v-else-if="item.role === 'newsMenu'"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                aria-label="Open the submenu"
                text
                v-bind="attrs"
                v-on="on"
                class="primary--text active-class"
                :class="`${item.role}`"
              >
                {{ isEnLang ? newsMenu.title_en : newsMenu.title }}
              </v-btn>
            </template>
            <v-list tag="ul">
              <v-list-item
                dense
                tag="li"
                v-for="item in newsMenu.items"
                :key="item.title_en"
                :to="localePath(item.path)"
                class="primary--text"
                exact-active-class="primary--text"
              >
                {{ isEnLang ? item.title_en : item.title }}
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn
            aria-label="Open the submenu"
            v-else
            text
            :to="localePath(item.path)"
            class="primary--text"
          >
            {{ isEnLang ? item.title_en : item.title }}
          </v-btn>
        </template>
      </v-toolbar-items>
      <lang-switcher></lang-switcher>
    </v-app-bar>
  </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                sidebar: false,
                aboutCompanyMenu: {
                    title: 'Про компанію',
                    title_en: 'About SI OPF',
                    items: [
                        { title_en: 'About the company', title: 'Про нас', path: '/about', icon: 'face' },
                        { title_en: 'Documents', title: 'Документи', path: '/documents', icon: 'face' },
                        { title_en: 'Vacancies', title: 'Вакансії', path: '/vacancies', icon: 'face' }
                    ]
                },
                newsMenu: {
                    title: 'Новини',
                    title_en: 'news',
                    items: [
                        { title_en: 'Blog', title: 'Блог', path: '/news' },
                        { title_en: 'Media', title: 'Публікації в ЗМІ', path: '/media' },
                        { title_en: 'Video', title: 'Відео', path: '/video' },
                    ]
                },
                menuItems: [
                    // { title: 'admin-test', path: '/admin', icon: 'home' },
                    { title_en: 'About the company', title: 'Про компанію', path: '/about', icon: 'face', role: 'aboutCompany' },
                    { title_en: 'projects', title: 'Проекти', path: '/projects', icon: 'face' },
                    { title_en: 'Contact us', title: 'Контакти', path: '/contacts', icon: 'lock_open' },
                    { title_en: 'news', title: 'Новини', path: '/news', icon: 'face', role: 'newsMenu' }
                ],
                group: null,
                navigationDriwerMenu: [
                    { title_en: 'About SI OPF', title: 'Про компанію', path: '', icon: 'face', role: 'aboutCompany' },
                    { title_en: 'About the company', title: 'Про нас', path: '/about', style: 'pl-9' },
                    { title_en: 'documents', title: 'Документи', path: '/documents', style: 'pl-9' },
                    { title_en: 'vacancies', title: 'Вакансії', path: '/vacancies', style: 'pl-9' },
                    { title_en: 'projects', title: 'Проекти', path: '/projects' },
                    { title_en: 'Contact us', title: 'Контакти', path: '/contacts' },
                    { title_en: 'news', title: 'Новини', path: '', role: 'newsMenu' },
                    { title_en: 'blog', title: 'Блог', path: '/news', style: 'pl-9' },
                    { title_en: 'media', title: 'Публікації в ЗМІ', path: '/media', style: 'pl-9' },
                    { title_en: 'Video', title: 'Відео', path: '/video', style: 'pl-9' },
                ]
            }
        },
        methods: {
            goTo(link) {
                this.$router.push(link);
            }
        },
        computed: {
            isEnLang() {
                return this.$i18n.locale === 'en';
            },
            isAboutCompanyLinkActive() {
                const aboutCompanyLinks = new Set(['/about', '/vacancies', '/documents']);
                return aboutCompanyLinks.has(this.$route.path);
            }
        }
    }
</script>


<style lang="scss">
  @import '~assets/scss/vars.scss';

  .aboutCompany,
  .newsMenu {
    .v-ripple__container {
      display: none;
    }
  }
  .v-application .v-menu__content ul,
  .v-application .v-menu__content ol {
    padding: 0!important;
  }
  .aboutCompany.theme--light.v-btn:focus::before,
  .aboutCompany.theme--light.v-list-item--active:hover::before,
  .aboutCompany.theme--light.v-list-item--active::before,
  .newsMenu.theme--light.v-btn:focus::before,
  .newsMenu.v-list-item--active:hover::before,
  .newsMenu.theme--light.v-list-item--active::before {
    opacity: 0;
  }

  .header-container header, .v-toolbar__content {
    min-height: 64px;
  }
  .header-container {
    .v-app-bar {
      .v-toolbar__content {
        @include mainWrapper;
        padding-right: 8px;
      }
    }
    .darkBlue--text {
      color: $darkBlue;
      opacity: 0.9;
    }
    .v-list-item__title {
      font-size: 0.9em!important;
      text-transform: uppercase;
    }
    .v-navigation-drawer__content {
      ul {
        padding-left: 0;
      }
    }
  }
</style>
