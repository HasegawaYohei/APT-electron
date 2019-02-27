import Vue from 'vue';
import './plugins/vuetify';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import router from './router';
import store from './store';
import ListPanel from './components/globals/ListPanel.vue';
import InspectionPanel from './components/globals/InspectionPanel.vue';

Vue.config.productionTip = false;

Vue.component('ListPanel', ListPanel);
Vue.component('InspectionPanel', InspectionPanel);

sync(store, router);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
