import Home from '@/components/Home'
import Login from '@/components/Login'
import Map from '@/components/Map'

//路由

//作业
import WorkDetail from '@/pages/Work/WorkDetail'
import WorkList from '@/pages/Work/WorkList'
import WorkTaskAccept from '@/pages/Work/WorkTaskAccept'

//巡田
import Patrolfields from '@/pages/Patrolfields/Patrolfields'
import PatrolfieldsList from '@/pages/Patrolfields/PatrolfieldsList'

//运输
import DriverList from '@/pages/Driver/DriverList'
import DriverLog from '@/pages/Driver/DriverLog'
import DriverPlan from '@/pages/Driver/DriverPlan'

import Driverlandmap from '@/pages/Driver/Driverlandmap'//运输任务--选择地块


export default[
    {
        path: "/Home",
        // redirect: "/Home"
        component:Home
    },
    {
        path:'/Login',
        component:Login,
    },
    {
        path:'/Map',
        component:Map
    },

//   作业
    {
        path:'/WorkDetail',
        component:WorkDetail
    },
    {
        path:'/WorkList',
        component:WorkList
    },
    {
        path:'/WorkTaskAccept',
        component:WorkTaskAccept
    },
// 巡田
    {
        path:'/Patrolfields',
        component:Patrolfields
    },
    {
        path:'/PatrolfieldsList',
        component:PatrolfieldsList
    },
// 运输
  
    {
        
        path:'/DriverList',
        component:DriverList
       
    },
    {
        path:'/DriverLog',
        component:DriverLog
    },
    {
        path:'/DriverPlan',
        component:DriverPlan
    },
    
    //运输任务--选择地块
    {
        path:'/Driverlandmap',
        component:Driverlandmap
    },

   
]


