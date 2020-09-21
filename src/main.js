import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible/flexible'
import api from '@/api/index.js'
import wechatAuth from './axios/wechatAuth'
import router from "./router"
import store from './store'

Vue.prototype.$api = api;


// 引入全局leaflet
import L from "leaflet";
import "leaflet/dist/leaflet.css";
//import Vuex from 'vuex'

// Vue.use(Vuex)



Vue.L = Vue.prototype.$L = L
//这里是配置微信公众号的appid
Vue.use(wechatAuth, {
  appid: "wx763343172c7dee2b",
  scope: 'snsapi_userinfo',
})


Vue.config.productionTip = false
import {Dialog,Step, Steps,NavBar,AddressEdit,Cell, Divider ,Popup ,Checkbox, CheckboxGroup,DatetimePicker ,Rate ,Field ,CellGroup ,Icon,Tag, Col, Row,ShareSheet,Uploader ,RadioGroup, Radio,Image,Toast,Loading,Notify } from 'vant'
/* eslint-disable no-unused-vars */
import moment from "moment";
import { HappyScroll } from 'vue-happy-scroll'
//自定义组件名
Vue.component('happy-scroll', HappyScroll)
// 引入css
import 'vue-happy-scroll/docs/happy-scroll.css'



Vue.prototype.$moment = moment;
Vue.use(Dialog);
Vue.use(Divider);
Vue.use(Step);
Vue.use(Steps);
Vue.use(NavBar);
Vue.use(AddressEdit);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Icon);
Vue.use(Tag);
Vue.use(Col);
Vue.use(Row);
Vue.use(ShareSheet);
Vue.use(Uploader);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Image);
Vue.use(Toast);
Vue.use(Rate);
Vue.use(Field);
Vue.use(DatetimePicker);
Vue.use(Popup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Loading);
Vue.use(Notify);

// console.log(a)

// 引入权限控制的主模块
// import '@/util/permission'
// import hasBtnPermission from './util/permission'
// 挂载到Vue原型对象上, 以便组件中直接可见
// Vue.prototype.$hasPerm  = hasBtnPermission

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
