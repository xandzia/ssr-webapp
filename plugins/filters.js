import Vue from 'vue';

const MAX_LENGTH_NEWS = 500;

Vue.filter('textCutter', (text) => {
  return text.length < MAX_LENGTH_NEWS ? text : `${text.substr(0, MAX_LENGTH_NEWS)} ...`
});
