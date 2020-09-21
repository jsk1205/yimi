<template>
  <div class="taskAccept">
      <div class="taskHead">
          <van-icon name="arrow-left" />
          <span class="taskAcc">任务验收</span>
      </div>

<!--    <span>任务验收</span>-->


    <div class="taskContent">
      <div class="taskTop">
<!--        <img src alt class="taskImg" />-->
        <div class="taskMessage">
          <div class="top">
            <span class="nameMESS">{{form.tractorDriverName}}</span>
            <span class="worker" >员工</span>
          </div>
        <div class="bottoms">
            <span>
                 <van-rate
                         v-model="valuet"
                         :size="25"
                         color="#FF9001"
                         void-icon="star"
                         void-color="#eee"
                 />
            </span>
            
<!--            <span><input type="text" v-model="form.getJobTaskCheckDto.evaluate"  style="height: 23px;width: 40px;" ></span>-->
        </div>


        </div>
      </div>

       <div class="taskCenter">
           <li>
               <span>任务名称</span>
               <span>{{form.cropsName}}{{form.linkName}}</span>
           </li>
           <li>
               <span>完成时间</span>
               <span>{{form.finshTime}}</span>
           </li>
           <li>
               <span>种子用量</span>
               <span>{{form.seedDosage}}</span>
           </li>
           <li>
               <span>化肥用量</span>
               <span>{{form.npkDosage}}</span>
           </li>
           <li>
               <span>任务面积</span>
               <span>{{form.taskArea}}亩</span>
           </li>
           <li>
               <span>实际作业面积</span>
               <span><input type="text" v-model="form.getJobTaskCheckDto.jobArea" placeholder="请输入实际作业面积"  style="height: 23px;border:none" >亩</span>
           </li>
       </div>
       <div class="taskStandard">
           <span>验收标准</span>
           <div class="taskLists">
               <div v-for="(item,index) in checkArr" :key="index">
                   <span>{{item.checkName}}</span>
                   <van-radio-group v-model="checkArr[index].isElect" direction="horizontal">
                       <van-radio name="0" >是</van-radio>
                       <van-radio name="1" >否</van-radio>
                   </van-radio-group>
               </div>
           </div>
       </div>
       <div class="taskExplain">
           <span>验收说明</span>
           <div>
               <!-- <textarea v-model="checkExplain" cols="30" rows="10" ></textarea> -->
               <van-field
  v-model="checkExplain"
  style="border:1px solid #0DC187;border-radius:6px"
  rows="4"
  autosize
  type="textarea"
  maxlength="200"
  placeholder="请输入留言"
  show-word-limit
/>
           </div>
       </div>
       <div class="taskPhoto">
          <div class="photoText">
               <span>现场照片</span>
               <span>清空</span>
          </div>
           <div class="photos">
               <van-row >
                   <van-col v-for="(item,index) in form.addJobTaskCheckImagesDto" span="8" :key="index">
                       <van-image :src="item.imagesUrl" ></van-image>
                   </van-col>
                   <div>
                   <div style="width:100%;height:75px;">
                       <van-uploader :accept="'image/*'" v-model="imageList" multiple :max-count="9" :after-read="onRead" />
                   </div>
               </div>
               </van-row>
               
           </div>
       </div>
    </div>
    <div class="taskFoot" style="margin-top:50px">
        <div v-if="form.taskStatus==1">
          <span @click="toList(3)" id="Taskbutton_notys" v-if="Power=='Taskbutton_notys'" >不通过</span>
          <span @click="toList(2)" id="Taskbutton_ys" v-if="Power=='Taskbutton_ys'">验收通过</span>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Uploader,Toast } from "vant";
import axios from "@/api/ajax";
const apiPrefixbaseNew = 'http://192.168.2.25:7770/'

Vue.use(Uploader);
Vue.use(Toast);
export default {
  name: "WorkTaskAccept",
    components: {},

    data() {
    return {
        valuet:2,
      form: {
          taskName: '',
          finshTime: '',
          seedDosage: '',
          npkDosage: '',
          getJobTaskCheckDto: [],
          addJobTaskCheckImagesDto: []
      },
        checkArr: [],
        options: [ {label:"1",value:"只读"}, {label:"2",value:"隐藏"} ],
        imageList: [],
        checkExplain: '',
        value: '',
        addJobTaskCheckImagesDto: [],
        Power:''
    }
  },
    mounted(){
        this.initData()
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

        initData() {
            let id = this.$route.query.jobId
            if (id == undefined || id == "") {
                Toast('加载数据失败');
                return;
            }
            axios.get(apiPrefixbaseNew + '/jobTask/queryJobTaskInfo',{params:{id}}).then(resp => {
                this.form = resp.data.result
                this.form.finshTime = this.form.getJobTaskRecordDto[0].taskTime
                this.form.seedDosage = this.form.getJobTaskSuccessDto.seedDosage
                this.form.npkDosage = this.form.getJobTaskSuccessDto.npkDosage
                this.checkExplain=this.form.getJobTaskCheckDto.checkExplain
                this.form.addJobTaskCheckImagesDto=this.form.getJobTaskCheckImagesDto
                if(this.form.getJobTaskCheckFieldDto.length>0){
                    this.checkArr=this.form.getJobTaskCheckFieldDto
                    for (let i in this.checkArr){
                        this.checkArr[i].isElect = this.checkArr[i].isElect+''
                        this.checkArr[i].isElect =this.checkArr[i].isElect+''
                    }
                }else{
                    let cropsCode = this.form.cropsCode
                    let linkCode = this.form.linkCode
                    axios.get(apiPrefixbaseNew + '/jobTask/queryCropsLinkCheck',{params:{cropsCode,linkCode}}).then(resp => {
                        this.checkArr=resp.data.result
                    }).catch(err => {
                        console.log(err);
                    })
                }
            }).catch(err => {
                console.log(err);
            })
        },
        toList(flag){
            for (let i in this.checkArr){
                this.checkArr[i].linkCheckId = this.checkArr[i].checkCode
                this.checkArr[i].linkCheckName =this.checkArr[i].checkName
            }
            for (let i in this.addJobTaskCheckImagesDto){
                this.addJobTaskCheckImagesDto[i].imagesDesc = i
            }
            let params = {
                id: this.form.id,
                accomplishDateTime: this.form.finshTime,
                addJobTaskCheckDto: {
                    taskStatus: flag,
                    checkExplain: this.checkExplain,
                    evaluate: this.valuet,
                    jobArea: this.form.getJobTaskCheckDto.jobArea
                },
                addJobTaskCheckFieldDto: this.checkArr,
                addJobTaskCheckImagesDto: this.addJobTaskCheckImagesDto
            }
            axios.put(apiPrefixbaseNew + 'jobTask/updateJobTaskSupervise', params).then(res => {
                this.$router.push("/WorkList")
            }).catch(err => {
                console.log(err)
            })
        },
        onRead(file) {// 上传文件调用
            // this.postData.push(file)  // postData是一个数组
            var formData = new FormData();
            formData.append('file', file.file);
            formData.append('id', this.form.id);
            this.$api.taskApi.uploadFileField(formData).then(res => {
                var person ={imagesUrl:res.data.result};
                this.addJobTaskCheckImagesDto.push(person);
            }).catch(err => {
                console.log(err)
            });
        },
		toMap(){
			localStorage.setItem("getJobTaskRodeoDto",JSON.stringify(this.form.getJobTaskRodeoDto));
			localStorage.setItem("mapType","2"); 
			
		}
    }
}
</script>

<style >

.taskHead{
    width: 750px;
    height: 92px;
    background: #FFFFFF;
    line-height: 92px;

}
.van-icon {
    width:15px;
    height: 26px;
    margin-left: 31px;
}
.taskAcc{
    width: 142px;
    height: 34px;
    font-size: 36px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    margin-left: 258px;

}
.taskContent .taskTop {
    display: flex;
    padding-top: 23px;
    width:750px;
    height: 178px;
}

.taskContent .taskTop .taskMessage {
  margin: 0 auto;
}
.top {
  display: flex;
  text-align: center;
}
.top>span{
    display: inline-block;
}
.taskContent .taskTop .taskMessage .bottoms {
  display: flex;
}
.taskContent .taskTop .taskMessage .bottoms span:nth-child(2) {
  margin-left: 300px;
}

.nameMESS {
    font-size: 34px;
    font-weight: bold;
    margin: 9px auto 0;
    margin-right: 9px;
}
.worker {
    width: 70px;
    height: 30px;
    background: #FF8F00;
    line-height: 40px;
    color: #eee;
    margin-top: 20px;
    text-align: center;

}
.taskContent .taskCenter li {
  list-style: none;
  padding-left: 50px;
  box-sizing: border-box;
  font-size: 30px;
  margin-bottom: 10px;
  border-bottom: 1px solid #dddd;
  height: 70px;
  line-height: 80px;
}
.taskContent .taskCenter li span {
  margin-right: 50px;
}
.taskContent .taskStandard {
  padding: 20px;
  box-sizing: border-box;
  padding-bottom: 0;
}
.taskContent .taskStandard > span {
  font-size: 30px;
  font-weight: bold;
}
.taskContent .taskStandard .taskLists {
  background: white;
  height: 290px;
  padding: 10px;
  box-sizing: border-box;
}
.taskContent .taskStandard .taskLists > div {
  height: 90px;
  border-bottom: 1px solid #8888;
}
.taskContent .taskStandard .taskLists span {
  font-size: 28px;
  display: block;
}
.taskContent .taskExplain {
  padding: 20px;
  box-sizing: border-box;
  padding-bottom: 0;
}
.taskContent .taskExplain span {
  font-size: 30px;
  font-weight: bold;
}
.taskContent .taskExplain div textarea {
  width: 100%;
  height: 100px;
}
.taskContent .taskPhoto {
  padding: 20px;
  box-sizing: border-box;
}
.taskContent .taskPhoto .photoText {
  display: flex;
}
.taskContent .taskPhoto .photoText span {
  display: block;
  /* margin-left: 20px; */
  font-size: 28px;
}
.taskContent .taskPhoto .photoText span:nth-child(2) {
  font-size: 30px;
  margin-left: 520px;
}
.taskFoot {
  height: 80px;
}
.taskFoot span {
  display: inline-block;
  font-size: 30px;
  width: 50%;
  height: 80px;
  line-height: 80px;
  background: #dddd;
  text-align: center;
}
.taskFoot span:nth-child(2) {
  color: white;
  background: #0DC187;
}
.van-row{
  width: 100%;
}
.van-image__img{
  width: 203px;
  height: 203px;
}
.van-image{
  width: 150px;
  height: 150px;
}
.van-image img{
  width: 100%;
  height: 100%;
}
.van-col{
  width: 150px;
}
</style>
