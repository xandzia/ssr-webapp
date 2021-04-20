<template>
  <v-app v-scroll="onScroll" v-cloak>
    <TheHeader />
      <v-main class="flex-grow-1 flex-shrink-0">
        <transition name="fade">
          <Nuxt />
        </transition>
      </v-main>
    <TheFooter />
    <transition name="scale">
      <v-btn
        aria-label="Go to the page's top"
        v-if="showFlatBtn"
        class="flat-btn"
        fixed
        dark
        fab
        right
        bottom
        outlined
        color="footer"
        @click="scrollToTop"
      >
<!--        <v-icon>-->
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#2c2f3b"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>
<!--        </v-icon>-->
<!--        <v-icon>mdi-arrow-up</v-icon>-->
      </v-btn>
    </transition>
  </v-app>
</template>

<script>
    export default {
        scrollToTop: true,
        name: 'DefaultLayout',
        data(){
            return {
                scrollOffset: 0
            }
        },
        methods: {
            onScroll(e) {
                this.scrollOffset = e.target.scrollingElement.scrollTop;
            },
            scrollToTop() {
                this.$vuetify.goTo(0)
            }
        },
        computed: {
            showFlatBtn() {
                return this.scrollOffset > 400
            }
        }
    }
</script>

<style lang="scss">
  @import '~assets/scss/vars.scss';
  @font-face {
    font-family: Roboto;
    font-display: swap;
  }
  html {
    /*font-family: 'PT Sans', sans-serif;*/
    font-family:
      'Source Sans Pro',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      'Helvetica Neue',
      Arial,
      sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    line-height: 1.15;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
  }

  .main-container {
    @include mainWrapper;
  }
  .main-page {
    padding-top: 64px;
  }
  .v-main__wrap {
    min-height: 500px;
  }
  .scale-enter-active, .scale-leave-active {
    transition: transform .5s;
  }
  .scale-enter, .scale-leave-to {
    transform: scale(0);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.15s ease-out;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .section-header {
    visibility: hidden;
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
  }
</style>
