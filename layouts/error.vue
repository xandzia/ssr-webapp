<template>
  <div class="main-page main-container pt-6 mt-6 error-page text-center">
    <div class="error-page__404">
      <v-row class="mt-6 flex-row" align="center" justify="center">
        <span class="d-block darkBlue--text text-h1">4</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="90"
          height="90"
          viewBox="0 0 48 48"
        >
          <path d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"/>
        </svg>
        <span class="d-block darkBlue--text text-h1">4</span>
      </v-row>
      <h2 v-if="error.statusCode === 404" class="textLightGrey--text pt-4 pb-1 mt-4">{{ $t('errorPage.notFound') }}</h2>
      <h1 v-else>An error occurred</h1>
      <h3 class="textLightGrey--text pb-4 pb-1">{{ error.message }}</h3>
      <NuxtLink to="/">{{ $t('errorPage.toMainPage') }}</NuxtLink>
    </div>
  </div>
</template>

<script>
    export default {
        name: "error",
        props: ['error'],
        beforeMount() {}
    }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/vars.scss';

  .error-page {
    position: relative;
    min-height: 70vh;
    svg {
      fill: $darkBlue;
    }
    h2 {
      white-space: nowrap;
    }
    &__404 {
      position: absolute;
      min-width: 300px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
