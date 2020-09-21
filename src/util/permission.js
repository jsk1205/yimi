// import qs from 'qs'
// import router from '@/router'
// import store from '@/store'
// import wechatAuth from './axios/wechatAuth'
// 设置APPID
// wechatAuth.setAppId(process.env.VUE_APP_WECHAT_APPID)
// const whiteList = ['/404']
// router.beforeEach(async (to, from, next) => {
//   // 在白名单，直接进入
//   if (whiteList.indexOf(to.path) !== -1) {
//     return next()
//   }
//   const {loginStatus} = store.getters
//   switch (Number(loginStatus)) {
//     case 0:
//       // 获取跳转地址
//       wechatAuth.redirect_uri = processUrl()
//       await store.dispatch('user/setLoginStatus', 1)
//       window.location.href = wechatAuth.authUrl
//       break
//     case 1:
//       try {
//         wechatAuth.returnFromWechat(window.location.href)
//         const code = wechatAuth.code
//         console.log(code)
//         // 通过code换取token
//         // await store.dispatch('user/loginWechatAuth', code)
//         await store.dispatch('user/setLoginStatus', 2)
//         // hash
//         if (process.env.NODE_ENV !== 'development' && router.mode === 'hash') {
//           window.location.href = window.location.origin + window.location.pathname + window.location.hash
//         } else {
//           next()
//         }
//       } catch (err) {
//         await store.dispatch('user/setLoginStatus', 0)
//         next('/404')
//       }
//       break
//     case 2:
//       next()
//       break
//     default:
//       break
//   }
// })

// /**
//  * 处理url链接
//  * @returns {string}
//  */
// function processUrl() {
//   // 本地环境换通过auth.html拿code
//   if (process.env.NODE_ENV === 'development') {
//     // 中间授权页地址
//      return `${process.env.VUE_APP_WECHAT_AUTH_URL}?backUrl=${window.location.href}`
//   }
//   const url = window.location.href
//   // 解决多次登录url添加重复的code与state问题
//   const urlParams = qs.parse(url.split('?')[1])
//   let redirectUrl = url
//   if (urlParams.code && urlParams.state) {
//     delete urlParams.code
//     delete urlParams.state
//     const query = qs.stringify(urlParams)
//     if (query.length) {
//       redirectUrl = `${url.split('?')[0]}?${query}`
//     } else {
//       redirectUrl = `${url.split('?')[0]}`
//     }
//   }
//   return redirectUrl
// }


//权限
// import store from '@/store'

/**
 * 判断当前用户是否有此按钮权限
   @param {按钮权限字符串} permission 
 */

  // const reqLogin={
// export function  hasBtnPermission(permission) {
//       // 得到当前用户的所有按钮权限
    
//       this.$api.reqLogin.getBtnsControll(params).then((resp)=>{
//         console.log('授权权限数据',resp);
//         // let result=list.string

//         //模拟数据
//         const list=sessionStorage.setItem(JSON.stringify([asd,adef,aewfrg,gthyj,trd,awreg]))
//         console.log(list);
      
//         return list
        
//         const myBtns = store.getters.buttons
//     }
//   }

  
//存储的按钮权限数据，并写一个全局方法
//  function hasBtnPermission(permission){
//   let getBtnPermisssionArr=JSON.parse(localStorage.getItem('btnPermission'));
//   let Power=getBtnPermisssionArr.toString().replace(/,/g,'');
//   //   console.log(this.Power)
//   //   console.log(permission)
//   //   console.log(getBtnPermisssionArr) //["a", "b", "c", "d", "e", "f"]
//   console.log(permission)
//   console.log(Power)
//   console.log(Power.indexOf(permission)>-1)
//   return Power.indexOf(permission)>-1;
// }

  // 如果指定的功能权限在myBtns中, 返回true ==> 这个按钮就会显示, 否则隐藏
//   return myBtns.indexOf(permission) !== -1

// export default reqLogin;