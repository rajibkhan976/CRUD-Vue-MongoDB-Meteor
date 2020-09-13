import { Meteor } from 'meteor/meteor';
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import router from "./router.js";
import VueMeteorTracker from 'vue-meteor-tracker';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from '../imports/ui/App.vue';

Vue.use(BootstrapVue); 
Vue.use(router);
Vue.use(VueMeteorTracker);
 
Meteor.startup(() => {
  new Vue({
	router,
    el: '#app',
    ...App,
  });
});