import Vue from "vue";
import Vuex from 'vuex';
import index from './modules'
import getters from './getter'
Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
      index,
    },
    getters
  })
