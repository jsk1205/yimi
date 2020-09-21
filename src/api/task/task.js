// 
//  授权接口
// 
import axios from '@/api/ajax';
// const apiPrefixbaseNew = 'http://saas.api.test.emibj.com:18081';
// const apiPrefixbaseNew = '/mdc-app/'
// const apiPrefixbaseNew = 'http://192.168.2.185:7770/';
// const apiPrefixbaseNew = 'http://192.168.2.25:7770/';
const apiPrefixbaseNew='http://192.168.2.6:7770/';
// jobTask/queryRodeoAreaInfo  查看地块详情信息 get 
// jobTask/queryRodeoCoordinate  查看所有地块坐标 post
const taskApi = {
    queryMyTourFieldTaskView(id) {// 通过id查询
        return axios.get(apiPrefixbaseNew + 'jobTask/queryMyTourFieldTaskView',{params:{id}});
    },
	updateMyTourFieldTask(params) {// 执行巡田任务
		return axios.put(apiPrefixbaseNew + 'jobTask/updateMyTourFieldTask', params);
	},
	uploadFileField(fd) {// 上传文件
		return axios.post(apiPrefixbaseNew + 'jobTask/uploadFileField', fd);
	},
	findTourFieldTask(params) {// 查询我的巡田任务列表
		return axios.post(apiPrefixbaseNew + 'jobTask/findTourFieldTask', params);
	},
	queryHaulWayTaskInfo(id) {// 运输任务详情
		return axios.get(apiPrefixbaseNew + 'jobTask/queryHaulWayTaskInfo',{params:{id}});
	},
	queryHaulWayTaskTotal(params) {// 运输任务列表
		return axios.post(apiPrefixbaseNew + 'jobTask/queryHaulWayTaskTotal', params);/* queryHaulWayTaskTotalAgain */
	},
	updateDriverStatus(params) {//司机 确认发车 过磅 入仓 信息
		return axios.put(apiPrefixbaseNew + 'jobTask/updateDriverStatus', params);
	},
	addDriverDeparWeigh(params) {
		return axios.post(apiPrefixbaseNew + 'jobTask/addDriverDeparWeigh', params);
	},
	uploadFileWay(params) {
		return axios.post(apiPrefixbaseNew + 'jobTask/uploadFileWay', params);
	},
	addDriverDeparture(params) {// 填写发车信息
		return axios.post(apiPrefixbaseNew + 'jobTask/addDriverDeparture', params);
	},
    //查看地块详情信息
	driverRodeoAreaInfo(companyCode,id){
		return axios.get(apiPrefixbaseNew+'jobTask/queryRodeoAreaInfo',{params:{companyCode,id}})
	},
	//查看所有地块坐标
	driverRodeoCoordinate(params){
		return axios.post(apiPrefixbaseNew+'jobTask/queryRodeoCoordinate',params)
	}
	
}


export default taskApi;