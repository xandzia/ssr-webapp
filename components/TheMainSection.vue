<template>
    <v-row tag="section" class="main-container align-center">
      <h2 class="section-header">{{ content.title }}</h2>
      <v-col
        cols="12" xl="6" lg="6" md="6" sm="12"
        :class="[ imgFirst ? 'order-2 pl-2' : 'order-md-1 order-sm-2 order-2 pr-2' ]"
      >
        <article>
          <template v-if="content.role === 'list'">
            <p class="text-h6 mb-0 textLightGrey--text font-weight-medium px-3">{{ content.title }}</p>
            <ul class="textLightGrey--text pt-1 partners-list px-3">
              <li class="pt-0"
                  v-for="item in content.items"
                  :key="item"
              >- {{item}}</li>
            </ul>
          </template>
          <template v-else>
            <div class="textLightGrey--text px-3"
               :class="[ imgFirst ? 'text-right' : 'text-left', { 'text-center': $vuetify.breakpoint.smAndDown } ]"
               v-html="$md.render(content.text)"></div>
          </template>
        </article>
      </v-col>
      <v-col cols="12" xl="6" lg="6" md="6" sm="12"
             :class="[ imgFirst ? 'order-1' : 'order-md-2 order-1 order-xs-1' ]"
      >
        <v-lazy min-height="200" transition="fade-transition">
          <v-img
            :class="[ imgFirst ? 'mr-auto' : 'ml-auto',  { 'mx-auto': $vuetify.breakpoint.smAndDown }]"
            :lazy-src="imgLazySrc ? imgLazySrc : imgSrc"
            :max-height="imgSizes.height"
            :max-width="imgSizes.width"
            :src="imgSrc"
          ></v-img>
        </v-lazy>
      </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "TheMainSection",
        props: ['imgFirst', 'imgSrc', 'imgSizes', 'imgLazySrc', 'content'],
        data() {
            return {
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/vars.scss';
  .v-divider {
    border-width: 2px 0 0 0;
    width: 120px;
  }
  .partners-list {
    list-style: none;
    padding: 0;
  }
</style>
