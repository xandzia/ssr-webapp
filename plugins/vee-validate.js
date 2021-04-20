import { required, digits, email, max, regex, min } from 'vee-validate/dist/rules';
import { extend, configure, ValidationObserver, ValidationProvider, setInteractionMode, localize } from 'vee-validate';
import Vue from "vue";
import en from "vee-validate/dist/locale/en.json";
import uk from "vee-validate/dist/locale/uk.json";
// import i18n from "./i18n";
//
// configure({
//   defaultMessage: (field, values) => {
//     // override the field name.
//     values._field_ = i18n.t(`fields.${field}`);
//
//     return i18n.t(`validation.${values._rule_}`, values);
//   }
// })


setInteractionMode('eager');

extend('min', min);
extend('required', required);
extend('email', email);

// extend('min', {
//   ...min,
//   message: '{_field_} повинно містити не менше {length} символів.',
// });

// extend('required', {
//   ...required,
//   message: '{_field_} обов\'язкове для заповнення',
//   // message: (_, values) => i18n.t("validation.required", values)
// });

// extend('email', {
//   ...email,
//   message: 'Некоректний формат email',
// });
