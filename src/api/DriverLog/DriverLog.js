// 
//  驾驶员接口
// 
import axios from '@/api/ajax';
const apiPrefixbaseNew = 'http://192.168.2.185:7770';
const driverLog = {
    getDriver(id) {
        return axios.get(apiPrefixbaseNew + '/jobTask/queryHaulWayTaskInfo',{params:{id}})
    },
}


export default driverLog;