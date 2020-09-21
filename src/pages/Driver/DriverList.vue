<template>
  <div>
    <div class="headerTasks">
      <div class="tit">
        <span ><</span>
        <span @click="backtoLog">返回</span>
        <span>我的运输任务</span>
      </div>
    </div>
	<!-- 加载判断 -->
	<div style="width:100%;height:450px ;" v-if="!form.list">
		<van-loading type="spinner" size='25px' style="margin-top: 49%;margin-left: 45%;"/>
	</div>
				
    <div class="contentTasks" v-else>
      <div class="TaskLists" v-for="(item,index) in form.list" :key="index" >
        <div class="TaskList">
          <div class="Taskwait" @click="toDetail(item)">
            <!-- 颜色-->
            <span v-if="item.taskStatus == 0" class="gray"></span>
            <span v-if="item.taskStatus == 1" class="gray"></span>
            <span v-if="item.taskStatus == 2" class="orange"></span>
            <span v-if="item.taskStatus == 3" class="blue"></span>

            <!-- 状态-->
            <span v-if="item.taskStatus == 0">待装车</span>
            <span v-if="item.taskStatus == 1">待过磅</span>
            <span v-if="item.taskStatus == 2">待入仓</span>
            <span v-if="item.taskStatus == 3">已完成</span>
            <span class="right"></span>
          </div>
			
          <div class="TaskRight">
            <div @click="toDetail(item)">
              <span>
                <!-- 李三 -->
                {{item.driverName }}
              </span>
              <div class="time" v-if="item.taskTimeOut == 1">
                <span>超时</span>
              </div>
              <span class="date" style="background:none">
                <!-- 2020.4.6 13:00 -->
                {{item.accomplishDateTime }}
              </span>
              <span class="planTime" v-if="item.taskStatus == 0">计划时间</span>
              <span class="planTime" v-if="item.taskStatus == 1">发车时间</span>
              <span class="planTime" v-if="item.taskStatus == 2">过磅时间</span>
              <span class="planTime" v-if="item.taskStatus == 3">入仓时间</span>
            </div>

            <span class="line"></span>
                  <span class="line"></span>
     
                 <div class="DrivermessageTask" @click="toDetail(item)">
					 <span v-if="item.taskStatus == 3">计划时间：{{item.accomplishDateTime }} </span>
					 <span v-else>{{item.carCode }}</span>
					 <div class="DriverWeight">
						 <span>毛重: {{item.grossWeight == 0 ? '--' : item.grossWeight }} </span>
						 <span style="margin-left:50px">净重: {{item.suttleWeight == 0 ? '--' : item.suttleWeight}} <!-- 0/20 -->吨</span>
					 </div>
					<span>
						装车点：<!-- 永福村一号 --> {{item.loadingPointAddress }}
					</span>
                 </div>
				 
				
				 <!-- 司机 -->
                 <div class="DriverBtns" style="display:flex" v-if="showHide(2,item)"> <!-- value == 0 && -->
				  <!-- <span class="DriverBtn" @click="toDetail(item)">详情</span> -->

                     <span class="DriverBtn" @click="toMap(item)" id="Patrolfields_nav" v-if="Power=='Patrolfields_nav'">导航</span>
					 <span class="DriverBtn" @click="driverConfirm(item)" id="Patrolfields_sure" v-if="Power=='Patrolfields_sure'" style="background:#0DC187">确认</span>
                 </div>
                    <!-- 田间负责人 -->
                 <div class="DriverBtns" style="display:flex" v-if="showHide(1,item)">  <!-- value == 2 && -->
				  <!-- <span class="DriverBtn" @click="toDetail(item)">详情</span> -->

					 <span class="DriverBtn" @click="tophone(item)" id="PatrolfieldsTask_call" v-if="Power='PatrolfieldsTask_call'">联系司机</span>
					 <span class="DriverBtn" @click="todriver(item,2)" id="PatrolfieldsTask_car" v-if="Power=='PatrolfieldsTask_car'" style="background:#0DC187">发车</span>
                 </div>
                    <!-- 途径点负责人 -->
                 <div class="DriverBtns" style="display:flex" v-if="showHide(3,item)">  <!-- value == 3 && -->
				  <!-- <span class="DriverBtn" @click="toDetail(item)">详情</span> -->

					 <span class="DriverBtn" @click="tophone(item)">联系司机</span>
					 <span class="DriverBtn" @click="todriver(item,3)" id="Patrolfields_weight" v-if="Power='Patrolfields_weight'" style="background:#0DC187">过磅</span>
                 </div>
                    <!-- 目的地负责人 -->
                 <div class="DriverBtns" style="display:flex" v-if="showHide(4,item)">  <!-- value == 1 && -->
				  <!-- <span class="DriverBtn" @click="toDetail(item)">详情</span> -->

					 <span class="DriverBtn" @click="tophone(item)">联系司机</span>
					 <span class="DriverBtn" @click="todriver(item,1)" id="Patrolfields_ku" v-if="Power=='Patrolfields_ku'" style="background:#0DC187">入仓</span>
                 </div>
				 
				 <!-- 已完成 -->
				 <div class="DriverBtns" style="display:flex" v-if="showHide(5,item)"> <!-- value == 0 && -->
					<!-- <span class="DriverBtn" @click="toDetail(item)">详情</span> -->
				 </div>
               </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import Vue from 'vue';
import { Tab, Tabs,Toast } from 'vant';
import moment from 'moment'

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Toast);

export default {
  name: 'DriverList',
	created(){
		// this.getDriver()
		this.initData();
	},
    data() {
        return {
			form : {},
      value:2,
      Power:''
			
        }
    },
    mounted(){
      this.hasBtnPermission()
    },

    methods:{
     hasBtnPermission(permission){
        let getBtnPermisssionArr=JSON.parse(localStorage.getItem('btnPermission'));
        this.Power=getBtnPermisssionArr.toString().replace(/,/g,'');
        console.log(this.Power)
        console.log(permission)
        console.log(getBtnPermisssionArr) //["a", "b", "c", "d", "e", "f"]

        console.log(getBtnPermisssionArr.indexOf(permission)>-1)  //true
        return getBtnPermisssionArr.indexOf(permission)>-1;
    },
      

      backtoLog(){
        this.$router.push("/DriverLog")
      },

      tophone(item){
        console.log(item)
        window.location.href = 'tel://'+ item.driverPhone
      },
        todriver(row,status) {
         this.$dialog.confirm({
  title: '即将跳转页面',
  message: '',
})
  .then(() => {
    row.billType = status;
        	if (status == 3) {
        		row.type = 0;// 2 过磅 
        		row.taskStatus = 2;// 待入仓
        	} else if (status == 1) {
        		row.type = 1; // 入仓
        		row.taskStatus = 3;// 已完成
        	}
        	row.taskId = row.id;
        	row.haulwayTaskId = row.id;
        	row.dirvierId = row.driverId;// 司机id
        	row.dirvierName = row.driverName;// 司机名称
        	row.pageFrom = 1;// 通过类型确定页面从哪里跳转过来
        	console.log(row);
        	localStorage.setItem("form",JSON.stringify(row));
        	this.$router.push({path : '/DriverPlan' });
  })
  .catch(() => {
    // on cancel
  });
        	
        },
        toMap(row){
			 let getHaulwayTaskRodeoInfoDtos = row.getHaulwayTaskRodeoInfoDtos;
			 localStorage.setItem("getHaulwayTaskRodeoInfoDtos",JSON.stringify(getHaulwayTaskRodeoInfoDtos));
			 localStorage.setItem("mapType","1");
             this.$router.push('/Map');
        },
        toDriverPlan(){// 
            this.$dialog.confirm({
                title: "", //加上标题
                message: "确认发车信息", //改变弹出框的内容
                showCancelButton: true //展示取水按钮
            })
            .then(() => {
				
             })
			.catch(() => { //点击取消按钮后的调用
				
			})
        },
		driverConfirm(row) {// 司机确认发车日期
			let taskStatus = row.taskStatus;
			let title = "";
			if (taskStatus == 0) {
				title = "确认发车信息？";
			} else if (taskStatus == 1) {
				title = "确认过磅信息？";
			} else if (taskStatus == 2) {
				title = "确认入仓信息？";
			}
			row.haulwayTaskId = row.id;
			row.taskId = row.id;
			row.taskTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
			this.$dialog.confirm({
			    message: title,
			    showCancelButton: true 
			})
			.then(() => {
				this.$api.taskApi.updateDriverStatus(row).then(resp => {
					if (resp.data.code == 200) {
						Toast("操作成功！");
					}
					// this.isLoading = false;
				}).catch(err => {
					console.log(err);
					// this.isLoading = false;
				});
			})
			.catch(() => {
				// console.log(err);
			})
		},
		initData() {
			// this.isLoading = false;
			this.$api.taskApi.queryHaulWayTaskTotal({}).then(resp => {// 查询任务列表
				if (resp.data.code == 200) {
					this.form = resp.data.result;
				}
				console.log(this.form);
				// this.isLoading = false;
			}).catch(err => {
				console.log(err);
				// this.isLoading = false;
			});
		},
		toDetail(row) {
			this.$router.push({path : '/DriverLog',query : {id : row.id}});
		},
		showHide(type,row) {
			let flag = false;
			if (type == 1) {// 发车
				if (row.taskStatus == 0) {
					flag = true;
				}
			} else if (type == 2) {// 确认
				if (row.taskStatus == 1 || row.taskStatus == 2) {// row.taskStatus == 0 || 
					flag = true;
				}
			} else if (type == 3) {// 过磅
				if (row.taskStatus == 1) {
					flag = true;
				}
			} else if (type == 4) {// 入仓
				if (row.taskStatus == 2) {
					flag = true;
				}
			} else if (type == 5 && row.taskStatus == 3) {// 详情
				flag = true;
			} 
			return flag;
		}
    }
    
}

</script>

<style >
.TaskLists {
  background: #F5F7F5 !important;
}
.headerTasks {
  width: 100%;
  height: 92px;
}
.headerTasks .tit {
  display: inline-block;
}
.headerTasks .tit > span:nth-child(1) {
  width: 15px;
  height: 26px;
  line-height: 26px;
  margin-left: 31px;
}
.headerTasks .tit > span:nth-child(2) {
  width: 60px;
  height: 30px;
  font-size: 32px;
  font-family: PingFang;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 92px;
  margin-left: 31px;
}
.headerTasks .tit > span:nth-child(3) {
  width: 141px;
  height: 34px;
  font-size: 36px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-left: 160px;
}
.contentTasks {
  width: 750px;
  height: 2062px;
  background: rgba(246, 247, 246, 1);
}
.contentTasks .TaskHead {
  width: 749px;
  height: 273px;
  /* background:rgba(255,255,255,1); */
}

.contentTasks .TaskLists {
  padding: 24px 29px 24px 31px;
  box-sizing: border-box;
}
.contentTasks .TaskLists .TaskList {
  width: 690px;
  height: 357px;
  background: rgba(255, 255, 255, 1);
}
.contentTasks .TaskLists .TaskList {
  display: flex;
  width: 690px;
  height: 395px;
  background: rgb(255, 255, 255, 1);
}

.contentTasks .TaskLists .TaskList .Taskwait {
  display: flex;
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

.blue {
  width: 5px;
  height: 395px;
  background: #0EC288;
}
.contentTasks .TaskLists .TaskList .Taskwait .left {
  width: 5px;
  height: 395px;
  background: #0dc288;
}
.contentTasks .TaskLists .TaskList .Taskwait .right {
  display: block;
  width: 2px;
  height: 388px;
  border: 2px dotted #c6c6c6;
  padding-top: 4px;
  padding-bottom: 3px;
  box-sizing: border-box;
}
.contentTasks .TaskLists .TaskList .Taskwait > span:nth-child(2) {
  display: block;
  width: 80px;
  height: 166px;
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(52, 52, 52, 1);
  line-height: 70px;
  writing-mode: vertical-lr;
  text-align: center;
  margin: 114px 0 115px 0;
}

.contentTasks .TaskLists .TaskList .TaskRight {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
}
.contentTasks
  .TaskLists
  .TaskList
  .TaskRight
  > div:nth-child(1)
  > span:nth-child(1) {
  width: 72px;
  height: 34px;
  font-size: 36px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(52, 52, 52, 1);
  line-height: 84px;
}
.contentTasks .TaskLists .TaskList .TaskRight .time {
  display: inline-block;
  width: 70px;
  height: 30px;
  line-height: 30px;
  background: #c20e0e;
  border-radius: 15px;
  padding: 4px 11px;
  box-sizing: border-box;
  color: rgba(255, 212, 198, 1);
  margin-left: 180px;
  font-size: 24px;
}
.contentTasks .TaskLists .TaskList .TaskRight > div:nth-child(1) .date {
  width: 246px;
  height: 22px;
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 84px;
  padding: 6px 0 6px 36px;
  box-sizing: border-box;
}

.contentTasks .TaskLists .TaskList .TaskRight > div:nth-child(1) .planTime {
  margin-left: 430px;
  font-size: 22px;
  font-family: PingFang SC;
  font-weight: 400;
  font-style: italic;
  color: rgba(102, 102, 102, 1);
  display: block;
  padding-bottom: 10px;
  box-sizing: border-box;
}
.contentTasks .TaskLists .TaskList .TaskRight .line {
  width: 578px;
  height: 1px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(240, 240, 240, 1);
}
.contentTasks .TaskLists .TaskList .TaskRight .DrivermessageTask {
  /* background: #8888; */
  /* padding-top: 20px; */
  margin-top: 10px;
  box-sizing: border-box;
}
.contentTasks .TaskLists .TaskList .TaskRight .DrivermessageTask span {
  font-size: 28px;
  padding: 1px;
  font-family: PingFang SC;
  font-weight: 400;
}
.contentTasks
  .TaskLists
  .TaskList
  .TaskRight
  .DrivermessageTask
  > .DriverWeight {
  display: flex;
  /* margin: -106px 0; */
  /* height: 30px; */
}
.DriverBtns {
  font-size: 24px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #333333;
  margin-top: 20px;
  margin-left: 270px;
}
.contentTasks .TaskLists .TaskList .TaskRight .DriverBtns span {
  text-align: center;
  line-height: 55px;
}
.contentTasks .TaskLists .TaskList .TaskRight .DriverBtns > span {
  width: 100px;
  height: 60px;
  background: #f0f0f0;
  margin-left: 8px;
  border-radius: 8px;
}
.DriverBtn {
  padding-left: 10px;
  padding-right: 10px ;
}
/* .contentTasks .TaskLists:nth-child(3) .TaskList .TaskRight>div:nth-child(1) .date {
    margin-left: 0px;
} */
</style>

