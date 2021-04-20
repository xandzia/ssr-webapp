<template>
  <div>
    <v-btn
      @click="getItems"
    >
      get
    </v-btn>
  </div>
</template>

<script>
    // import gloss from "/data/glossary/items/*"
    export default {
        name: "TestCms",
        data() {
            return{
                timeline: [
                    { fileName: "001", group: 0, title: "", title_en: "", start: "2019-01-01", end: "2019-01-15" }
                ],
                // gloss
            }
        },
        methods: {
            async getItems(){
                try {
                    await this.$axios.$get('')
                } catch (err) {
                    console.error(err)
                }
            }
        }
    }
</script>
