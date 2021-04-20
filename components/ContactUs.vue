<template>
  <validation-observer
    ref="observer"
    v-slot="{ invalid }"
  >
    <form @submit.prevent="submit" class="contactUs-section pb-6">
      <validation-provider
        v-slot="{ errors }"
        :name="$t('fields.name')"
        rules="required"
      >
        <v-text-field
          background-color="white"
          outlined
          v-model="userInfo.name"
          :error-messages="errors"
          :label="$t('placeholders.name')"
        ></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        :name="$t('fields.email')"
        rules="required|email"
      >
        <v-text-field
          background-color="white"
          outlined
          v-model="userInfo.email"
          :error-messages="errors"
          :label="$t('placeholders.email')"
        ></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        :name="$t('fields.message')"
        rules="required|min:10"
      >
        <v-textarea
          background-color="white"
          :name="$t('fields.message')"
          :label="$t('placeholders.message')"
          auto-grow
          outlined
          v-model="userInfo.message"
          :error-messages="errors"
        ></v-textarea>
      </validation-provider>
      <v-file-input
        class="upload-file"
        background-color="white"
        outlined
        multiple
        show-size
        @change="test"
        :value="userInfo.files"
        small-chips
        :label="$t('placeholders.fileInput')"
        :rules="rules"
        prepend-icon=""
        prepend-inner-icon=""
      >
        <div slot="prepend-inner">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#a2a2a2" d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z" />
          </svg>
        </div>
      </v-file-input>
<!--      <span class="d-block greyDarken&#45;&#45;text caption font-italic mb-2">Максимум 5 файлів розміром до 1МБ кожен</span>-->
      <v-row class="ma-0" align="center" justify="space-between">
        <vue-recaptcha
          v-if="recapchaShow"
          class="contactUs__recaptcha col-12 col-sm-7 col-md-6 pa-0"
          sitekey="6LdqBJgaAAAAABx2i4cskOWZt6oFQnAnWXz-foSF"
          :size="recaptchaWidth"
          badge="inline"
          hl="uk"
          ref="recaptcha"
          @verify="verifyRecaptcha"
          @expired="expiredRecaptcha"
        ></vue-recaptcha>

        <v-btn
          class="ml-auto mt-3 mr-0 col-12 col-sm-5 col-md-3 col-lg-5"
          type="submit"
          color="primary"
          :loading="loading"
          width="'100%'"
          aria-label="Submit the form"
          :disabled="invalid || !isCaptchaVerified"
        >
          {{ $t('buttons.send') }}
        </v-btn>
      </v-row>
    </form>
    <div class="contactUs-alert--wrapper">
      <v-alert
        class="mb-0"
        v-show="showAlert"
        dense
        text
        :type="alertType"
      >
        {{ alertText }}
      </v-alert>
    </div>
  </validation-observer>
</template>

<script>
    import { ValidationObserver, ValidationProvider } from "vee-validate";
    import VueRecaptcha from 'vue-recaptcha';
    import getIp from '~/utils/getIp'

    export default {
        components: {
            ValidationProvider,
            ValidationObserver,
            VueRecaptcha
        },
        head() {
            return {
                script: [
                    { src: 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit', async: true },
                ]
            }
        },
        name: "ContactUs",
        data: () => ({
            userInfo: {
                name: '',
                emailAddress: '',
                emailBody: '',
                recaptchaResponse: '',
                clientIp: '',
                files: []
            },
            isCaptchaVerified: false,
            name: '',
            email: '',
            message: '',
            showAlert: false,
            alertType: 'success',
            alertText: '',
            loading: false,
            recapchaShow: false
        }),

        validations() {
            return {
                isCaptchaVerified: {
                    isVerified (value) {
                        return value
                    }
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.recapchaShow = true;
            })
        },

        methods: {
            submit () {
                this.$refs.observer.validate().then((res) => {
                    if (res) {
                        this.$nuxt.$loading.start();
                        this.loading = true;
                        this.$axios.post('/api/mail', {
                            'name': this.userInfo.name,
                            'email': this.userInfo.email,
                            'message': this.userInfo.message,
                            'file': this.userInfo.files
                        }).then(() => {
                            this.alertText = this.$t('alertText.success');
                            this.alertType = 'success';
                            this.showAlert = true;
                        }).catch(() => {
                            this.alertText = this.$t('alertText.error');
                            this.alertType = 'error';
                            this.showAlert = true;
                        }).finally(() => {
                            this.$nuxt.$loading.finish();
                            this.loading = false;
                            setTimeout(()=> {
                                this.alertType = 'success';
                                this.alertText = '';
                                this.showAlert = false;
                            }, 9000)
                        })
                    }
                });
            },
            verifyRecaptcha(responce) {
                this.isCaptchaVerified = true;
                this.userInfo.recaptchaResponse = responce;
                getIp(ip => this.userInfo.clientIp = ip);
            },
            expiredRecaptcha() {
                this.isCaptchaVerified = false;
            },
            test(file) {
                console.log(file)
            }
        },
        computed: {
            isEnLang() {
                return this.$i18n.locale === 'en';
            },
            rules() {
                return [
                    files => !files || !files.some(file => file.size > 1024 * 1024) || this.$t('alertText.uploadFile')
                ]
            },
            recaptchaWidth() {
                // return 'normal'
                return this.$vuetify.breakpoint.width < 340 ? 'compact' : 'normal'
            }
        },
        watch:{
            recaptchaWidth() {
                this.recapchaShow = false;
                setTimeout(() => { this.recapchaShow = true });
            }
        }

    }
</script>

<style lang="scss">
  @import '~assets/scss/vars.scss';

  .contactUs-alert--wrapper {
    min-height: 40px;
  }
  .contactUs-section {
    .contactUs__recaptcha {
      min-width: 305px;
      min-height: 79px;
    }
    .v-input__prepend-inner,
    .v-input__append-inner {
      margin-top: 10px!important;
    }
    .v-text-field--outlined fieldset {
      opacity: 0.6;
    }
    .v-text-field--outlined > .v-input__control > .v-input__slot {
      min-height: 44px;
      margin-bottom: 4px;
    }
    .upload-file {
      .v-input__control > .v-input__slot {
        min-height: 44px;
      }
      .v-text-field--outlined .v-label {
        top: 14px;
      }
    }
    .upload-file.v-text-field--outlined .v-label {
      top: 14px;
    }
    .theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state):not(.v-input--is-disabled) > .v-input__control > .v-input__slot:hover fieldset {
      color: $primary;
    }
    .v-text-field--outlined.v-input--is-focused fieldset, .v-text-field--outlined.v-input--has-state fieldset {
      border-width: 1px;
    }
    .v-input .v-label {
      font-size: 13px;
      color: $primary;
      opacity: 0.8;
      height: 38px;
      line-height: 13px;
    }
    .v-text-field--outlined .v-label,
    .v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) .v-label {
      top: 14px;
    }
    .v-text-field--outlined .v-label--active {
      transform: translateY(-18px) scale(0.75);
    }
    .v-alert {
      margin-bottom: 0;
    }
  }
</style>
