<template>
  <v-row align="center" class="justify-center ma-0 partner-block pb-8">
    <v-col v-for="partner in partners" :key="partner.link" class="px-2 py-3">
      <a target="_blank" :href="partner.link">
        <v-lazy class="partner-block__img" min-height="50" min-width="100" transition="fade-transition">
          <img :src="partner.src" :alt="partner.alt" class="d-block mx-auto">
        </v-lazy>
      </a>
    </v-col>
  </v-row>
</template>

<script>
    export default {
        name: "ThePartners",
        props: ['partners']
    }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/vars.scss';

  .partner-block {
    .partner-block__img {
      border: 1px solid transparent;
      border-radius: 4px;
    }
    .partner-block__img:hover {
      box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    }
  }
  @media screen and (max-width: 690px){
    .partner-block {
      img {
      }
    }
  }
</style>
