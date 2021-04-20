<template>
  <v-row
    tag="section"
    class="main-container align-center my-3 card-block__container py-0"
  >
    <v-col tag="h2" v-if="title" cols="12" class="text-center py-3 footer--text text-h5 font-weight-medium text-uppercase">
      {{ title }}
    </v-col>
    <v-col cols="12" xl="4" lg="4" md="4" sm="6"
           class="align-self-stretch"
           v-for="item in items"
           :key="item.title_en"
    >
      <v-hover>
        <template v-slot:default="{ hover }">
            <v-card
            @click="goTo(item)"
            height="100%"
            class="d-flex flex-column"
            :class="`elevation-${hover ? 6 : ''}`"
          >
            <div>
              <v-lazy min-height="200" transition="fade-transition">
                <v-img
                  :lazy-src="item.image.src"
                  max-height="580"
                  max-width="700"
                  :src="item.image.src"
                  :alt="isEnLang ? item.image.alt_en : item.image.alt"
                ></v-img>
              </v-lazy>
            </div>
            <v-card-title class="flex-grow-0 justify-center flex-shrink-0">{{ isEnLang ? item.title_en : item.title }}</v-card-title>
            <v-card-text
              class="d-flex pb-0 flex-grow-1 flex-shrink-0"
              v-html="$md.render(textCutter(item))"
            ></v-card-text>
            <v-card-actions v-if="actions">
              <v-btn
                aria-label="Show more information"
                class="ml-auto"
                color="primary lighten-1"
                @click="goTo(item)"
                text
                small
              >
                {{ $t('buttons.more') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-hover>

    </v-col>
  </v-row>
</template>

<script>
    export default {
        name: "TheCardBlock",
        props: ['items', 'title', 'id', 'actions'],
        methods: {
            textCutter(item) {
                const text = this.isEnLang ? item.content_en : item.content;
                if (this.id === 'newsTitle') {
                    const allTextLength = item.title.left + text.length;
                    if (item.image) {
                        return allTextLength < 500 ? text : `${text.substr(0, 270)} ...`
                    } else {
                        return allTextLength < 500 ? text : `${text.substr(0, 650)} ...`

                    }
                } else {
                    return text
                }
            },
            goTo(blog) {
                this.$emit('onGo', blog);
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
  .card-block__container {
    .v-card__title {
      word-break: normal;
    }
  }

</style>
