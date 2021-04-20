<template>
  <div class="main-page main-container admin-page mb-6">
    <v-row tag="article" justify="center" class="main-page main-container mt-6 pb-6">
      <h2 class="col-12 text-center footer--text text-h5 font-weight-medium text-uppercase px-2 py-4 mb-3">{{ $t('adminTitle') }}</h2>
      <v-col tag="section" cols="12" sm="6" md="6" class="order-2 order-sm-1">
        <v-card
            class="mx-auto"
            max-width="300"
            tile
            outlined
          >
            <v-card-title class="primary--text text-center">Розділи</v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-item-group
                color="primary"
              >
                <v-list-item
                  v-for="item in chapters"
                  :key="item.name"
                  :href="item.link && linkBuild(item.link)"
                  tag="a"
                  target="_blank"
                >
                  <v-list-item-icon class="greyDarken--text" v-html="item.icon"></v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
        </v-card>
        <p class="pt-6 text-center">
          Інструкція <a href="https://markdown-it.github.io/">https://markdown-it.github.io/</a>
        </p>
      </v-col>
      <v-col tag="section" cols="12" sm="6" md="4" lg="3" class="order-1 order-sm-2">
        <v-btn
          class="authorization__button"
          block
          color="accent"
          @click="onLoginBtn"
        >
          {{ currentUser ? 'вийти з профілю' : 'увійти в профіль' }}
        </v-btn>
        <div v-if="currentUser" class="authorization__user-data mt-3 primary--text">
          <p>Ви увійшли як користувач: {{ currentUser.email }}</p>
        </div>
      </v-col>
    </v-row>
<!--    <template v-if="currentUser">-->
<!--      <h2 class="primary&#45;&#45;text mb-3">Розділи</h2>-->
<!--      <v-btn-->
<!--        v-for="item in chapters"-->
<!--        :key="item.name"-->
<!--        :disabled="!currentUser"-->
<!--      ></v-btn>-->
<!--    </template>-->
<!--    <div id="netlify-modal"></div>-->
  </div>
</template>

<script>
    const netlifyIdentity = require('netlify-identity-widget');

    export default {
        scrollToTop: true,
        name: "Admin",
        data() {
            return {
                currentUser: {
                    email: 'blabla'
                },
                chapters: [
                    {
                        title: 'Головна',
                        name: 'main',
                        link: '/admin/main',
                        icon: '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M7 22H9V24H7V22M11 22H13V24H11V22M15 22H17V24H15V22M5 4H19A2 2 0 0 1 21 6V18A2 2 0 0 1 19 20H5A2 2 0 0 1 3 18V6A2 2 0 0 1 5 4M5 8V18H19V8H5" /></svg>'
                    },
                    {
                        title: 'Проекти',
                        name: 'projects',
                        link: '/admin/projects',
                        icon: '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M19,1L17.74,3.75L15,5L17.74,6.26L19,9L20.25,6.26L23,5L20.25,3.75M9,4L6.5,9.5L1,12L6.5,14.5L9,20L11.5,14.5L17,12L11.5,9.5M19,15L17.74,17.74L15,19L17.74,20.25L19,23L20.25,20.25L23,19L20.25,17.74" /></svg>'
                    },
                    {
                        title: 'Про нас',
                        name: 'about',
                        link: '/admin/about',
                        icon: '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M22,3H2C0.91,3.04 0.04,3.91 0,5V19C0.04,20.09 0.91,20.96 2,21H22C23.09,20.96 23.96,20.09 24,19V5C23.96,3.91 23.09,3.04 22,3M22,19H2V5H22V19M14,17V15.75C14,14.09 10.66,13.25 9,13.25C7.34,13.25 4,14.09 4,15.75V17H14M9,7A2.5,2.5 0 0,0 6.5,9.5A2.5,2.5 0 0,0 9,12A2.5,2.5 0 0,0 11.5,9.5A2.5,2.5 0 0,0 9,7M14,7V8H20V7H14M14,9V10H20V9H14M14,11V12H18V11H14" /></svg>'
                    },
                    {
                        title: 'Публікації в ЗМІ',
                        name: 'media',
                        link: '/admin/media',
                        icon: '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>'
                    },
                    {
                        title: 'Новини',
                        name: 'news',
                        link: '/admin/news',
                        icon: '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M20,11H4V8H20M20,15H13V13H20M20,19H13V17H20M11,19H4V13H11M20.33,4.67L18.67,3L17,4.67L15.33,3L13.67,4.67L12,3L10.33,4.67L8.67,3L7,4.67L5.33,3L3.67,4.67L2,3V19A2,2 0 0,0 4,21H20A2,2 0 0,0 22,19V3L20.33,4.67Z" /></svg>'
                    },
                    {
                        title: 'Вакансії',
                        name: 'vacancies',
                        link: '/admin/vacancies',
                        icon: '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M19 17V19H7V17S7 13 13 13 19 17 19 17M16 8A3 3 0 1 0 13 11A3 3 0 0 0 16 8M19.2 13.06A5.6 5.6 0 0 1 21 17V19H24V17S24 13.55 19.2 13.06M18 5A2.91 2.91 0 0 0 17.11 5.14A5 5 0 0 1 17.11 10.86A2.91 2.91 0 0 0 18 11A3 3 0 0 0 18 5M8 10H5V7H3V10H0V12H3V15H5V12H8Z" /></svg>'
                    },
                    {
                        title: 'Відео',
                        name: 'video',
                        link: '/admin/video',
                        icon: '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M17,10.5L21,6.5V17.5L17,13.5V17A1,1 0 0,1 16,18H4A1,1 0 0,1 3,17V7A1,1 0 0,1 4,6H16A1,1 0 0,1 17,7V10.5M10.91,9.55L9.2,11.82L10.5,13.55L9.77,14.09L7.73,11.36L5,15H15L10.91,9.55Z" /></svg>'
                    },
                    {
                        title: 'Контакти',
                        name: 'contacts',
                        link: '/admin/contacts',
                        icon: '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M11 14H9C9 9.03 13.03 5 18 5V7C14.13 7 11 10.13 11 14M18 11V9C15.24 9 13 11.24 13 14H15C15 12.34 16.34 11 18 11M7 4C7 2.89 6.11 2 5 2S3 2.89 3 4 3.89 6 5 6 7 5.11 7 4M11.45 4.5H9.45C9.21 5.92 8 7 6.5 7H3.5C2.67 7 2 7.67 2 8.5V11H8V8.74C9.86 8.15 11.25 6.5 11.45 4.5M19 17C20.11 17 21 16.11 21 15S20.11 13 19 13 17 13.89 17 15 17.89 17 19 17M20.5 18H17.5C16 18 14.79 16.92 14.55 15.5H12.55C12.75 17.5 14.14 19.15 16 19.74V22H22V19.5C22 18.67 21.33 18 20.5 18Z" /></svg>'
                    },
                ]
            }
        },
        mounted() {
            // this.initNetlify();
            // this.getLocalstorrageUser();
        },
        methods: {
            initNetlify() {
                netlifyIdentity.init({
                    container: '#netlify-modal'
                });

                netlifyIdentity.on('init', user => console.log('init', user));
                netlifyIdentity.on('login', user => this.onLogin(user));
                netlifyIdentity.on('logout', () => this.onLogOut());
                netlifyIdentity.on('error', err => console.error('Error', err));
                netlifyIdentity.on('open', () => console.log('Widget opened'));
                // netlifyIdentity.on('close', () => this.goHome());
            },
            onLoginBtn() {
                if (this.currentUser) {
                    this.logOut();
                } else {
                    this.openModal();
                }
            },
            openModal() {
                netlifyIdentity.open('login');
            },
            logOut() {
                netlifyIdentity.logout();
            },
            onLogin(user) {
                this.currentUser = user;
                netlifyIdentity.close();
            },
            onLogOut() {
                console.log('onLogOut')
                this.currentUser = null;
                this.goHome();
            },
            getLocalstorrageUser() {
                const currentUser = localStorage.getItem('gotrue.user');
                this.currentUser = JSON.parse(currentUser) || null;
                if (!currentUser) {
                    this.openModal();
                }
            },
            goHome() {
                window.open('/', '_self');
            }
        },
        computed: {
            linkBuild(){
                if (process.browser) return link => window.location.origin + link;
                return link => link
            }
        }
    }
</script>

<style scoped>

</style>
