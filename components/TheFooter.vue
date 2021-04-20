<template>
  <v-footer
    dark
    padless
    class="footer-wrapper primary px-5 pt-1"
  >
    <v-card
      flat
      tile
      width="100%"
      class="primary footerText--text text-center main-container"
    >
      <v-row
        justify="center"
        align="start"
        no-gutters
        class="footer__row my-2 mt-5"
      >
        <v-col cols="12" lg="4" md="4" sm="12" class="mb-0">
          <router-link to="/" style="cursor: pointer" :title="$t('toTheMainPage')">
            <v-img
              lazy-src="/images/logo/DU_logo_transparent_white.png"
              src="/images/logo/DU_logo_transparent_white.png"
              max-height="40"
              min-height="40"
              max-width="300"
              class="footer-image d-block"
              :class="{ 'mx-auto mb-3': $vuetify.breakpoint.smAndDown }"
            ></v-img>
          </router-link>
        </v-col>
        <v-col cols="12" lg="8" md="8" sm="12" class="mb-2">
          <v-btn
            v-for="item in menuItems"
            :key="item.title_en"
            color="footerTextV2"
            active-class="white--text"
            small
            text
            :to="localePath(item.path)"
            class="my-1"
          >
            {{ isEnLang ? item.title_en : item.title }}
          </v-btn>
          <div class="d-inline nowrap">
            <v-btn
              aria-label="Go to community page"
              href="https://www.facebook.com/publicfinance.ua/"
              class="mx-1 footerTextV2--text"
              icon
              target="_blank"
              rel="noopener"
            >
              <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><rect fill="none" height="24" width="24"/><path d="M22,12c0-5.52-4.48-10-10-10S2,6.48,2,12c0,4.84,3.44,8.87,8,9.8V15H8v-3h2V9.5C10,7.57,11.57,6,13.5,6H16v3h-2 c-0.55,0-1,0.45-1,1v2h3v3h-3v6.95C18.05,21.45,22,17.19,22,12z"/></svg>
            </v-btn>
            <v-btn
              aria-label="Go to community page"
              href="https://www.linkedin.com/company/18408163/"
              class="mx-1 footerTextV2--text"
              icon
              target="_blank"
              rel="noopener"
            >
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
              </svg>
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-card-text class="footerTextV2--text">
        {{  $t('footer.companyName') }} © 2017 — {{ new Date().getFullYear() }}.
        <span class="footer-wrapper__text--nowrap">{{ $t('footer.allRightsReserved') }}</span>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
    export default {
        name: "Footer",
        data() {
            return {
                menuItems: [
                    // { title: 'admin-test', path: '/admin', icon: 'home' },
                    { title_en: 'About SI OPF', title: 'Про компанію', path: '/about', icon: 'face' },
                    { title_en: 'Projects', title: 'Проекти', path: '/projects', icon: 'face' },
                    { title_en: 'News', title: 'Новини', path: '/news', icon: 'face' },
                    { title_en: 'Partners', title: 'Партнери', path: '/partners', icon: 'lock_open' },
                    { title_en: 'Contact us', title: 'Контакти', path: '/contacts', icon: 'lock_open' }
                ],
                group: null,
                community: [
                    { title: 'Facebook', path: 'https://www.facebook.com/publicfinance.ua/', icon: 'mdi-facebook' },
                    { title: 'Linkedin', path: 'https://www.linkedin.com/company/18408163/', icon: 'mdi-linkedin' }
                ],
                ContactUs: [
                    {
                        title_en: 'Address:',
                        title: 'Юридична адреса:',
                        content_en: '11, Mezhyhirska Str., Kyiv',
                        content: '04071, м. Київ, вул.Межигірська, 11',
                        name: 'address'
                    },
                    {
                        title_en: 'Phone:',
                        title: 'Телефон:',
                        content_en: '(044) 206 69 99',
                        content: '(044) 206 69 99',
                        name: 'phone'
                    },
                    {
                        title_en: 'Hours:',
                        title: 'Графік роботи:',
                        content_en: 'Mon-Fri 09:00-18:00',
                        content: 'Пн-Пт 09:00-18:00',
                        name: 'workingHours'
                    },
                    {
                        title_en: 'E-mail:' ,
                        title: 'E-mail:' ,
                        content: 'inbox@publicfinance.gov.ua',
                        name: 'email'
                    }
                ]
            }
        },
        computed: {
            isEnLang() {
                return this.$i18n.locale === 'en';
            }
        }
    }
</script>

<style lang="scss">
  @import '~assets/scss/vars.scss';

  .footer-wrapper {
    .footer__row {
      @include mainWrapper;
    }
    .nowrap {
      white-space: nowrap;
      margin-left: 24px;
    }
    .v-btn--active::before {
      opacity: 0;
    }
    &__text--nowrap {
      white-space: nowrap;
    }
    .theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
      color: $footerText!important;
    }
    .v-list-item {
      width: fit-content;
      .v-ripple__container {
        display: none;
      }
      .v-list-item__title {
        font-size: 0.95rem;
        overflow: visible;
      }
    }
    .v-list-item-group {
      padding-top: 12px;
    }
    address.v-list-item-group {
      padding-top: 22px;
    }
    .theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled):hover,
    .theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled):hover .v-icon{
      color: white!important;
    }
    address {
      font-style: normal;
      .v-list-item {
        font-weight: 500;
        white-space: normal;
        line-height: 1.3rem;
      }
    }
  }
  @media all and (max-width: 600px) {
    .footer-wrapper {
      .nowrap {
        margin-left: 0;
      }
      .v-list-item--dense,
      .v-list--dense .v-list-item {
        min-height: 34px;
      }
      .v-list-item-group {
        padding-top: 0;
      }
      address.v-list-item-group {
        padding-top: 0;
      }
    }
  }
</style>
