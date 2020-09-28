<template>
  <div class="logonDetail">
    <div class="logtoptext">
      <van-nav-bar title="任务详情" left-text="返回" left-arrow />
    </div>
    <div class="loginCenterAll" style="position:fixed;width:100%">

      <div class="loginmap">
        <img src alt class="loginImg" id="map"/>
      </div>

      <div>

     
      <div style="margin-left:10px">
        <van-steps direction="vertical" :active="form.taskStatus">
          <van-step style="font-size:10px">
            <h3>{{form.loadingPointAddress }}</h3>
            <p>{{formatterDate(form.inCarTime) }}</p>
          </van-step>
		
			<div v-for="(item,index) in haulwayPassInfoDto" :key="index" >
				<van-step>
					<h3>{{item.passName }}<!-- 途径 绿野过磅点 --></h3>
				</van-step>
				<van-step>
					<h3>{{item.passAddress }}<!-- 目的地 绿野收粮点 --></h3>
				</van-step>
			</div>
			
        </van-steps>
      </div>
      <div class="logname">
        <div class="usermsg">
          <van-row style="margin-left:20px;padding-bottom:10px">
                <van-col span="8"><!-- 李三 --> {{form.driverName }}
					<van-tag mark type="warning" size="large">员工</van-tag>
				</van-col>
                <van-col span="8"></van-col>
                <van-col span="8" style="margin-left:-20px" @click="tophone()">
					<van-icon name="phone-o"  />
          <!-- 13511112121 -->
           {{form.driverPhone }}
				</van-col>
            </van-row>
            <van-row style="margin-left:20px;padding-bottom:10px">
                <van-col span="8">车牌号</van-col>
                <van-col span="8"></van-col>
                <van-col span="8" style="color:#666666">
					<!-- 黑A 47261 -->{{form.carCode }}
				</van-col>
            </van-row>
            <van-row style="margin-left:20px;padding-bottom:10px">
                <van-col span="8">载重物</van-col>
                <van-col span="8"></van-col>
                <van-col span="8" style="color:#666666"><!-- 20吨 -->
					{{form.carCapacity }} 吨
				</van-col>
            </van-row>
			<van-row style="margin-left:20px;padding-bottom:10px">
                <van-col span="8">运输作物</van-col>
                <van-col span="8"></van-col>
                <van-col span="8" style="color:#666666"><!-- 玉米 -->
					{{form.cropsName }}
				</van-col>
            </van-row>
			<van-row style="margin-left:20px;padding-bottom:10px">
                <van-col span="8">田间负责人</van-col>
                <van-col span="8"></van-col>
                <van-col span="8" style="color:#666666"><!-- 王明 -->
					{{form.principalName }}
				</van-col>
            </van-row>
            <van-row style="margin-left:20px">
                <van-col span='8'>任务说明</van-col>
                <van-col span='8'></van-col>
                <van-col span='8'></van-col>
            </van-row>
            <div style="width:80%;height:60px;background:#F6F7F6;line-height:60px;margin-left:30px;text-aline:center">
				<!-- 请注意天气变怒啊，下雨时可暂停执行 -->
				{{form.taskExplain }}
            </div>
			</div>
            <div class="logmsg">
                <div style="padding:10px;margin-left:0px">
                    <van-row>
                        <van-col span="8">收粮信息</van-col>
                        <van-col span="8"></van-col>
                        <van-col span="8"></van-col>
                    </van-row>
                </div>
				
                <!-- <div>
                    <van-row>
                        <van-col span="7">张良1号地</van-col>
                        <van-col span="7">2亩</van-col>
                        <van-col span="7">1.2吨</van-col>
                    </van-row>
                </div> -->
                <div>
					<van-row v-for="(item,index) in haulwayTaskDepartRecordInfos" :key="index"><!--  -->
						<van-col span="7">{{item.areaName  }}</van-col>
						<van-col span="7">{{item.areaActualCount  }}</van-col>
						<van-col span="7">{{item.suttleWeight }}</van-col>
					</van-row>
				</div>
				
                <div style="background:#F0EDF1;height:40px;line-height:40px;width:90%;text-align:center;margin-left:18px">
                    <van-row >
                        <van-col span="8">毛重</van-col>
                        <van-col span="8">净重</van-col>
                        <van-col span="6">净重差值</van-col>
                    </van-row>
                </div>
				
				<van-row style="text-align:center" >
					<van-col span="8" style="height:20px;line-height:20px;width:100%;color:#999999;margin-left:18px">
					  <van-col span="8">装车点</van-col>
					  <van-col span="8">{{form.principalName }}</van-col>
					  <van-col span="8" style="width:150px">{{formatterDate(form.inCarTime) }}</van-col>
					</van-col>
				</van-row >
				
				<van-row style="text-align:center" >
					<van-col span="8" style="height:20px;line-height:20px;width:100%;color:#999999;margin-left:18px">
					  <van-col span="8">{{form.grossWeight }}吨</van-col>
					  <van-col span="8">{{form.suttleWeight }}吨</van-col>
					  <van-col span="8" style="width:150px;"></van-col>
					</van-col>
				</van-row >
				
				<div v-for="(item,index) in form.getHaulwayTaskWeightRecordInfoDto" class="showmsg" :key="index" style="background:#F8F6F9;width:90%;border-bottom:1px solid white;margin-left:18px">
				    <!-- <span style="color:#999999;margin-left:10px;">装车点 李三 2020.4.8  13：00</span> --><!-- v-if="item.getHaulwayTaskWeightRecordInfoDto != null " -->
					<van-row  style="text-align:center;color:#999999;" >
						<van-col span="8" >
							{{item.passType == 0 ? '过磅点' : '入仓点' }} 
						</van-col>
            <van-col span="8"> {{item.getHaulwayTaskPassPrincipalInfoDto.length > 0 ? item.getHaulwayTaskPassPrincipalInfoDto[0].principalName : '' }}</van-col>
            <van-col span="8" style="width:150px"> {{ formatterDate(item.weightTime) }}</van-col>
					</van-row>
					<van-row style="text-align:center">  
						<van-col span="8">{{item.roughWeight }}吨</van-col>
						<van-col span="8">{{item.suttleWeight }}吨</van-col>
						<van-col span="6" 
            :class="{redcolor:index > 0 ? 
            form.getHaulwayTaskWeightRecordInfoDto[index].suttleWeight - 
            form.getHaulwayTaskWeightRecordInfoDto[index - 1].suttleWeight : ''<0}">
						  {{ index > 0 ? form.getHaulwayTaskWeightRecordInfoDto[index].suttleWeight - form.getHaulwayTaskWeightRecordInfoDto[index - 1].suttleWeight : ''}} 
						</van-col>
					</van-row>
					
				</div>
				
                <!-- <div style="background:#EEEEEE;height:50px;width:90%;border-bottom:1px solid white;margin-left:18px">
                    <span style="color:#999999;margin-left:10px">过磅点 李三 2020.4.8  13：00</span>
                    <van-row >
                        <van-col span="8" >30吨</van-col>
                        <van-col span="8">20吨</van-col>
                        <van-col span="6" style="color:red">-1</van-col>
                    </van-row>
                </div>
                <div style="background:#EEEEEE;height:50px;width:90%;border-bottom:1px solid white;margin-left:18px">
                    <span style="color:#999999;margin-left:10px">入仓点 李三 2020.4.8  13：00</span>
                    <van-row >
                        <van-col span="8" >30吨</van-col>
                        <van-col span="8">20吨</van-col>
                        <van-col span="6">0</van-col>
                    </van-row>
                </div>
                </div> -->
				
                <div style="width:100%;margin-top:10px">
					<div style="background:#F0EDF1;height:40px;line-height:40px;width:90%;text-align:center;margin-left:13px" >
						<van-row  >
							<van-col span="2" >扣重</van-col>
							<van-col span="10" style="width:100px">单价(元/公斤)</van-col>
							<van-col span="3">总价(元)</van-col>
						</van-row>
					</div>
					
					<div style="background:;width:90%;height:40px;text-align:center;margin-left:20px">
						<van-row v-for="(item,index) in form.getHaulwayTaskWeightRecordInfoDto" :key="index">
							<van-col span="8" >{{item.deductWeight }} 吨</van-col>
							<van-col span="8">{{item.price  }}</van-col>
							<van-col span="6" style="margin-left:25px">{{item.sumMoney }}</van-col>
						</van-row>
					</div>
                </div>
				
        <div style="width:100%">
                    <van-row >
                            <van-col span="8" ></van-col>
                            <van-col span="8"></van-col>
                            <van-col span="6"></van-col>
                        </van-row>
        
                </div>
                <div style="width:100%">
                    <van-row >
                            <van-col span="8" >运输单</van-col>
                            <van-col span="8"></van-col>
                            <van-col span="6"></van-col>
                        </van-row>
        
                </div>
                <div >
                      
            <div style="display:flex" class="imgsdiv">
              <div style="width:75px;">
								<span style="margin-left:35px">装车点</span>

								<!-- <van-uploader preview-size="75px" v-model="fileList1" multiple :max-count="1" /> -->
								<van-col v-for="(item,index) in form.getMdcCompanyHaulwayTaskRecordImagesInfos" span="8" :key="index">
									<van-image v-if="item.type == 1" :src="item.imagesUrl" style="width:100%;height:70px;" ></van-image>
								</van-col>
							</div>
              <div style="width:75px;">
								<span style="margin-left:35px">过磅点</span>
								<!-- <van-uploader preview-size="75px"  v-model="fileList2" multiple :max-count="1" /> -->
								<van-col v-for="(item,index) in photos" span="8" :key="index">
									<van-image v-if="item.type == 2" :src="item.imagesUrl" style="width:100%;height:70px;" ></van-image>
								</van-col>
							</div>
              <div style="width:75px;">
								<span style="margin-left:35px">入仓点</span>
							  	<van-col v-for="(item,index) in photos" span="8" :key="index">
									<van-image v-if="item.type == 3" :src="item.imagesUrl" style="width:100%;height:70px;" ></van-image>
								</van-col>
								<!-- <van-uploader preview-size="75px"  v-model="fileList3" multiple :max-count="1" /> -->
							</div>
             </div>
          </div>
            </div>
			
            <van-share-sheet
                v-model="showShare"
                title="立即分享给好友"
                :options="options"
                @select="onSelect"
                />
            <div style="margin-left:30%">
                <van-button type="default" size="normal" @click="toMap" id="Patrolfields_nav" v-if="Power='Patrolfields_nav'">导航</van-button>
                <!-- <van-button type="default" style="margin-left:10px" @click="showShare = true">分享</van-button> -->
				<van-button type="primary"  v-if="showHide(1) && Power=='Patrolfields_car' " id="Patrolfields_car" style="margin-left:10px" @click="todriver(form,2)" >发车</van-button>
				<van-button type="primary" v-if ="showHide(2) && Power=='Patrolfields_sure'" id="Patrolfields_sure" style="margin-left:10px" @click="driverConfirm(form)" >确认</van-button>
				<van-button type="primary" v-if ="showHide(3) && Power=='Patrolfields_weight' " id="Patrolfields_weight" style="margin-left:10px" @click="todriver(form,3)">过磅</van-button>
				<van-button type="primary" v-if ="showHide(4) && Power=='Patrolfields_ku'" style="margin-left:10px" @click="todriver(form,1)" id="Patrolfields_ku">入仓</van-button>
            </div>
        <!-- 无 我的任务按钮 -->
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import moment from 'moment';
import { Toast } from 'vant';
Vue.use(Toast);

export default {
  name: "DriverLog",
  created(){
    // this.getDriver()
	this.initData();
  },
  data() {
    return {
	  form : {},
	  haulwayPassInfoDto: {},// 途径 - 目的地
	  haulwayTaskDepartRecordInfos: {},// 运输任务发车地块记录表
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
      ],
      fileList1: [],
      fileList2: [],
      fileList3: [],
      results:[],
      photos:[],
      Power:''
    };
  },
  mounted(){
    this.hasBtnPermission();
    this.initMap(); 
  },
  methods: {
     /*地图展示*/
        initMap() {
        this.mapContent = this.$L.map("map",{zoomControl: true,attributionControl: false,}).setView([47.25, 132.03], 8);
        this.$L.tileLayer(
            "http://mt3.google.cn/vt/lyrs=y@167000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil.png",
        ).addTo(this.mapContent);
        },

     hasBtnPermission(permission){
        let getBtnPermisssionArr=JSON.parse(localStorage.getItem('btnPermission'));
        this.Power=getBtnPermisssionArr.toString().replace(/,/g,'');
        console.log(this.Power)
        console.log(permission)
      
    },

    tophone(){
      // console.log(this.form.driverphone)
        window.location.href = 'tel://'+ this.form.driverPhone
    },
	todriver(row,status) {
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
		row.pageFrom = 0;
		console.log(row);
		localStorage.setItem("form",JSON.stringify(row));
		this.$router.push({path : '/DriverPlan' });
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
					
					this.initData();
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
	},//分享
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
    toMap() {
	  localStorage.setItem("getHaulwayTaskRodeoInfoDtos",JSON.stringify(this.form.getHaulwayTaskRodeoInfoDtos));
	  localStorage.setItem("mapType","1");
      this.$router.push('/Map');
    },
    toDriverList() {
      this.$router.push('/DriverList');
    },
	initData() {// 初始化数据
		let id = this.$route.query.id;
		if (id == undefined || id == "") {
			Toast('加载数据失败');
			return;
		}
		// this.isLoading = false;
		this.$api.taskApi.queryHaulWayTaskInfo(id).then(resp => {// 通过id查询详情
			let data = resp.data.result;
			console.log(data);
			
			/* 计算总价 */
			let recordInfo = data.getHaulwayTaskWeightRecordInfoDto;
			
			for (let i = 0;i < recordInfo.length;i++ ) { // 
				recordInfo[i].sumMoney = Number(recordInfo[i].deductWeight * 1000 * recordInfo[i].price).toFixed(2);
			}
			
			/* 回写图片 */
			this.haulwayPassInfoDto = data.getHaulwayPassInfoDto;
			console.log(this.haulwayPassInfoDto);
			for(let i in this.haulwayPassInfoDto ) {
				for(let a in this.haulwayPassInfoDto[i].getMdcCompanyHaulwayTaskRecordImagesInfo){
				this.photos.push(this.haulwayPassInfoDto[i].getMdcCompanyHaulwayTaskRecordImagesInfo[a])

				}
			}
			this.haulwayTaskDepartRecordInfos = data.haulwayTaskDepartRecordInfos;
			this.form = data;
			// this.isLoading = false;
		}).catch(err => {
			// this.isLoading = false;
		});
	},
	showHide(type) {
		let flag = false;
		if (type == 1) {// 发车
			if (this.form.taskStatus == 0) {
				flag = true;
			}
		} else if (type == 2) {// 确认
			if (this.form.taskStatus == 0 || this.form.taskStatus == 1 || this.form.taskStatus == 2 ) {
				flag = true;
			}
		} else if (type == 3) {// 过磅
			if (this.form.taskStatus == 1) {
				flag = true;
			}
		} else if (type == 4) {// 入仓
			if (this.form.taskStatus == 2) {
				flag = true;
			}
		} 
		return flag;
	}
    // getDriver(){
    //   this.isLoading = true;
    //     this.$api.driverLog.getDriver()+{id:1}.then(resp => {
    //         let resolve=resp
    //         this.results=resolve
    //         console.log(this.results)

    //         this.isLoading = false;
          
    //     }).catch(err => {
    //         this.isLoading = false;
    //     })
    // }
  }
};
</script>

<style >
.logonDetail {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  background: white;
}
.logonDetail::-webkit-scrollbar {
        display: none;
}
.loginmap {
  width: 100%;
  height: 400px;
  background: #888888;
}
#map{
  width:100%;
  height:8rem;
}
.showmsg .logname .van-row{
  font-size: 26px;
  
}
.logmsg div{
    margin-left: 10px;
}
.van-nav-bar{
  width: 750px;
  height: 91px;
  background: #8888;
}
.van-nav-bar__left .van-nav-bar__arrow{
  display: block;
  width: 15px;
  height: 26px;

}
.van-nav-bar__title{
  height: 91px;
  line-height: 91px;
  font-size: 36px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #333333;

}
.imgsdiv img{
  width: 150px;
  height: 150px;
  padding: 10px;
}
.usermsg .van-col{
  width:33.33333333%;
}
.redcolor{
  color:red
}
.van-step__title{
  margin-top: -20px;
  margin-left: 20px;
}
.van-col{
  padding: 3px;
}
</style>

