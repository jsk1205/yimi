<template>
  <div class="container">
    <div class="bgHead">
      <h3 class="title">任务详情</h3>
      <div class="bg" id="map"></div>
    </div>
    <div class="accepted" v-if="status ==1 ">
      <span class="wait">{{this.form.taskStatus_name}}</span>
      <span>完成时间：{{this.form.finishTime}}</span>
    </div>
    <div class="accepted" v-if="status == 2">
      <span class="wait">待验收</span>
      <span>完成时间：{{this.form.finishTime}}</span>
    </div>
    <div class="accepted" v-if="status == 3">
      <span class="wait">验收不通过</span>
      <span>完成时间：{{this.form.finishTime}}</span>
    </div>
    <div class="accepted" v-if="status == 4">
      <span class="wait">已完成</span>
      <!-- 我是验收人 的已完成 -->
      <span>完成时间：{{this.form.finishTime}}</span>
    </div>
    <div class="accepted" v-if="status == 5">
      <span class="wait">待完成</span>
      <!--我是机手的 已完成 -->
      <span>完成时间：{{this.form.finishTime}}</span>
    </div>
    <div class="accepted" v-if="status == 6">
      <span class="wait" style="color:green;font-size:12px" v-if="value == 1"><van-icon name="passed" />   &nbsp;&nbsp;&nbsp;  验收通过</span>
      <span class="wait" style="color:red;font-size:12px" v-if="value ==2"><van-icon name="close" />  &nbsp;&nbsp;&nbsp;验收不通过</span>
      <span>完成时间：{{this.form.finishTime}}</span>
    </div>
    <div class="userDetail">
      <div class="user">
        <span class="name">{{form.tractorDriverName}}</span>
        <span>{{form.tractorDriverPhone}}</span>
      </div>
      <span>{{form.cropsName}} | {{form.linkName}} | {{form.areaRodeoSum}}亩</span>
    </div>
    <div class="content">
      <span class="myTask" @click="toList">
        我的任务
        <van-dialog v-model="show" title="任务提示" show-cancel-button></van-dialog>
      </span>
      <div class="top">
        <div class="topMessage">
          <div class="message">
            <li>
              <span>车牌号</span>
              <span>{{form.farmMachineryCode}}</span>
            </li>
            <li>
              <span>验收人</span>
              <span>{{form.superviseUserName}}</span>
              <span>{{form.superviseUserPhone}}</span>
            </li>
            <li>
              <span>跟车人</span>
              <span>{{form.followCarUserName}}</span>
              <span>{{form.followCarUserPhone}}</span>
            </li>
          </div>
          <div class="tasks">
            <span>任务说明</span>
            <span style="font-size:12px;margin-left:10px">{{form.taskExplain}}</span>
          </div>
        </div>
      </div>
      <div class="center" >
        <div v-if="modelvalue ==1">
          <span class="title">验收信息</span>
          <div style="margin-left:20px;width:90%;background:white">
            <van-row style="margin-top:10px;margin-left:20px;padding:5px">
              <van-col span="8">验收人</van-col>
              <van-col span="4">张平</van-col>
              <van-col span="6">18638549894</van-col>
              <van-col span="5" style="color:orange" v-if="showvalue == 1">验证通过</van-col>
              <van-col span="5" style="color:orange" v-if="showvalue == 2">验证未通过</van-col>
            </van-row>
            <van-row style="margin-top:10px;margin-left:20px">
              <van-col span="8">验收时间</van-col>
              <van-col span="8">2020.4.8 12:03:45</van-col>
              <van-col span="8"></van-col>
            </van-row>
            <van-row style="margin-top:10px;margin-left:20px">
              <van-col span="8">作业面积</van-col>
              <van-col span="8">28.5亩</van-col>
              <van-col span="8"></van-col>
            </van-row>
            <van-row style="margin-top:10px;margin-left:20px">
              <van-col span="5">种子用量</van-col>
              <van-col span="5">10斤</van-col>
              <van-col span="5">化肥用量</van-col>
              <van-col span="5">5斤</van-col>
            </van-row>
            <span class="title">验收指标</span>
            <div style="width:90%;margin-left:5%;background:white">
              <div style="display:flex;margin-left:0px;padding:10px">
                <span>
                  <van-icon name="success" color="green" v-if="value == 1" />
                  <van-icon name="cross" color="red" v-if="value == 2" />作业面是否平整
                </span>
                <span style="margin-left:20px">
                  <van-icon name="success" color="green" v-if="value == 1" />
                  <van-icon name="cross" color="red" v-if="value ==2 " />肥量是否符合要求
                </span>
              </div>
              <div style="display:flex;margin-left:20px">
                <span>
                  <van-icon name="success" color="green" v-if="value == 1" />
                  <van-icon name="cross" color="red" v-if="value==2" />种量是否符合要求
                </span>
                <span style="margin-left:20px">
                  <van-icon name="success" color="green" v-if="value == 1" />
                  <van-icon name="cross" color="red" v-if="value == 2" />美观度是否合格
                </span>
              </div>
            </div>
            <div>
              <van-cell
                title="验收说明"
                label="整体验收合格，需待出苗后再进行苗率核查"
                style="margin-left:0px;font-size:15px"
              />
            </div>
          </div>
        </div>
        <div>
          <div style="margin-left:20px;width:90%;background:white;margin-top:20px;padding:5px" v-if="modelvalue==2">
            <div>
              <span class="title">验收信息</span>
              <span style="margin-left:200px;color:#0DC288">验收通过</span>
            </div>
            <van-row style="margin-top:10px">
              <van-col style="margin-left:20px" span="12">质量监管人</van-col>
              <van-col span="4">张平</van-col>
              <van-col span="6">18828299491</van-col>
            </van-row>
            <van-row>
              <van-col style="margin-left:20px" span="12">验收时间</van-col>
              <van-col span="5">2020.3.4</van-col>
              <van-col span="5">12:34:44</van-col>
            </van-row>
            <van-row>
              <van-col style="margin-left:20px" span="10">作业面积</van-col>
              <van-col span="5"></van-col>
              <van-col span="7">28亩</van-col>
            </van-row>
            <van-row>
              <van-col style="margin-left:20px" span="10">种子用量</van-col>
              <van-col span="5"></van-col>
              <van-col span="7">28.5斤</van-col>
            </van-row>
            <van-row style="margin-bottom:10px">
              <van-col style="margin-left:20px" span="10">化肥用量</van-col>
              <van-col span="5"></van-col>
              <van-col span="7">10斤</van-col>
            </van-row>
            <span class="title">验收标准</span>
            <div style="width:100%;margin-left:-5%;">
              <div style="display:flex;margin-left:40px;margin-top:15px" class="checkboxx">
                <span>
                  <van-checkbox v-model="checked.a" shape="square" checked-color="#0DC288">作业面是否平整</van-checkbox>
                </span>
                <span style="margin-left:50px">
                  <van-checkbox v-model="checked.b" shape="square" checked-color="#0DC288">肥量是否符合要求</van-checkbox>
                </span>
              </div>
              <div
                style="display:flex;margin-left:40px;margin-top:15px;margin-bottom:10px"
                class="checkboxx"
              >
                <span>
                  <van-checkbox v-model="checked.c" shape="square" checked-color="#0DC288">种量是否符合要求</van-checkbox>
                </span>
                <span style="margin-left:40px">
                  <van-checkbox v-model="checked.d" shape="square" checked-color="#0DC288">美观度是否合格</van-checkbox>
                </span>
              </div>
            </div>
            <div>
              <van-cell title="验收说明" style="margin-left:0px;font-size:15px" />
              <van-field
                v-model="message"
                rows="4"
                autosize
                type="textarea"
                style="border:solid 1px #0DC288;border-radius:2px;width:90%;margin-left:5%;"
                maxlength="200"
                placeholder="请输入留言"
                show-word-limit
              />
            </div>
          </div>
        </div>
        <div class="center" style="margin-top:20px">
          <van-row>
            <van-col span="8" class="title">任务记录</van-col>
          </van-row>
          <table>
            <tr bgcolor="grey">
              <th>时间</th>
              <th>说明</th>
              <th class="lastCol">执行人</th>
            </tr>
            <tr v-for="(item,index) in form.getJobTaskRecordDto" :key="index">
              <td>{{item.taskTime}}</td>
              <td>{{item.taskExplain}}</td>
              <td>{{item.creatorName}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <!-- v-if="status ==1 &&  this.hasPerm "-->
    <div class="btns" style="margin-left:-100px" v-if="status ==1" >
      <!-- <van-button type="info">分享</van-button> -->
      <van-button type="info" id='TaskListActive_nav'  v-if="Power =='TaskListActive_nav'"   >导航</van-button>
      <!-- v-if="this.hasPerm.hasBtnPermission ('TaskListActive_nav')=='TaskListActive_nav'" -->
      <div v-if="this.form.taskStatus==0">
        <van-button type="info" @click="toOk()" style="background:#0DC288;color:white" v-if="Power=='TaskListActive_su'"  id="TaskListActive_su">确认完成</van-button>
      </div>
    </div>
    <div class="btns" style="margin-left:-100px" v-if="status == 2">
      <!-- <van-button type="info">分享</van-button> -->
      <van-button type="info" id='TaskListActive_nav'  v-if="Power  =='TaskListActive_nav'">导航</van-button>
    </div>
    <div class="btns" style="margin-left:-100px" v-if="status ==3">
      <!-- <van-button type="info">分享</van-button> -->
      <!-- v-if="this.$hasBP.reqLogin.hasBtnPermission()" -->
      <van-button type="info" id='TaskListActive_nav'  v-if="Power  =='TaskListActive_nav'">导航</van-button>
    </div>
    <div class="btns" style="margin-left:-100px" v-if="status ==4 ">
      <van-button type="info" id='TaskListActive_nav'  v-if="Power  =='TaskListActive_nav'">导航</van-button>
      <van-button type="info" id="TaskListActive_pa" v-if="Power  =='TaskListActive_pa'">验收</van-button>
       <!-- 验收人  详情页 缺少 通过  不通过 按钮 -->
    </div>
    <div class="btns" style="margin-left:-100px" v-if="status ==5 ">
      <van-button type="info" id='TaskListActive_nav'  v-if="Power  =='TaskListActive_nav'" >导航</van-button>
      <van-button type="info" style="background:#0DC288;color:white" id="TaskListActive_su" v-if="Power =='TaskListActive_su' ">确认完成</van-button>
    </div>
    <!--播种环节弹出框-->
    <van-dialog
      v-model="okShow"
      title="任务完成确定"
      width="80%"
      show-cancel-button
      :beforeClose="chargeBtn"
    >
      <!--    输入框   -->
      <van-field
        v-model="form.areaRodeoSum"
        label="任务面积"
        type="text"
        :beforeClose="chargeBtn"
        readonly
      />
      <van-field v-model="finishTime" labe~="完成时间" type="date" :beforeClose="chargeBtn" />
      <van-field
        v-model="seedDosage"
        v-show="fieldShow"
        label="种子用量"
        type="text"
        :beforeClose="chargeBtn"
      />
      <van-field
        v-model="npkDosage"
        v-show="fieldShow"
        label="化肥用量"
        type="text"
        :beforeClose="chargeBtn"
      />
      <van-field
        v-model="agriculturalUser"
        v-show="fieldShow"
        label="农资运输人"
        type="text"
        :beforeClose="chargeBtn"
      />
    </van-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, NumberKeyboard, Dialog } from "vant";
import { Toast } from "vant";
import axios from "@/api/ajax";
// import hasBtnPermission from '@/util/permission'
const apiPrefixbaseNew = "http://192.168.2.25:7770/";

Vue.use(Button);
Vue.use(Dialog);
Vue.use(NumberKeyboard);
Vue.use(Toast);
export default {
  name: "WorkDetail",
  data() {
    return {
      mapContent:'',
      status:1,
      modelvalue:3,
      showvalue:2,
      message: "",
      checked: { a: false, b: false, c: false, d: false },
      form: {
        taskStatus: "",
        taskStatus_name: "",
        areaRodeoSum: 0,
        cropsName: "",
        linkName: "",
        getJobTaskRecordDto: [], //任务记录
        getJobTaskRodeoDto: [],
        getJobTaskCheckDto: "",
        finishTime: "",
      },
      finishTime: "",
      seedDosage: "",
      npkDosage: "",
      jobId: "",
      agriculturalUser: "",
      taskArea: "",
      okShow: false, //控制确认任务弹窗显示
      fieldShow: true, //播种环节显示 种子 化肥 农资运输人 , 其他环节不显示
      show: false,
      showShare: false,
      value: 1,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "复制链接", icon: "link" },
      ],
      Power:''
    };
  },
  created(){
      // this.$hasPerm.hasBtnPermission()
      //  this.$set(this.hasBtnPermission('a' ))
      // this.hasBtnPermission('a')
  },
  mounted() {
    this.initData();
    this.initMap();
   
    this.hasBtnPermission()

  },
  methods: {
  
      // console.log('111')
    //  this.hasPerm.hasBtnPermission()
        hasBtnPermission(permission){
        let getBtnPermisssionArr=JSON.parse(localStorage.getItem('btnPermission'));
        this.Power=getBtnPermisssionArr.toString().replace(/,/g,'');
        console.log(this.Power)
        console.log(permission)
        
       },



    /*地图展示*/
    initMap() {
      this.mapContent = this.$L.map("map",{zoomControl: true,attributionControl: false,}).setView([47.25, 132.03], 8);
      this.$L.tileLayer(
          "http://mt3.google.cn/vt/lyrs=y@167000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil.png",
      ).addTo(this.mapContent);
    },
    initData() {
      var id = this.$route.query.id;
      if (!id) {
        id = "2020082315353620522";
      }
      if (id == undefined || id == "") {
        Toast("加载数据失败");
        return;
      }
      axios
        .get(apiPrefixbaseNew + "/jobTask/queryJobTaskInfo", { params: { id } })
        .then((resp) => {
          this.form = resp.data.result;
          let statusList = {
            "0": "待完成",
            "1": "待验收",
            "2": "验收通过",
            "3": "验收不通过",
            "4": "任务完成",
          };
          for (let status in statusList) {
            if (this.form.taskStatus == status) {
              this.form.taskStatus_name = statusList[status];
            }
          }
          this.form.finishTime = this.form.getJobTaskRecordDto[0].taskTime;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toList() {
      this.$router.push("/WorkList");
    },
    toOk() {
      this.okShow = true;
      if (this.form.linkName == "播种") {
        this.fieldShow = false;
      }
    },
    chargeBtn(action, done) {
      //确认or取消
      console.log(this.form.id);
      if (action === "cancel") {
        //取消按钮
        done();
      } else if (action === "confirm") {
        //确定按钮
        let params = {
          jobTaskId: this.form.id,
          accomplishDateTime: this.finishTime,
          seedDosage: this.seedDosage,
          npkDosage: this.npkDosage,
          agriculturalUser: this.agriculturalUser,
        };
        //向后端传值并关闭dialog弹出框
        axios
          .post(apiPrefixbaseNew + "/jobTask/createJobSuccess", params)
          .then(() => {
            this.show = false;
            this.finishTime = "";
            this.seedDosage = "";
            this.npkDosage = "";
            this.agriculturalUser = "";
            this.$router.push("/WorkDetail");
          });
      }
      done();
    },
  },
 
};
</script>

<style >
#map{
  width:100%;
  height:8rem;
}
.container {
  overflow: scroll;
}
.container .bgHead .title {
  text-align: center;
  font-size: 36px;
  font-family: PingFang SC;
  font-weight: 400;
}
/* .van-icon-arrow-left {
} */
.container .bgHead .bg {
  width: 100%;
  height: 450px;
  background-color: #eee;
}
.container .accepted {
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin: 20px;
  margin-top: 30px;
  font-size: 26px;
  /* border:1px solid #333; */
}
.container .accepted .wait {
  font-size: 34px;
  font-weight: bold;
  margin-bottom: 20px;
}
.container .userDetail {
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin: 20px;
  margin-top: 30px;
  font-size: 26px;
  /* border:1px solid #333; */
}
.container .userDetail .user .name {
  font-size: 34px;
  font-weight: bold;
  margin-right: 50px;
}
.container .userDetail .user {
  margin-bottom: 20px;
}
.container .userDetail > span {
  font-weight: bold;
}
.container .content {
  background: #F6F7F6;
  position: relative;
}
.container .content .myTask {
  display: block;
  width: 120px;
  height: 120px;
  line-height: 120px;
  background: yellowgreen;
  border-radius: 50%;
  text-align: center;
  font-size: 28px;
  color: white;
  position: absolute;
  right: 10px;
  top: -80px;
  white-space: pre-wrap;
}
.container .content .top {
  width: 90%;
  margin-left: 5%;
  text-align: left;
}
.container .content .top .topMessage {
  background: white;
  margin-top: 20px;
  width: 100%;
  height: 300px;
  padding: 30px;
  box-sizing: border-box;
}
.container .content .top .topMessage .message li {
  list-style: none;
  font-size: 30px;
  margin-bottom: 15px;
}
/* .container .content .top .topMessage .message li > span {
  margin-right: 50px;
} */
.container .content .top .topMessage .tasks > span {
  font-size: 30px;
  display: block;
  margin-top: 10px;
}
.container .content .center table tr th,
td.lastCol {
  background: #f5f7f5;
}
.container .content .center .title {
  font-size: 30px;
  color: black;
  margin-left: 20px;
}
.container .content .center table {
  width: 100%;
  border-collapse: collapse;
  border: 0px solid #dfdfdf;
  background: #f5f7f5;
}
.container .content .center table td,
th {
  font-size: 28px;
  border-top: 0;
  border-right: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
  border-left: 0;
  padding: 5px;
}

.container .content .center table tr.lastrow td {
  border-bottom: 0;
}
.container .content .center table tr th,
td.lastCol {
  border-right: 0;
}
.container .btns {
  display: flex;
  justify-content: flex-end;
  margin: 20px;
}
.container .btns .van-button {
  height: 55px;
  font-size: 30px;
  font-family: Adobe Heiti Std;
  font-weight: normal;
  color: #333333;
  line-height: 84px;
  margin-right: 29px;

}
.van-button--info{
  background: #F0F0F0;
  border:#f5f7f5;
  margin-right: 20px;
}
.container .btns .van-button:nth-child(3) {
  color: white;
  background-color: yellowgreen;
}
.center .van-cell-group {
  width: 95%;
  margin-left: 2%;
  height: 100px;
  background: gray;
}
.van-cell__label {
  font-size: 23px;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
}
.checkboxx {
  height: 30px;
  line-height: 30px;
}
.checkboxx span .van-checkbox {
  height: 100%;
  line-height: 100%;
}

</style>
