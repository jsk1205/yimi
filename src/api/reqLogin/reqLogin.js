// 
//  授权接口
// 
import axios from '@/api/ajax';
const apiPrefixbaseNew = 'http://192.168.2.126:7720/';//svg
// /sysUserLogin/h5/jurisdiction  h5 权限获取
//  /sysUserLogin/h5/login  h5登录接口

const apiPrefix = 'http://192.168.2.185:7770';//测试
// const apiPrefixbaseNew='http://saas.api.test.emibj.com:18081'
// const apiPrefixpower='http://saas.api.test'

const reqLogin = {
    //获取appid
    getDefaultLink() {
        return axios.get(apiPrefixbaseNew + '/weChat/queryCodeUrl')
    },
    //获取微信code后回调地址
    getCodeRedirect(code) { 
        return axios.get(apiPrefixbaseNew + '/weChat/codeRedirect?code='+code)
    },
    //h5封装接口 登录
    getLogin(params) {
        return axios.post(apiPrefixbaseNew + '/sysUserLogin/h5/login',params)
    },
    /*发送短信验证码*/ 
    getSendMessage(phone,type) {
        return axios.get(apiPrefixbaseNew + '/userRegistry/sendMessage',{params:{phone,type}})
    },
    //分享接口（分享任务的ids,手机号） 安卓保存到 185测试服，取到相关数据
    queryTaskShareRecordById(ids,phone) {
        return axios.get(apiPrefix + '/taskShareRecord/queryTaskShareRecordById',{params:{ids,phone}})
    },
    // getTaskShareRecordById(ids,phone) {
    //     console.log(params)
    //     return axios.get(apiPrefixbaseNew + '/taskShareRecord/queryTaskShareRecordById',{params:{ids,phone}})
    // },

     
    //获取后台按钮权限信息
    getBtnsControll(params){
        return axios.get(apiPrefixbaseNew+'/sysUserLogin/h5/jurisdiction',params)
    }
    



    
}


export default reqLogin;