<template>
  <div class="container">

    <div class="head">
        <span class="login">登录</span>
    </div>

    <div class="cont">
        <!-- <img src="../assets/img/login_logo.png" alt="" > -->
        <div class="form">
            <van-form @submit="onSubmit"
            
             >
                <van-field
                    v-model="phone"
                    name=""
                    size="28px"
                    placeholder="请输入手机号码"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <div class="word" >
                    <van-field
                    v-model="phonepass"
                    type=""
                    name=""
                    placeholder="请输入验证码"
                    class="phonepass"
                    :rules="[{ required: true, message: '请填写密码' }]"
                    
                    />
                    <van-button type="default" v-if="isAgain" @click="getSendMessage">获取验证码</van-button>
                    <span v-else>重新获取 (<span class="number">{{codeTime}}</span>s)</span>
                </div>
               
                </van-form>
            <span class="btn" @click="toLogin">登&nbsp;录</span>
            <!-- <button @click="ant">按钮</button> -->
            <span class="text">未注册的手机号验证后自动为您创建一米账户</span>
        </div>
    </div>
   <div class="foot">
        <span > 登录即表示同意一米农服</span>
        <span class="user-bott">用户隐私协议</span>
   </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { Form ,field,button,Dialog } from 'vant';
Vue.use(Form);
Vue.use(field)
Vue.use(button)
Vue.use(Dialog )
export default {
    name: 'Login',
    data() {
        return {
            phone: '',//手机号
            phonepass: '',
            number:'17865653508',
            code:'',
            id: '',
            wUser:{
                phone: '',
                code: '',
            },
            type:'2',//类型2:登录
            isAgain:true,
            codeTime:60,
            
        }
    },
    created(){
        let url = window.location.href;
        console.log(url)
        let param = url.split("?")[1].split("&");
        this.code = param[0].split("=")[1];
        this.id = param[1].split("=")[1];
        console.log('code~~',this.code)
        console.log('id~~',this.id)
        this.getCodeRedirect();
    },


    mounted(){
        // this.ant()
    },
    methods: {
        // ant(){
        //     let btnPermissionArr =['a','b','c','d','d','f'] //模拟的后台给的按钮权限数据
        //         if(!window.localStorage){
        //             alert('浏览器不支持localStorage')
        //             console.log('111')
        //         }else{
        //             window.localStorage.removeItem('btnPermission')
        //             window.localStorage.setItem('btnPermission',JSON.stringify(btnPermissionArr))
        //         }
                            
        // },


        /*获取微信code后回调地址--判断是否登录过*/
        getCodeRedirect(){
            this.$api.reqLogin.getCodeRedirect(this.code).then(resp => {
                console.log('授权数据',resp);  //操作成功
                if(resp.data.code ==200){//登录过直接跳详情
                    if(resp.data.result.loginStatus){//true,直接跳转详情页面
                        this.wUser = resp.data.result.userLoginVO;
                        this.share(this.id,this.wUser.phone);
                    }else{
                        this.wUser = resp.data.result;
                    }
                    sessionStorage.setItem("user",JSON.stringify(this.wUser));
                }else{ //失败 提示
                    this.$toast({
                        message: resp.data.message,
                        position: 'bottom',
                    });
                }
            }).catch(err => {
            })
        },
        share(ids,phone) {
            console.log(phone) //{带过去的相关数据}
            this.$api.reqLogin.queryTaskShareRecordById(ids , phone).then(resp => {
                console.log('查询任务分享根据ids和手机号',resp);
                if(resp.data.code==200){
                    console.log(resp.data)
                    let data = resp.data.result;
                    if(data.phone != phone){
                        // this.$router.push({
                        //         path: '/Work',
                        //         query: data,
                        //     })

                        Dialog.confirm({
                            title: '任务提示',
                            message: '非本人任务不可查看',
                            showConfirmButton:true,
                            showCancelButton:true,
                            confirmButtonText:'查看本人任务',
                            cancelButtonText:'关闭',
                            
                            })
                            .then(() => {
                                //类型（1、作业任务；2、巡田任务；3、运输任务）
                                    if(data.taskType==1){
                                        this.$router.push({
                                            path: '/WorkDetail',
                                            query: data,
                                        })
                                    }else if(data.taskType==2){
                                        this.$router.push({
                                            path: '/Patrolfields',
                                            query: data,
                                        })
                                    }else if(data.taskType==3){
                                        this.$router.push({
                                            path: '/Driverlog',
                                            query: data,
                                        })
                                    }
                              
                            })
                            .catch(() => {
                                console.log('你确定关闭吗？')
                            });

                    }
                    // else{
                        // //类型（1、作业任务；2、巡田任务；3、运输任务）
                        // if(data.taskType==1){
                        //     this.$router.push({
                        //         path: '/Work',
                        //         query: data,
                        //     })
                        // }else if(data.taskType==2){
                        //     this.$router.push({
                        //         path: '/Patrolfields',
                        //         query: data,
                        //     })
                        // }else if(data.taskType==3){
                        //     this.$router.push({
                        //         path: '/Driver',
                        //         query: data,
                        //     })
                        // }
                    // }
                    
                    
                }else{
                    this.$toast({
                        message: resp.data.message,
                        position: 'bottom',
                    });
                }
                }).catch(err => {
            })
        },
        onSubmit(values) {
            console.log('submit', values);
        },
        /*获取手机验证码*/
        getSendMessage(){ 
            console.log(this.phone+'===='+this.type) //17865653508====2
            this.$api.reqLogin.getSendMessage(this.phone,this.type).then(resp => {
                console.log('获取验证码',resp)
                    if(resp.data.code ==200){
                        this.isAgain=false;
                        this.codeTime = 60;
                        this.isAgain = false;
                        if (this.codeTime > 0 || this.codeTime <= 60) {
                            var timer = setInterval(() => {
                                this.codeTime = this.codeTime - 1;
                                if (this.codeTime <= 0) {
                                    clearInterval(timer);
                                    this.isAgain = true;
                                }
                            }, 1000);
                        }
                        // this.wUser = resp.data.result;
                        // sessionStorage.setItem("user",JSON.stringify(this.wUser));
                        this.share(this.id,sessionStorage.getItem('user'),this.wUser.phone);
                    }else{
                        this.$toast({
                            message: resp.data.message,
                            position: 'bottom',
                        });
                    }
                }).catch(err => {
                })
        },
        // 登录
        toLogin(){
            let {phone,phonepass}=this
            let phoneword=/^1\d{10}$/ ;
            // let phonepasses=/^[.\n]+$/;
            if(!phoneword.test(phone.trim())){
               this.$toast({
                        message: "手机号格式不正确",
                        position: 'bottom',
                    });
                return
            }
            else if( !phonepass.trim()){
                this.$toast({
                        message: "验证码不正确",
                        position: 'bottom',
                    });
                return

            }else{
                this.wUser.phone = this.phone;
                this.wUser.code = this.phonepass;
                console.log(this.wUser)
                this.$api.reqLogin.getLogin(this.wUser).then(resp => {
                    console.log(resp) 
                    console.log(resp.data.result)
                    //id: "2020090317391334192"
                    //loginToken: "D271E07DFD0AFB0D77711B6E1A5F519B"
                    //phone: "17865653508"
                    //realName: "焦水笛"
                    //startActiveDate: "2020-09-03 17:39:24"
                    //userId: "9c8fe7b7f853449ba2f31a5b171e744d"
                    //userName: "焦水笛"
                    //userType: 2

                    let Message=resp.data.result
                    if(resp.data.code ==200){
                        sessionStorage.setItem("companyId",resp.data.result.companyId);
                        sessionStorage.setItem("loginToken",resp.data.result.loginToken);
                        sessionStorage.setItem("id",resp.data.result.id);
                        sessionStorage.setItem("phone",resp.data.result.phone);
                        this.share(this.wUser.code,this.wUser.phone);

                        //  this.$router.push('/',params:{})

                    
                    //在登录后，跳转前 发请求获取按钮权限数据
                    this.$api.reqLogin.getBtnsControll().then(res=>{
                        console.log(res)
                        if(res.data.code==200){
                           if(!window.localStorage) alert('浏览器不支持localStorage')
                           else{
                            window.localStorage.setItem('btnPermission',JSON.stringify(btnPermissionArr))
                           }
                        }else{
                            return
                        }
                        
                    })

                        // let btnPermissionArr =['a','b','c','d','e','f'] //模拟的后台给的按钮权限数据
                        // if(!window.localStorage){
                        //     alert('浏览器不支持localStorage')
                        //     console.log('111')
                        // }else{
                        //     window.localStorage.setItem('btnPermission',JSON.stringify(btnPermissionArr))
                        // }
                    
                    
                    // sessionStorage.setItem(JSON.stringify([asd,adef,aewfrg,gthyj,trd,awreg]))
                    // console.log(btnPermissionArr);
                        
                   
                        }else{
                
                        this.$toast({
                            message: resp.data.message,
                            position: 'bottom',
                        });
                    }
                }).catch(err => {
                })
            }
            
        }
    }
}
</script>

<style>
.container{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.head{
    font-size: 28px;
    height: 100px;
    line-height: 100px;
    /* border:1px solid #333; */
    display:flex;
    /* justify-content: center; */
    background :#eee;
  
}
.head .login{
    font-size: 32px;
    flex: 1;
    text-align: center;
}
.head .passlogin{
    margin-right:50px;
    color:blue;
    font-size: 26px;
}
.cont{
  height: calc(100vh-100px);
  /* background: #333; */
}
.cont img{
    display: block;
    height: 250px;
    margin:50px auto ;
    line-height: 250px;
}
.cont .form{
    margin-top:30%;
    height: 500px;
}
.form .van-form{
    display: flex;
    flex-direction: column;
    /* justify-content:center ;
    align-items: center; */

}
.cont .form .van-field{
    border-bottom:1px solid #DADADA;
    width: 80%!important;
    height: 80px;
    border-radius:0;
    font-size: 28px;
    line-height: 60px;
    margin-bottom: 40px;
    margin: 0 auto;
}
.cont .form .word .phonepass{
    border-bottom:none!important;
}
.cont .form .word{
    display: flex;
    width:80%;
    margin:50px auto 0;
    border-bottom:1px solid #DADADA;
}
.cont .form  .word .phonepass{
    /* width: 280px; */
    width:40%;
    /* justify-content: flex-start; */
}

.cont .form .word .van-button{
  height: 64px;
  justify-content: flex-end;
  width:40%;
  text-align: center;
  margin-left: 20px;
  border-radius: 10px;
  font-size: 28px;
  border: 3px solid #0EC288;
    border-radius: 300px;
    color: #0EC288;
}
.cont .btn{
    display: block;
    color:#eee;
    background: salmon;
    width: 80%;
    font-size: 34px;
    height: 80px;
    line-height: 80px;
    margin: 0 auto;
    text-align: center;
    margin-top: 50px;
    border-radius: 15px;
    background: linear-gradient(270deg, #44E3B0 0%, #01AF78 100%);
    box-shadow: 1px 8px 16px 0px rgba(2, 178, 122, 0.24);
    border-radius: 38px;
}
.cont .text{
    display:block;
    margin:auto;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-weight: normal;
    color:#9A9A9A;
}

.container .foot{
    display: flex;
    height: 80px;
    line-height: 80px;
    font-size: 30px;
    position: fixed;
    bottom:60px;
    margin-left: 120px;
    color:#666;
}
.container .user-bott{   
    color:#0EC288;
    text-decoration:underline ;
}
/*提示信息*/
.van-toast{
    padding: 3%!important;
    font-size: 22px!important;
}
</style>