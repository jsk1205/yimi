import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "./routes"
import wechatAuth from '../axios/wechatAuth'
import {
    Dialog
  } from "vant";
Vue.use(VueRouter)

export default new VueRouter({
    mode:'history',
    routes
})


//截取code
// function getCode() {
//     var url = location.search;
//     var code = "";
//     if (url.indexOf("?") != -1) {
//       var split = url.split("?code=")
//       code = split[1].split("&")[0]
//     }
//     return code;
//   }
  
//   // 获取sign
//   function getSign(next) {
//     let theCode = getCode();
//     if (theCode) {
//       var formData = new FormData();
//       formData.append("code", theCode);
//       axios({
//         method: "post",
//         url: "http:api",
//         data: formData
//       }).then(res => {
//         if (res.data.status == 1) {
//           localStorage.setItem("wx_sign", res.data.data.sign);
//           let realUrl = window.location.href.split("?")[0];
//           window.location.href = realUrl;
//           next()
//         } else {
//         //   Dialog.alert({
//         //     title: '提示',
//         //     message: res.data.msg,
//         //   }).then(() => {
//         //     WeixinJSBridge.call('closeWindow')
//         //   })
//         }
//       });
//     } else if (localStorage.getItem("wx_sign") == null) {
//       wechatAuth.redirectUri = window.location.href
//       window.location.href = wechatAuth.authUrl
//     } else {
//       next()
//     }
//   }
  
//   VueRouter.beforeEach((to, from, next) => {
//       console.log('to~~',to.meta)
//     window.document.title = to.meta.title;
//     // if (process.env.NODE_ENV == "production") {
//     //   getSign(next)
//     // } else {
//     //   next();
//     // }
//   });