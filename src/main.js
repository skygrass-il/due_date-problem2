// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import $ from 'jquery';

import App from './App'
import router from './router';
import './bus';
import currencyFilter from './filters/currency';
import timeStamp from './filters/timestamp';


Vue.use(VueAxios,axios);
Vue.component('Loading',Loading);
Vue.filter('currency',currencyFilter);
Vue.filter('time',timeStamp);
window.$ = $;

Vue.config.productionTip = false;
// axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
})

router.beforeEach((to, from, next) => {
  console.log('to',to,'from',from,'next',next);
  if(to.meta.requiresAuth){
    const api =`${process.env.APIPATH}/api/user/check`;
    // console.log(process.env.APIPATH);
    axios.post(api).then((response)=>{
      console.log(response.data);
      if(response.data.success){
      next();
      }else{
        next({
          path:'login',
        });
      }
    });
  }else{
    next();
  }
})







