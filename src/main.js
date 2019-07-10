import Vue from 'vue';
import App from './App.vue';
import 'bootstrap'
import cookieconsent from 'vue-cookieconsent-component'

Vue.config.productionTip = false;
Vue.component('cookie-consent', cookieconsent)

new Vue({
  render: h => h(App),
}).$mount('#app');