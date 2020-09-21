<template>
  <div class="container">
    <!-- <div class="tit">
      <span class="title">任务详情</span>
    </div> -->
<!-- 
    <div class="bg"></div>

    <div class="contents">
      <div>
        <div class="text">一米农服服务号申请获得：</div>
        <div>你的微信头像、昵称、地区和性别信息</div>
      </div>

      <span></span>

      <div class="user">
        <div class="usermessage">
            <img src="" alt="" class="imgs">
            <div class="message">
              <span class="name">丽杰</span>
              <span class="person">微信个人信息</span>
            </div>
            <span class="success">√</span>
        </div>
      </div>
      
      <span class="longline"></span>

      <div class="nickname">使用其他头像和昵称</div>
     
           
      <div class="btn">
          <van-button type="default">
            <span>拒绝</span>
          </van-button>
         
      </div>

    </div> -->
     <!-- <van-button type="primary" @click="Login">
        <span class="prim">允许</span>
    </van-button> -->

  </div>
</template>

<script>
import Vue from 'vue';
import { Button } from 'vant';
import wechatAuth from '@/axios/wechatAuth';
// import Login from './Login'
Vue.use(Button);
export default {
  name: 'Home',
  props: {
  },
  // components:{
  //   Login
  // },
  data(){
    return{
      id:'2020082921100252028,2020082921100296408',//app传过来的任务id
    }
  },
  mounted(){
    let url = window.location.href;
    let param = url.split("?")[1].split("&");
    this.id = param[0].split("=")[1];
    console.log(this.id)
    this.Login()
  },
  methods: {
    // 获取微信code后回到地址
    Login(){
        this.$api.reqLogin.getDefaultLink().then(resp => {
            console.log('授权数据',resp);
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+resp.data.result.APPID+'&redirect_uri=http%3A%2F%2Ftest.weixin.emibj.com%3A81%2FLogin&response_type=code&scope=snsapi_userinfo&connect_redirect=1&state='+this.id+'#wechat_redirect';
            
          }).catch(err => {
        })
    },
  }
   



      
 
   


  

}
</script>

<style  >

.container .tit{
  width:750px;
  height: 92px;
  line-height: 92px;
  text-align: center;
  background:rgba(255,255,255,1);
}
.container .tit .title{
  width:142px;
  height:34px;
  font-size:36px;
  font-family:PingFang;
  font-weight:500;
  color:rgba(51,51,51,1);
}
.container .bg{
 width:750px;
 height:600px;
 background:rgba(0,0,0,1);
 opacity:0.75;
}
.contents{
  width:750px;
  height: 613px;
  background:rgba(255,255,255,1);
  border-radius:30px 30px 0px 0px;
}
.contents>div:nth-child(1){
  padding-left: 45px;
  box-sizing: border-box;
}
.contents>div .text{
  width:320px;
  height:25px;
  font-size:26px;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(102,102,102,1);
  line-height:40px;
  margin-top:70px;
}
.contents>div>div:nth-child(2){
  width:520px;
  height:29px;
  font-size:30px;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(51,51,51,1);
  line-height:40px;
  margin:39px 0 49px 0;
}
.contents>span{
  display: block;
  width:750px;
  height:1px;
  background:rgba(210,210,210,1);
}
.contents .user .usermessage{
  display: flex;
  padding-top: 24px;
  box-sizing: border-box;
}
.contents .user .imgs{
  display: block;
  width:100px;
  height: 100px;
  border-radius: 5px;
  border:1px solid #333;
  margin-bottom: 25px;
  margin-left: 45px;
}

.contents .user .usermessage .message{
  display:flex;
  flex-direction :column;
  margin: 14px 0 0 19px;
  font-size: 30px;
}
.contents .user .usermessage .message .name{
  width:60px;
  height:29px;
  font-size:30px;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(51,51,51,1);
  line-height:40px;
  margin-bottom: 19px;
}
.contents .user .usermessage .message .person{
  color:grey;
  width:160px;
  height:25px;
  font-size:26px;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(102,102,102,1);
  line-height:40px;
}
.contents .user .usermessage .success{
  width:27px;
  height: 26px;
  background:rgba(13,194,136,1);
  margin-left: 250px;
  display: block;
  text-align: center;
  margin-top: 36px;
 
}
.contents>span .longline{
  width:750px;
  height: 1px;
  border:1px solid rgb(202, 198, 198);
 
}
.contents .nickname{
  width:280px;
  height:25px;
  font-size:26px;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(13,194,136,1);
  line-height:40px;
  margin: 40px 0 0 44px;
}
.contents .btn{
  display: flex;
  position: fixed;
  bottom: 0;
}
.contents .btn .van-button:nth-child(1){
  width:374px;
  height:94px;
  background:rgba(255,255,255,1);
}
.contents .btn .van-button:nth-child(2){
  width:375px;
  height:94px;
  background:rgba(13,194,136,1);
}

.contents .btn .van-button span{
  display: block;
  width:72px;
  height:34px;
  font-size:36px;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(13,194,136,1);
  line-height:34px;
}
.contents .btn .van-button .prim{
  width: 72px;
  color: white;
}



</style>
