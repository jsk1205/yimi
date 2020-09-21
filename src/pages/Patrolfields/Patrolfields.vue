<template>
  <div class="PatrofieldsDetail">

    <div class="logtoptext">
      <!--  left-text="返回" -->
      <van-nav-bar title="巡田记录" left-text="返回"  left-arrow click-right="this.$router.go(-1)" />
    </div>

    <div class="loginCenterAll"  style="position:fixed" >
      <!-- -->

      <div class="loginmap" id="map" style="height:200px;position:relative;" >
        <!--  -->
        <!-- <img src alt class="loginImg" /> -->
      </div>

<!-- style="position: fixed; width:100%;height:80%" -->
<!--滚动条很横向禁止  -->
      <div  style="overflow-x:hidden;position:relative;">

        <div>
          <span style="font-size:15px;">
            <van-icon name="location-o"  color="#0DC288" size='13px' />当前定位：
          </span>
          <van-button round  type="primary"  plain style="margin-left:55%;font-size:12px" >重新定位</van-button>
          <p style="font-size:15px">黑龙江省富锦市砚山镇永福村1号住宅基地区域小村庄1号</p>
        </div>

        <div class="logname" style="font-size:15px">
              <div class="FinshLists">
                <van-row style="margin-left:20px">
                  <van-col span="8" style="font-size:18px">{{form.cropsName }}</van-col>
                  <van-col span="8"></van-col>
                </van-row>
                <van-row style="margin-left:20px;margin-top:10px;" v-for="(item,index) in form.getTourFieldTaskRecordFieldDto" :key="index">
                  <van-col span="8" style="width:200px">{{item.growthStageFieldName }}</van-col>
                  <van-col span="16" style="width:140px">
                  <!-- v-model="radio1"  -->
                      <van-radio-group v-if="form.taskStatus != 1" name="isElect" v-model="item.isElectStr" direction="horizontal">
                          <van-radio name="1" shape="square" icon-size="18px">是</van-radio>
                          <van-radio name="0" shape="square" icon-size="18px" >否</van-radio>
                          <!-- 此处去掉了style="margin-left:15%" -->
                      </van-radio-group>
                      
                      <div v-else style="width:100px;display:flex" class="control">
                        <van-icon name="success" v-if="item.isElect == 1"/>
                        <van-icon name="cross" v-else/>
                      </div>
                  </van-col>
                </van-row>
            
              </div>
            <div class="explain">
              <!-- 添加了定位 我的任务 -->
                <van-button type="primary" @click="toFindtask" class="PatrolfieldsTask" id="MyPatorlMission_task" v-if="Power=='MyPatorlMission_task'">我的任务</van-button>
                <van-row style="margin-left:20px" >
                  <van-col span='8' style="font-size:18px;font-family:PingFang SC;width:117px;height:28px">巡田说明</van-col>
                  <!-- <van-col span='8'></van-col>
                  <van-col span='8'></van-col> -->
                </van-row>
                <div style="width:80%;background:#F6F7F6;margin-left:30px;text-aline:center">
                      <van-field
                        v-model="form.taskExplain"
                        rows="3"
                        autosize
                        type="textarea"
                        maxlength="200"
                        placeholder="请输入留言"
                        show-word-limit
                        style="width:100%;height:100px;border:1px solid rgba(14,194,136,1)"
                      />
                </div>
            </div>
              
            <div class="FindAll ">
              <!-- 我是巡田照片 进行了样式调整-->
                <div style="background:#F6F7F6;" class="FindListPhoto">
                    <span style="margin-left:20px">巡田照片</span>

                    <!-- 增加了一个div  让其一行排列-->
                      <!-- <div style="display:flex">
                        <div v-for="(item,index) in form.getTourFieldTaskRecordImagesDto" span="8" :key="index"  >
                          <van-image :src="item.imagesUrl" style="width:120px;height:120px; "  ></van-image> -->
                        <!-- 
                          对图片进行了 位置调整
                          -->
                        <!-- </div>
                      </div> -->


                      <van-uploader style="margin:10px;width:350px;" preview-size="75px" :accept="'image/*'" v-model="imageList" multiple :max-count="2" :after-read="onRead" />
                      <!-- <van-uploader v-model="imageList" multiple :max-count="2" style="margin:10px;width:350px;"  :accept="'image/*'" /> -->
                    <!-- <van-uploader v-model="fileList" multiple />    -->
                </div>

                <!-- 我是巡田任务记录 -->
                <div class="FindTsk">
                    <span>任务记录</span>
                    <table border="1">
                        <tr>
                            <th>时间</th>
                            <th>说明</th>
                        </tr>
                        <tr v-for="(item,index) in form.getTourFieldTaskRecordDto" :key="index">
                          <td>{{item.accomplishDateTime}}</td>
                          <td>{{item.tourFieldExplainStr}}</td>
                        </tr>
                    </table>
                </div>
                <!-- 我是巡田底部按钮 -->
                <div  class="PatroBTN">
                  <van-button type="default" size="normal" @click="PatrolfieldsNav" class="navs" id="MyPatorlMission_nav" v-if="Power=='MyPatorlMission_nav'">导航</van-button>
                  <!-- <van-button type="default" style="margin-left:10px" @click="showShare = true">分享</van-button> -->
                  <van-button type="primary"  id="MyPatorlMission_notpa" v-if="showOptionBtn() && Power=='MyPatorlMission_notpa'"  @click="agreeOrDisagree(2)" plain  class="notPass">不通过</van-button>
                  <van-button type="primary"  id="MyPatorlMission_pa"    v-if="showOptionBtn() && Power=='MyPatorlMission_notpa'"  @click="agreeOrDisagree(1)" class="Pass" >通过</van-button>
           
                </div>
            </div>
        </div>

      </div>
            <!-- <van-share-sheet
                v-model="showShare"
                title="立即分享给好友"
                :options="options"
                @select="onSelect"
                /> -->
            
                
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';
// import bScroll from 'better-scroll';
Vue.use(Toast);
export default {
  name: "Patrolfields",
  data() {
    return {
    tourFieldTaskRodeo: [],
      Power:'',
      mapContent:'',
      fileList: [
        { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        { url: 'https://cloud-image', isImage: true },
      ],
      form : {
			/* taskExplain: "任务说明",
				getTourFieldTaskRecordFieldDto: [
				{"isElect": "1", growthStageFieldName : "测试"}
			],
			getTourFieldTaskRecordDto: [
				{accomplishDateTime:"2020-08-05 02:34:07",tourFieldExplain:"说明"}
			] */
		},
      showShare: false,
      message:'',
      // options: [
      //   { name: '微信', icon: 'wechat' },
      //   { name: '微博', icon: 'weibo' },
      //   { name: '复制链接', icon: 'link' },
      //   { name: '分享海报', icon: 'poster' },
      //   { name: '二维码', icon: 'qrcode' },
      // ],
      imageList: [
        // { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
      ]
      // fileList1: [],
      // fileList2: [],
      // fileList3: [],
      // fileList4: [],
      // fileList5: [],
      // radio1: '0',
      // radio2: '2',
      // radio3: '1',
    };
  },
  created(){
    this.radio1=1
    console.log(this.radio1)
  },
  mounted(){
    this.initData();
    this.findTourFieldTask();
    this.initMap();
    this.hasBtnPermission()

    // this.loginCenterAll=new bScroll(this.$refs.loginCenterAll,{
    //     scrollY:true,
    //     click:true
    // })

  
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



    PatrolfieldsNav(){
	   console.log(this.tourFieldTaskRodeo);
	   localStorage.setItem("tourFieldTaskRodeo",JSON.stringify(this.tourFieldTaskRodeo)); //地块信息
	   localStorage.setItem("mapType","0"); //类型
       this.$router.push('/Map');
    },
    /*地图展示*/ 
    initMap() {
        this.mapContent = this.$L.map("map",{zoomControl: true,attributionControl: false,}).setView([47.25, 132.03], 8);
        this.$L.tileLayer(
            "http://mt3.google.cn/vt/lyrs=y@167000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil.png",
        ).addTo(this.mapContent);
    },
      //分享
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
    toFindtask(){
       this.$router.push('./PatrolfieldsList');
    },
     
    initData() {
    var id = this.$route.query.id;
	
	if (id == undefined || id == "") {
		Toast('加载数据失败');
		return;
	}
		// this.isLoading = false;
    this.$api.taskApi.queryMyTourFieldTaskView(id).then(resp => {// 通过id查询详情
    // console.log(resp.data);
			let tourFieldTaskRecord = resp.data.result.getTourFieldTaskRecordFieldDto;
			for (let i = 0; i < tourFieldTaskRecord.length; i++) {
				tourFieldTaskRecord[i].isElectStr = tourFieldTaskRecord[i].isElect + "";
			}
			this.form = resp.data.result;
			console.log(this.form);
			// 地块信息
			this.tourFieldTaskRodeo = resp.data.result.getTourFieldTaskRodeoDto;
			let images = this.form.getTourFieldTaskRecordImagesDto;// 图片列表
			let getTourFieldTaskRecordDto = this.form.getTourFieldTaskRecordDto;
			
			for (let index = 0;index < getTourFieldTaskRecordDto.length;index++) {
				
				let tourFieldExplainStr = "";
				if (getTourFieldTaskRecordDto[index].taskExplain == "TIME_OUT") {
					tourFieldExplainStr = "期望完成时间(重新派发)";
				} else if (getTourFieldTaskRecordDto[index].taskStatus == 0) {
					tourFieldExplainStr = "期望完成时间";
				} else if (getTourFieldTaskRecordDto[index].taskStatus == 1) {
					tourFieldExplainStr = "验收通过";
				} else if (getTourFieldTaskRecordDto[index].taskStatus == 2) {
					tourFieldExplainStr = "巡田不通过  原因：" + getTourFieldTaskRecordDto[index].taskExplain;
				}
				getTourFieldTaskRecordDto[index].tourFieldExplainStr = tourFieldExplainStr;
			}
			// this.isLoading = false;
		}).catch(err => {
			// this.isLoading = false;
		});
		
		
	 },
   agreeOrDisagree(taskStatus) {// 通过 or 不通过
		this.$dialog.confirm({
		    message: "确认" + (taskStatus == 1 ? "通过" : "不通过") + "?", //改变弹出框的内容
		    showCancelButton: true //展示取水按钮
		})
		.then(() => {
			let tourFieldTaskRecord = this.form.getTourFieldTaskRecordFieldDto;
			for (let i = 0; i < tourFieldTaskRecord.length; i++) {
				tourFieldTaskRecord[i].isElect = Number(tourFieldTaskRecord[i].isElectStr);
			}
			let params = {
				taskStatus :taskStatus,
				taskExplain: this.form.taskExplain,
				id: this.form.id,
				addTourFieldTaskRecordFieldDtos : this.form.getTourFieldTaskRecordFieldDto
			};
			this.$api.taskApi.updateMyTourFieldTask(params).then(resp => {
				if (resp.data.code == 200) {
					Toast("操作成功！");
					this.initData();
				}
				// this.isLoading = false;
			}).catch(err => {
				// this.isLoading = false;
			});
		 })
		.catch(() => { //点击取消按钮后的调用
			
		});
	},

  onRead(file) {// 上传文件调用
		// this.postData.push(file)  // postData是一个数组
		var formData = new FormData();
		formData.append('file', file.file);
		formData.append('id', this.form.id);
		this.$api.taskApi.uploadFileField(formData).then(res => {
			//this.fileIds.push(res) //这里上传到指定的图片服务器，成功后会返回图片的url
			this.form.getTourFieldTaskRecordImagesDto.push(res.data.result);
		}).catch(err => {
			alert(err);
		});
	},
	findTourFieldTask() {
		let params = {}; //{pageNum : 1, pageSize : 10};
		let data = {};
		this.$api.taskApi.findTourFieldTask(params).then(res => {
			data = res.data.result;
			for (let i = 0; i < data.length;i++) {
				let tourFieldTaskRodeo = data[i].getTourFieldTaskRodeoDto;
				data[i].rodeoCount = tourFieldTaskRodeo.length;// 地块数
				let areaActualCount = 0;
				for (let i = 0; i < tourFieldTaskRodeo.length; i++) {
					areaActualCount += tourFieldTaskRodeo[i].areaActualCount;// 地块面积
				}
				data[i].areaActualCount = areaActualCount;
			}
		}).catch(err => {
			alert(err);
		});
		
		
		
	},
	showOptionBtn() {// 未通过 or 待复巡 状态并且为非超时可看见 【通过】【不通过】按钮
		return ((this.form.taskStatus == 0 || this.form.taskStatus == 2) && this.form.taskTimeOut != 1);
	}
  }
};
</script>

<style >
#map{
  width:100%;
  height: 8rem;
}
.PatrofieldsDetail {
  width: 100%;
  height: 100%;
  /* overflow-x: hidden; */
  overflow: hidden;
  overflow-y: scroll;
  background: #F6F7F6;
}
.PatrofieldsDetail::-webkit-scrollbar {
  display: none;
}

.loginmap {
  width: 750px;
  height: 400px;
  overflow: hidden;
 
}

.logname .van-row{
  font-size: 26px;
}
.logname .FinshLists{
  background: white;
  padding: 24px 0;
}
.logname .explain{
  height:330px;
  background:white;
  padding:10px 0;
  position: relative;

}

.logname>div:nth-child(3) .FindListPhoto>span{
  display: inline-block;
  width:120px;
  height:29px;
  font-size:30px;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(0,0,0,1);

}
.logname>div:nth-child(3) .FindListPhoto .van-uploader{
  display: flex;
  width:500px;
  margin-top: 29px;
  /* background: #3333; */
}
.logname>div:nth-child(3) .FindListPhoto .van-uploader .van-uploader__wrapper{
  display: flex;
}
.van-uploader .van-uploader__wrapper .van-uploader__preview .van-image{
  width: 120px;
  height: 120px;
}
.van-uploader .van-uploader__wrapper .van-uploader__preview .van-image img{
  border-radius: 9px;
  background: #3333;
  width:120px;
  height: 120px;
}
.van-image{
  width: 120px;
  height: 120px;
}
.van-uploader__upload{
  width: 120px;
  height: 120px;
}
.van-uploader__upload .van-uploader__input{
  border-radius: 9px;
}
.logname>div:nth-child(3) .FindTsk{
  width: 746px;
  height: 447px;
  margin-top: 20px;
  background: white;
}
.logname>div:nth-child(3) .FindTsk>span{
  display: inline-block;
  width:120px;
  height:29px;
  font-size:30px;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(52,52,52,1);
  margin: 40px 563px 23px 66px;
}
.logname>div:nth-child(3) .FindTsk table{
   border-collapse: collapse;
   border:none;
}
.logname>div:nth-child(3) .FindTsk table tr>th{
  width:747px;
  height:70px;
  background:#F6F7F6;
}
.logname>div:nth-child(3) .FindTsk table tr>td{
  font-size:24px;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(0,0,0,1);
  line-height:42px;
}
.logname>div:nth-child(3) .FindTsk table tr>td:nth-child(1){
  padding-left: 28px;
 
}
.logname>div:nth-child(3) .FindTsk table tr>td:nth-child(2){
  padding-left: 28px;
}
.control .van-icon{
  width:29px;
  height: 20px;
  /* background: yellowgreen; */
  margin-left: 180px;
}

.PatrolfieldsTask{
  position: absolute;
  right: 50px;
  top:0px;
  width:120px;
  height: 120px;
  border-radius: 50%;
  z-index:1;
  font-size: 30px;
 
}
.PatrolfieldsNav{
  width: 110px;
  height: 55px;
  background: #F0F0F0;

}
.logtoptext .van-nav-bar {
  background: white;
}
.van-nav-bar__left{
  margin-top:10px;
}
.van-nav-bar__left>i{
  margin-left: 10px;
}
.van-nav-bar__left>span{
  /* background: rgb(156, 155, 155); */
  font-size: 28px;
  margin-left: 10px;
}
.PatroBTN .van-button{
  font-size: 30px;
  height: 55px;
}

.notPass{
  margin-left:10px;
  background: #FFFFFF;
  border: 1px solid #0DC288;
  
  width:130px;


}
.Pass{
  margin-left:10px;
  background: #0DC288;
  font-family: PingFang SC;
  font-weight: 400;
  width:110px;
 
  font-size: 30px;
}
.FindAll{
  position: relative;
  height: 184px;
}
.PatroBTN{
  margin-top: 24px;
  width:100%;
  height: 99px;
  line-height: 99px;
  margin: auto;
  margin-left:326px;
  margin-top:130px;
  position:absolute;
}

</style>


