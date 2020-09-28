<template>
  <!-- 我是入仓,过磅，发车页面 -->
  <div class="DriverPlan">
    <!--头部 -->
    <div class="DriverHead">
      <div class="DriverHeadMess">
        <span class="DriverLeft"><</span>
        <span class="DriverCenter" @click="goBack">返回</span>
        <span class="DriverRight" v-if="showvalue==1">入仓信息</span>
        <span class="DriverRight" v-if="showvalue==2">发车信息</span>
        <span class="DriverRight" v-if="showvalue==3">过磅信息</span>
      </div>
    </div>

    <!-- 内容 -->
    <div class="DriverContent">
      <li class="DriverFirst">
        <tr>
          <span>司机姓名</span>
          <span class="DriverLists">
            <!-- 李三 -->
            {{form.driverName }}
          </span>
        </tr>
        <tr>
          <span>车辆信息</span>
          <span class="DriverLists">
            <!-- 黑A 92839 -->
            {{form.carCode }}
          </span>
        </tr>
        <tr>
          <span class="Drivercolor">载重量</span>
          <span class="DriverLists" style="margin-left:210px">
            <!-- 10吨 -->
            {{form.carCapacity }}
          </span>
        </tr>
        <tr>
          <span class="Drivercolor">皮重</span>
          <span class="DriverLists" style="margin-left:225px">
            <!-- 5吨 -->
            {{form.carTare }}
          </span>
        </tr>
      </li>
      <!-- 入仓信息 -->
      <li class="DriverSeccend" style="margin-top:20px" v-if="showvalue==1">
        <tr>
          <span style="margin-left:29px">入仓信息</span>
        </tr>
        <tr>
          <span style="margin-left:33px">毛重</span>
          <van-cell-group>
            <!-- <van-field v-model="form.roughWeight" @change="getMoney" placeholder="请输入" /> -->
            <input type="number" v-model="form.roughWeight" 
            @keydown="numlimit"
             @change="getMoney" />
          </van-cell-group>
          <span class="DriverCount">吨</span>
        </tr>
        <tr>
          <span style="margin-left:33px">净重</span>
          <van-cell-group>
            <!-- <van-field v-model="form.suttleWeight" placeholder="请输入" /> -->
            <input
              type="number"
              v-model="form.suttleWeight"
              @keydown="numlimit"
              @change="compare()"
            />
          </van-cell-group>
          <span class="DriverCount">吨</span>
        </tr>
        <tr>
          <span style="margin-left:33px">扣重</span>
          <van-cell-group>
            <!-- <van-field v-model = "form.deductWeight" placeholder="请输入" /> -->
            <input type="number" v-model="form.deductWeight" name id />
          </van-cell-group>
          <span class="DriverCount">斤</span>
        </tr>
        <tr>
          <span style="margin-left:33px">单价</span>
          <van-cell-group>
            <!-- <van-field v-model="form.price" @change="getMoney" placeholder="请输入" /> -->
            <input type="number" v-model="form.price" name id @change="getMoney" />
          </van-cell-group>
          <span class="DriverCounts">元/公斤</span>
        </tr>
        <tr class="DriverTr">
          <div>
            <i class="Drivericon">*</i>
            <span>入仓时间</span>
          </div>
          <div>
            <van-cell
              is-link
              @click="showPopup"
              style="font-size:15px;margin-left:60px"
            >{{form.weightTime}}</van-cell>
          </div>
        </tr>
      </li>
      <!-- 发车信息 -->
      <li class="DriverSeccend" style="margin-top:20px" v-if="showvalue==2">
        <tr>
          <span style="margin-left:29px">装车信息</span>
          <span style="margin-left:55%">
            <van-icon name="plus" @click="addmsg" />
          </span>
        </tr>
        <div v-for="(item,index) in itemArr" :key="index" style="margin-top:10px">
          <tr style="display:flex">
            <span style="margin-left:33px">收获地块</span>
            <van-cell-group>
              <van-field placeholder="请输入" />
            </van-cell-group>
            <span class="DriverCount" @click="toSelecrLand()">></span>
            <span style="margin-left:40px" @click="arrdelete(index)">
              <van-icon name="cross" />
            </span>
          </tr>
          <tr style="display:flex">
            <span style="margin-left:33px">净重</span>
            <van-cell-group>
              <van-field v-model="item.suttleWeight"
               @keydown="numlimit"
               @change="sumMoney" placeholder="请输入" />
            </van-cell-group>
            <span class="DriverCount">吨</span>
          </tr>
        </div>
        <!-- <tr>
          <span v-for="(item,index) in itemArr" :key="index">
            <input v-model="item.content"  style="width:100%"/>
          </span>
        </tr>-->

        <tr class="DriverTr">
          <div style="margin-left:220px">
            <span>净重小计：</span>
            <span>{{this.count}}吨</span>
          </div>
        </tr>
        <tr>
          <span style="margin-left:33px">车辆毛重</span>
          <van-cell-group>
            <van-field v-model="form.grossWeight" placeholder="请输入" />
            <!-- v-model="value"  -->
          </van-cell-group>
          <span class="DriverCount">吨</span>
        </tr>
        <tr class="DriverTr">
          <div>
            <i class="Drivericon">*</i>
            <span>发车时间</span>
          </div>
          <div>
            <van-cell
              is-link
              @click="showPopup"
              style="font-size:15px;margin-left:60px"
              @confirm="choosetime"
              @cancel="choosetimef"
            >{{this.form.weightTime}}</van-cell>
          </div>
        </tr>
      </li>
      <!-- 过磅信息 -->
      <li class="DriverSeccend" style="margin-top:20px" v-if="showvalue==3">
        <tr>
          <span style="margin-left:29px">过磅信息</span>
        </tr>
        <tr>
          <span style="margin-left:33px">毛重</span>
          <van-cell-group>
            <van-field v-model="form.roughWeight"
            @keydown="numlimit"
             placeholder="请输入" />
          </van-cell-group>
          <span class="DriverCount">吨</span>
        </tr>
        <tr>
          <span style="margin-left:33px">净重</span>
          <van-cell-group>
            <van-field v-model="form.suttleWeight" 
            @keydown="numlimit"
            placeholder="请输入" @change="compare()" />
          </van-cell-group>
          <span class="DriverCount">吨</span>
        </tr>
        <tr class="DriverTr">
          <div>
            <i class="Drivericon">*</i>
            <span>过磅时间</span>
          </div>
          <div>
            <van-cell
              is-link
              @click="showPopup"
              style="font-size:15px;margin-left:60px"
            >{{form.weightTime}}</van-cell>
          </div>
        </tr>
      </li>
      <div class="DriverPhotoes">
        <div style="display:flex ;margin-top:20px;">
          <div style="margin:15px 0">
            <span class="run">运输单</span>
            <span class="add">
              <van-icon name="delete" @click="deletephoto" />
            </span>
          </div>
        </div>
        <!-- 限制上传数量 -->
          <div v-for="(item,index) in form.imageList2" span="8" :key="index">
            <van-image :src="item" style="width:100%;height:150px;"></van-image>
          </div>
          <van-uploader
            v-model="imageList"
            multiple
            :max-count="20"
            style="margin-left:15px"
            :after-read="onRead"
          />
        </div>

      <!-- <van-notify v-model="show1" type="success">
        <van-icon name="bell" style="margin-right: 4px;" />
        <span>操作成功</span>
      </van-notify> -->

      <!-- <span class="sum" v-if="showvalue == 1 ">共计：{{totalMoney }}元</span> -->
	  
      <!-- 1 入仓  2 发车 3 过磅 -->
      <div class="Driverbutton">
        <!-- 这里要具体看值 -->
        <span class="btnsReject" @click="tolist" id="PatrolfieldsMess_r||PatrolfieldsCar_rq||PatrolfieldsWeight_rq" v-if="Power=='PatrolfieldsMess_rq||PatrolfieldsCar_rq||PatrolfieldsWeight_rq'">取消</span>
        <span class="btnsPri" v-if=" (showvalue == 1 || showvalue == 3) && (Power='PatrolfieldsMess_sure||PatrolfieldsWeight_sure')" id="PatrolfieldsMess_sure||PatrolfieldsWeight_sure" @click="confirmBtn()">确定</span>
        <span class="btnsPri" v-if=" (showvalue == 2) && (Power='PatrolfieldsCar_sure')" id="PatrolfieldsCar_sure" @click="confirmDepartBtn()">确定</span>
      </div> 
      <!-- 此处飘红 需要修改 ---：修改完毕-->
    </div>
    <van-popup v-model="show">
      <span class="DrivetDateTime" style="width:100%">
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          title="选择完整时间"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="choosetime"
          @cancel="choosetimef"
        />
      </span>
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
import { Field, Uploader, Toast } from "vant";

Vue.use(Field);
Vue.use(Uploader);
Vue.use(Toast);
export default {
  name: "DriverPlan",
  created() {
    this.choosetime();
    this.initData();
    this.choosedata();
  },
  data() {
    return {
      Power:'',
      totalMoney: 0.0,
      show1: false,
      show: false,
      time: "",
      showvalue: 2,
      imageList: [],
      imageList2: [],
      count: 0,
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(2050, 10, 1),
      currentDate: new Date(),
      itemArr: [{ content: "" }],
	  addHaulwayTaskDepartRecordInfos: [
	  	{
	  	"areaActualCount": 5,
	  	"areaName": "测试地块",
	  	"centerPoint": "中心点",
	  	"companyId": "2020081810494571610",
	  	"companyName": "合作社名称",
	  	"departTime": "2020-09-02 12:12:12",
	  	"gcj02": "gcj02",
	  	"haulwayTaskId": "2020082711172936769",
	  	"rodeoId": "rodeoId",
	  	"rodeoUserId": "rodeoUserId",
	  	"rodeoUserName": "rodeoUserName",
	  	"suttleWeight": 0,
	  	"taskStatus": 0,
	  	"wgs84": "wgs84"
	  	}
	  ],
      form: {
        count: "",
        weightTime: this.time,
      },
    };
  },
  mounted(){
     this.hasBtnPermission()
  },
  methods: {
    goBack(){
      this.$router.push('/DriverList')
    },
    // 装车信息收货地块跳转至选择地块
    toSelecrLand(){
      this.$router.push('/Driverlandmap')
    },

      hasBtnPermission(permission){
        let getBtnPermisssionArr=JSON.parse(localStorage.getItem('btnPermission'));
        this.Power=getBtnPermisssionArr.toString().replace(/,/g,'');
        console.log(this.Power)
        console.log(permission)
        console.log(getBtnPermisssionArr) //["a", "b", "c", "d", "e", "f"]

        console.log(getBtnPermisssionArr.indexOf(permission)>-1)  //true
        return getBtnPermisssionArr.indexOf(permission)>-1;
    },
    numlimit(e){
       e.target.value = (e.target.value.match(/^\d*(\.?\d{0,3})/g)[0]) || null
    },
    choosedata() {
      let data = new Date();
      let y = moment(data).format("YYYY");
      let m = moment(data).format("MM");
      let d = Number(moment(data).format("DD"));
      
      this.maxDate = new Date(y, m - 1, d+1);
    },
    compare() {
      // roughWeight  毛重      suttleWeight 净重
      if (Number(this.form.roughWeight) < Number(this.form.suttleWeight)) {
        Toast("净重不能大于毛重");
      }
    },
    getMoney() {
      // console.log(this.form.suttleWeight + "======计算=======" + this.form.price)
      this.totalMoney = Number(
        Number(
          this.form.roughWeight == "" || this.form.roughWeight == undefined
            ? 0
            : this.form.roughWeight
        ) *
          Number(
            this.form.price == "" || this.form.price == undefined
              ? 0
              : this.form.price
          )
      ).toFixed(2);
    },
    onRead(file) {
      let type = 2;
      if (this.showvalue == 1) {
        type = 3;
      } else if (this.showvalue == 2) {
        type = 1;
      }
      var formData = new FormData();
      formData.append("file", file.file);
      formData.append("id", this.form.id);
      formData.append("type", type);

      this.$api.taskApi
        .uploadFileWay(formData)
        .then((res) => {
          //this.fileIds.push(res) //这里上传到指定的图片服务器，成功后会返回图片的url
          // this.form.getTourFieldTaskRecordImagesDto.push(res.data.result);

          this.imageList2.push(res.data.result);
        })
        .catch((err) => {});
        // console.log(this.imageList2)
    },
    addmsg() {
      this.itemArr.push({ content: "" });
    },
    sumMoney() {
      this.count = 0;
      for (let item in this.itemArr) {
        this.$nextTick(() => {
          this.count =
            Number(this.count == '' ? 0 : this.count) +
            Number(
              this.itemArr[item].suttleWeight == ""
                ? 0
                : this.itemArr[item].suttleWeight
            );
		  this.count = this.count == "NaN" ? 0 : this.count;
        });
      }
    },
    arrdelete(index) {
      if (index < 1) {
        // console.log('删不了了')
      } else {
        this.itemArr.splice(index, 1);
        this.count = 0;
        for (let item in this.itemArr) {
          this.$nextTick(() => {
            this.count =
              Number(this.count) + Number(this.itemArr[item].suttleWeight);
          });
        }
      }
    },
    tolist() {
		if (this.form.pageFrom == 0) {
			this.$router.push({path : '/DriverLog',query : {id : this.form.id}});
		} else {
			this.$router.push('/DriverList');
		 }
    },
    deletephoto() {
      this.imageList = [];
    },
    showPopup() {
      this.show = true;
    },
    choosetime() {
      // this.showvalue = 2;
      this.show = false;
      this.time = moment(this.currentDate).format("YYYY-MM-DD HH:mm");
      this.form.weightTime = moment(this.currentDate).format(
        "YYYY-MM-DD HH:mm"
      );
      console.log(this.time);
    },
    choosetimef() {
      // this.showvalue = 2;
      this.show = false;
      // this.time = this.time
      console.log(this.time);
    },
    initData() {
      var param = JSON.parse(localStorage.getItem("form"));
      this.showvalue = param.billType;
      // this.showvalue = 1;
      this.form = param;
      this.form.loadWeight = this.form.carCapacity; // 载重
      this.form.tareWeight = this.form.carTare; // 皮重
	  this.form.grossWeight = '';
      this.form.roughWeight = "";
      this.form.suttleWeight = "";
      this.form.weightTime = this.time;
      console.log(this.form);
      //
    },
    showNotify() {
      this.show1 = true;
      setTimeout(() => {
        this.show1 = false;
      }, 2000);
    },
    confirmBtn() {
      console.log(this.form.id);
      let msg = this.showvalue == 1 ? "确认入仓信息？" : "确认过磅信息？";
      this.$dialog
        .confirm({
          title: "", //加上标题
          message: msg,
          showCancelButton: true,
        })
        .then(() => {
          this.form.weightTime = this.form.weightTime + ":00";
          this.form.roughWeight = Number(
            this.form.roughWeight == undefined || this.form.roughWeight == ""
              ? 0
              : this.form.roughWeight
          );
          this.form.suttleWeight = Number(
            this.form.suttleWeight == undefined || this.form.suttleWeight == ""
              ? 0
              : this.form.suttleWeight
          );
          this.form.deductWeight = Number(
            this.form.deductWeight == undefined || this.form.deductWeight == ""
              ? 0
              : this.form.deductWeight
          );
          this.form.price = Number(
            this.form.price == undefined || this.form.price == ""
              ? 0
              : this.form.price
          );
		  
		  this.form.grossWeight = Number(
		    this.form.grossWeight == undefined || this.form.grossWeight == ""
		      ? 0
		      : this.form.grossWeight
		  );
		  
          this.form.companyId = this.form.companyCode;
          // this.form.type = this.showvalue == 1 ? 1 : 0 ; // 0、过磅点；1、入仓点
          console.log(this.form);return;
          // 初始化数据
          this.$api.taskApi
            .addDriverDeparWeigh(this.form)
            .then((res) => {
              if (res.data.code == 200) {
                Toast("操作成功！");
                this.tolist();
              }
            })
            .catch((err) => {});
        })
        .catch(() => {});
    },
    confirmDepartBtn() {
      // 确认发车

      this.$dialog
        .confirm({
          title: "", //加上标题
          message: "确认发车？",
          showCancelButton: true
        })
        .then(() => {
          this.form.roughWeight = Number(this.form.roughWeight); // 毛重
          this.form.inCarTime = this.form.weightTime + ":00"; // 发车时间
		  this.form.grossWeight = Number(this.form.grossWeight == undefined || this.form.grossWeight == ""? 0: this.form.grossWeight);
		  this.form.addHaulwayTaskDepartRecordInfos = this.addHaulwayTaskDepartRecordInfos;
          console.log(this.form);
		  this.$api.taskApi.addDriverDeparture(this.form).then((res) => {
              if (res.data.code == 200) {
                Toast("操作成功！");
                this.tolist();
              }
            }).catch((err) => {});
        }).catch(() => {});
    },
  },
};
</script>

<style >
.DriverHead {
  width: 750px;
  height: 91px;
  /* background: #FFFFFF; */

  line-height: 91px;
}
.DriverHeadMess {
  display: flex;
}
.DriverHeadMess > span {
  display: inline-block;
}
.DriverHeadMess .DriverLeft {
  margin-left: 38px;
  margin-right: 26px;
}
.DriverHeadMess .DriverCenter {
  font-size: 32px;
  font-family: PingFang;
  font-weight: bold;
  color: #333333;
}
.DriverHeadMess .DriverRight {
  margin-left: 160px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #333333;
  font-size: 36px;
}
.DriverContent {
  padding-top: 25px;
  background: #f5f7f5;
}
.DriverFirst {
  background: white;
}
.DriverFirst > tr {
  height: 99px;
  font-size: 30px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 99px;
  display: flex;
  margin-left: 32px;
}

.Drivercolor {
  font-size: 30px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #999999;
}
.DriverFirst .DriverLists {
  margin-left: 400px;
  font-size: 30px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #999999;
}
.DriverSeccend {
  background: white;
}
.DriverSeccend > tr {
  height: 99px;
}
.DriverContent > li {
  list-style: none;
}
.DriverSeccend > tr {
  display: flex;
}
.DriverSeccend > tr > span {
  font-size: 30px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #333333;
}
.van-cell-group {
  margin-left: 200px;
}
.DriverTr {
  display: flex;
}
.DriverCount {
  margin-left: 26px;
}
.Drivericon {
  color: #d52121;
  margin-left: 40px;
}
.DrivetDateTime {
  font-size: 30px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #999999;
  margin-left: 250px;
}
.DirverDAYU {
  width: 15px;
  height: 26px;
  margin-left: 23px;
}
.DriverPhotoes {
  width: 750px;
  background: #ffffff;
  margin-top: 20px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 42px;
}
.run {
  font-size: 30px;
  color: #333333;
  margin-right: 550px;
  margin-left: 31px;
}
.add {
  font-size: 26px;
  color: #656565;
}
.sum {
  display: inline-block;
  width: 750px;
  height: 70px;
  background: #ffe8e8;
  text-align: center;
  line-height: 70px;
}
.Driverbutton {
  height: 92px;
  width: 750px;
  backface-visibility: #8888;
  display: flex;
  height: 92px;
  background: #ffffff;
  font-size: 36px;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 84px;
  text-align: center;
  margin-bottom: 80px;
}
.btnsReject {
  display: inline-block;
  width: 375px;
  background: #ffff;
  color: #0dc187;
}
.btnsPri {
  width: 374px;

  color: #ffffff;
  background: #0dc187;
}
.DriverSeccend span:nth-child(1) {
  width: 200px;
}
.DriverSeccend .van-cell-group {
  margin-left: 0px;
}
.van-popup--center {
  width: 100%;
}
.van-cell .van-cell--clickable {
  width: 120px;
  margin-left: 150px;
}
.van-uploader__wrapper {
  height: 300px;
  overflow: scroll;
}
input {
  border: 0;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
}
</style>
