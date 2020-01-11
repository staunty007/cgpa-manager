// Import Vue
import Vue from 'vue';

// Import Framework7
import Framework7 from 'framework7/framework7-lite.esm.bundle.js';

// Import Framework7-Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import Framework7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';

// Import App Component
import App from '../components/app.vue';
//import "babel-polyfill"

//Import Vuex
import store from '../js/store.js';

import * as firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'


// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);

Vue.prototype.$fb = firebase;

// Init App
new Vue({
  el: '#app',
  render: (h) => h(App),
  store: store,

  // Register App Component
  components: {
    app: App
  },
});