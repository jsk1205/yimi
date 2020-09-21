<template>
  <div>
    <div>
       <van-nav-bar
  title="任务地块"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
  style="background:#FFFFFF"
/>
    </div>
  <div class="bg" id="map"></div>
  <div class="bottom">
      <ul>
      <li style="margin-left:10px;font-weight:600">
          <span style="font-size:13px">
金丰合作社刘庆地块
          </span>
          <span style="color:#FF7827;font-size:13px;margin-left:20px">
              12亩
          </span>
           </li>
      <li><van-icon name="records" color="green" size="20px" style="margin:5px"/>
      <span style="margin-left:5px">
          种植作物：
      </span>
      <span>玉米</span>
      </li>
      <li><van-icon name="location-o" color="green" size="20px" style="margin:5px"/>
      <span style="margin-left:5px">

      黑龙江省哈尔滨市兰西县
      </span>
      </li>
      </ul>
      <van-divider />
      <van-button plain round type="primary" style="margin-left:10px;font-size:13px" @click="gohere">
          <van-icon name="map-marked" color="green" size="10px" style="margin-left:3px;margin-right:3px"/>
          去这里</van-button>
  </div>
</div>
</template>


<script>
import Vue from "vue";
import axios from "@/api/ajax";
const apiPrefixbaseNew = "http://192.168.2.126:7720/";
export default {
  name: 'Map',
    mounted(){
     this.initMap();   
     this.initData()
    },
    methods:{
        gohere(){
            
        },
        onClickLeft(){
            this.$router.go(-1)
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
    }
}
</script>

<style >
#map{
  width:100%;
  height:13rem !important;
}
.container .bgHead .bg {
  width: 100%;
  height: 450px;
  background-color: #eee;
}
.bottom{
    width: 100%;
}
li{
    list-style: none;
    padding-top: 5px;
    margin-left: 10px;
    height: 50px;
    line-height: 50px;
}
</style>
