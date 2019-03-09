import Vue from 'vue';
import './plugins/vuetify';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import router from './router';
import store from './store';
import ListPanel from './components/globals/ListPanel.vue';

Vue.config.productionTip = false;

Vue.component('ListPanel', ListPanel);

sync(store, router);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
