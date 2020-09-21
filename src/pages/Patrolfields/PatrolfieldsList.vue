<template>
  <div style="  overflow-y: scroll;">
    <div class="PatrolfieldsHeaderTasks">
        <div class="tits">
            <span >  > </span>
            <span @click="goback">返回</span>
            <span >我的巡田任务</span>
       </div>
    </div>
    <div style="width:100%;height:450px " v-if="!form">
		<van-loading type="spinner" size='25px' style="margin-top: 49%;margin-left: 45%;"/>
	</div>
    <!-- <div class=" contWrapper"></div> -->
    <div class="contentTasks" v-else>

	
	<div class="TaskLists" v-for="(item,index) in form.list" span="8" :key="index" @click="redirectDetail(0,item.taskStatus,item.id)">
          <div class="TaskList">
              <div class="Taskwait">
				<span v-if="item.taskStatus == 0" class="gray"></span>
				<span v-if="item.taskStatus == 1" class="green"></span>
				<span v-if="item.taskStatus == 2" class="gray"></span>
				
				<span v-if="item.taskStatus == 0">待完成</span>
				<span v-if="item.taskStatus == 2">待复巡</span>
				<span v-if="item.taskStatus == 1">已完成</span>
                <span class="right"></span>
              </div>

               <div class="TaskRight">
                  <div>
                    <span style="margin-left:-10px;width:200px">{{item.tourFieldUserName }}</span>
                    <div class="time" style="margin-left:0px" v-if="item.taskTimeOut == 1">
                        <span>超时</span>
                    </div>
                    <!-- 后加的 -->
                     <!-- <div class="time" v-else>
                        <span style=“display:none>超时</span>
                    </div> -->
					
					<span class="date" style="font-size:10px;margin-left:50px" v-if="item.taskStatus == 1" >  {{item.tourFieldEndTime }}</span><!-- 完成日期取计划结束日期（app端说） -->
                    <span class="date" style="font-size:10px;" v-else>{{item.tourFieldStartTime }}  {{item.tourFieldEndTime }}</span>
                  </div>

                  <span class="line"></span>
     
                  <div class="messageTask">
                     <!-- <div style="margin-top:15px;background:red"  class="bgGreen"  > -->
                        <span class="dataTask">{{item.growthStageName }}</span>
                        <!-- <span class="dataTask">123456789</span> -->
                     <!-- </div> -->
                     <div class="countTask" style="margin-top:-20px;height:20px" v-if="item.rodeoCount">
                         <span class="countMessage" v-if="item.taskStatus == 1" >{{item.rodeoCount }}</span>
                         <span class="mu" v-if="item.taskStatus == 1">亩</span>   

                     </div>
                     
                    <div v-if="item.taskStatus">
						<div class="FindPhoto"  v-if="item.taskStatus == 1">
                             <!-- 数据里面 没有数据 隐藏 -->
							<span v-for="(item,index) in item.getTourFieldTaskRecordImages" :key="index">
								<img v-if="index < 3" :src="item.imagesUrl" width="70" height="70">
								<!-- <van-image :src="item.imagesUrl" style="width:100%;height:150px;" ></van-image> -->
							</span>
                        </div>
                        <div class="count" style="width:200px;margin-left:120px;margin-top:-58px">共{{item.areaActualCount }}块</div>
                    </div>
                    <div  v-else class="count" style="width:200px;margin-left:120px;margin-top:-20px">共{{item.areaActualCount }}块</div>
                  </div>
				 
				 
                 <div class="btnTask" >
                    <span v-if="item.taskStatus != 1 && Power=='MyPatorlMissiondh' " @click="redirectNav(item)" id="MyPatorlMissiondh" >导航</span>
                    <span v-if="item.taskStatus == 0 && Power=='MyPatorlMissionys' " @click="redirectDetail(1,item.taskStatus,item.id)" id="MyPatorlMissionys" style="background:#0DC288">确认完成</span>
					<span v-if="item.taskStatus == 2 && Power=='MyPatorlMissionys' " @click="redirectDetail(1,item.taskStatus,item.id)" id="MyPatorlMissionrePatrol">再次巡田</span>
                    <!-- <span v-if="item.taskStatus == 1 "></span> -->
                 </div>
               </div>
          </div>
       </div>
		<!-- <div class="TaskLists" v-if="form.list.length > 0">
			暂无任务
		</div> -->
    </div>
 </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);

export default {
  name : 'PatrolfieldsList',
  data() {
    return {
	
		form : {
			
			
			
		},
        imageList: [],
        Power:''
    };
  },
  mounted() {
    this.initData();
    this.hasBtnPermission()
  },
  methods: {
      hasBtnPermission(permission){
        let getBtnPermisssionArr=JSON.parse(localStorage.getItem('btnPermission'));
        this.Power=getBtnPermisssionArr.toString().replace(/,/g,'');
        console.log(this.Power)
        console.log(permission)
        console.log(getBtnPermisssionArr) //["a", "b", "c", "d", "e", "f"]

        console.log(getBtnPermisssionArr.indexOf(permission)>-1)  //true
        return getBtnPermisssionArr.indexOf(permission)>-1;
    },

      redirectNav(row){
		 let tourFieldTaskRodeo = row.getTourFieldTaskRodeoDto;
		 localStorage.setItem("tourFieldTaskRodeo",JSON.stringify(tourFieldTaskRodeo));
		 localStorage.setItem("mapType","0");
         this.$router.push('/Map');
      },

      goback(){
          this.$router.push('/Patrolfields')
      },
	initData() {
		
		let params = {}; // {pageNum : 1, pageSize : 10};
		let data = {};
		// 初始化数据
		this.$api.taskApi.findTourFieldTask(params).then(res => {
			if (res.data.code == 200) {
				data = res.data.result.list;
				for (let i = 0; i < data.length;i++) {
					let tourFieldTaskRodeo = data[i].getTourFieldTaskRodeoDto;
					data[i].rodeoCount = tourFieldTaskRodeo.length; // 地块数
					let areaActualCount = 0;
					for (let i = 0; i < tourFieldTaskRodeo.length; i++) {
						areaActualCount += tourFieldTaskRodeo[i].areaActualCount;// 地块面积
					}
					data[i].areaActualCount = areaActualCount;
					data[i].imageList = data[i].getTourFieldTaskRecordImagesDto;
				}
				this.form = res.data.result;
				this.form.list = data;
			}
            console.log(this.form.list);
		}).catch(err => {
			Toast.error('发生异常');
		});
	},
	redirectDetail(type,status,id) {// 点击按钮调转到明细
		if ((type == 0 && status == 1) || (type == 1)) {
			this.$router.push({path:"/Patrolfields",query:{id : id }});
		}
	}
  }
};
</script>

<style >
.PatrolfieldsHeaderTasks{
    width:750px;
    height:92px;

}

.tits>span:nth-child(1){
    width:15px;
    height:26px;
    line-height: 26px;
    margin-left: 31px;
}
.tits>span:nth-child(2){
    width:60px;
    height:30px;
    font-size:32px;
    font-family:PingFang;
    font-weight:bold;
    color:rgba(51,51,51,1);
    line-height:92px;
    margin-left: 31px;
}
.tits>span:nth-child(3){
    width:141px;
    height:34px;
    font-size:36px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
    margin-left: 168px;
}

.contentTasks{
    width:750px;
    height:2062px;
    background:rgba(246,247,246,1);
}
.contentTasks .TaskHead{
    width:749px;
    height:273px;
    /* background:rgba(255,255,255,1); */
    background: #dddd;
}
.contentTasks .TaskLists{
    padding: 24px 29px 24px 31px;
    box-sizing: border-box;
    background: #F5F7F5;
}
.contentTasks .TaskLists .TaskList{
    width:690px;
    height:357px;
    background:rgba(255,255,255,1);
}
.contentTasks .TaskLists .TaskList {
     display: flex;
    width:690px;
    height:395px;
    background:rgb(255,255,255,1);
}

.contentTasks .TaskLists .TaskList .Taskwait{
    display: flex;
} 
.contentTasks .TaskLists .TaskList .Taskwait .left{
    width:5px;
    height:395px;
    background:#DECCB6;
}


.gray {
  width: 5px;
  height: 395px;
  background: lightgray;
}

.orange {
  background: #decbb5;
  width: 5px;
  height: 395px;
}

.green {
  width: 5px;
  height: 395px;
  background: #0EC288;
}




.contentTasks .TaskLists .TaskList .Taskwait .right{
    display: block;
    width:2px;
    height:388px;
    border:2px solid #C6C6C6;
    padding-top: 4px;
    padding-bottom: 3px;
    box-sizing: border-box;
}
.contentTasks .TaskLists .TaskList .Taskwait>span:nth-child(2){
    display: block;
    width:80px;
    height:166px;
    font-size:28px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(52,52,52,1);
    line-height:70px;
    writing-mode:vertical-lr;
    text-align: center;
    margin:114px 0 115px 0; 
    }

.contentTasks .TaskLists .TaskList .TaskRight{
    display: flex;
    flex:1;
    flex-direction: column;
    padding: 32px;
    box-sizing: border-box;
    }
.contentTasks .TaskLists .TaskList .TaskRight>div:nth-child(1)>span:nth-child(1){
    width:72px;
    height:34px;
    font-size:36px;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(52,52,52,1);
    line-height:84px;
    margin-right: 80px;
    
}
.contentTasks .TaskLists .TaskList .TaskRight .time{
    display: inline-block;
    width:70px;
    height:30px;
    line-height: 30px;
    background:#C20E0E;
    border-radius:15px;
    padding: 4px 11px;
    box-sizing: border-box;
    color:rgba(255,212,198,1);
    margin-left: 138px;
    font-size: 24px;
}
.contentTasks .TaskLists .TaskList .TaskRight>div:nth-child(1) .date{
    width:246px;
    height:22px;
    font-size:28px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(102,102,102,1);
    background: white;
    line-height:84px;
    padding: 6px 0 6px 19px;
    /* box-sizing: border-box; */
  

}

.contentTasks .TaskLists .TaskList .TaskRight .line{
    width:578px;
    height:1px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(240,240,240,1); 
  
}
.contentTasks .TaskLists .TaskList .TaskRight .messageTask{
    width:84px;
    height:30px;
    text-align: center;
    background:#7AC0AA;
    border-radius:15px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:30px;
    padding: 4px 10px 4px 10px;
    box-sizing: border-box;
    margin-top: 20px;
}
.messageTask .dataTask{
    display: inline-block;
    width:69px;
    height: 30px;
}

.contentTasks .TaskLists .TaskList .TaskRight .messageTask .countTask{
    font-size: 34px;
    color: black;
    display: flex;

}
.TaskRight .messageTask .countTask .countMessage{
    margin-left: 400px;
    font-size:55px;
    font-family:PingFang SC;
    font-weight:bold;
    font-style:italic;
    color:rgba(102,102,102,1);
    /* line-height:84px; */
} 
.TaskRight .messageTask .countTask .mu{
    width:26px;
    height:26px;
    font-size:28px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(102,102,102,1);
    /* line-height:84px; */
    margin-left: 11px;
}

.TaskRight .messageTask .count{
    color: black;
    width:80px;
    height:23px;
    font-size:24px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:84px;
    margin-left: 400px;
    margin-top: 19px;
}
.TaskRight .btnTask{
    display: flex;
    height:20px;
}
.TaskRight .btnTask>span{
    display: block; 
    font-size:24px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(52,52,52,1);
    line-height:55px;
    text-align: center;
    margin: 158px 15px 40px 240px;
}
.TaskRight .btnTask span:nth-child(1){
    width:110px;
    height:55px;
    background:rgba(240,240,240,1);
}
.TaskRight .btnTask span:nth-child(2){
    width:155px;
    height:55px;
    background:rgba(240,240,240,1);
    margin-left: 15px;  
}
.contentTasks .TaskLists:nth-child(3) .TaskRight .btnTask{
   margin-left: -170px;
}

.contentTasks .TaskLists:nth-child(3) .TaskRight .btnTask span:nth-child(3){
    width:155px;
    height:55px;
    background:rgba(13,194,136,1);
    margin-left: 0;
}
.FindPhoto {
    display: flex;
    width:400px;
    height: 120px;
}
.FindPhoto img{
   display: inline-block;
   width:120px;
   height: 120px;
   background: darkcyan;
   border: 0;
   margin-right: 20px;
}
</style>
