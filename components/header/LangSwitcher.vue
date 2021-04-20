<template>
  <div>
    <nuxt-link
      v-for="locale in $i18n.locales"
      v-if="locale.code !== $i18n.locale"
      :key="locale.code"
      :to="switchLocalePath(locale.code)">
      <v-btn fab
             small
             depressed
             color="transparent"
             tag="span"
             class="ml-0"
             aria-label="Switch language"
      >
        {{ locale.name }}
      </v-btn>
    </nuxt-link>
  </div>
</template>

<script>
    export default {
        name: "LangSwitcher",
    }
</script>

<style scoped>

</style>
