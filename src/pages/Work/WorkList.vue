<template>
      <div class="containList">
    <div class="containHead">
        <span class="titles">任务列表</span>
        <span><van-icon name="search" size="large"  style="margin-left:-10px" /></span>
    </div>
    <div style="width:100%;height:450px ;" v-if="!form">
		<van-loading type="spinner" size='25px' style="margin-top: 49%;margin-left: 45%;"/>
	</div>
    <div class="lists" v-for="(item,index) in form" :key="index" v-else>
        <div class="first">
            <div class="wait">
                <span class="left"></span>
                <span>{{item.taskStatus_name}}</span>
                <span class="right"></span>
            </div>
            <div class="listRight">
                <div>
                    <span>{{item.tractorDriverName}}</span>
                    <span>{{item.attribute2}}</span>
                </div>
                <span class="line"></span>

                <div class="listContent">
                    <li>
                        <span>{{item.linkName}}</span>
                    </li>

                    <li>
                        <span>{{item.farmMachineryCode}}</span>
                        <span class="count">{{item.attribute1}}</span>
                        <span>亩</span>
                    </li>
                    <li>
                        <span>质量监管人：{{item.superviseUserName}}</span>

                    </li>
                </div>
                <div class="listsBtns" style="float: right">
                    <div v-if="item.taskStatus==0">
                       
                        <van-button type="default" @click="toMap(item)" id="TaskListbutton_nav" v-if="Power=='TaskListbutton_nav'">导航</van-button>
                        <van-button type="default" @click="toOk(item)" id="TaskListbutton_agree" v-if="Power=='TaskListbutton_agree'">确认完成</van-button>
                    </div>
                    <div v-if="item.taskStatus==1">
                        <van-button type="default" @click="toMap" id="TaskListbutton_nav" v-if="Power=='TaskListbutton_nav'">导航</van-button>
                        <van-button type="default" @click="toMap" id="TaskListbutton_callPhone" v-if="Power=='TaskListbutton_callPhone'">联系机手</van-button>
                        <van-button type="primary" @click="toTaskAccept(item)" id="TaskListbutton_yes" v-if="Power=='TaskListbutton_yes'">验收</van-button>
                    </div>
                    <div v-if="item.taskStatus!=0&&item.taskStatus!=1">
                        <van-button type="primary" @click="toTaskAccept(item)">查看(验收)</van-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--播种环节弹出框-->
    <van-dialog v-model="okShow" title="任务完成确定" width="80%" show-cancel-button :beforeClose="chargeBtn" >
        <!--    输入框   -->
        <van-field v-model="taskArea"  label="任务面积"  type="text"  :beforeClose="chargeBtn" readonly/>
        <van-field v-model="finishTime"  label="完成时间" type="date"  :beforeClose="chargeBtn" />
        <van-field v-model="seedDosage" v-show="fieldShow"  label="种子用量" type="text"  :beforeClose="chargeBtn" />
        <van-field v-model="npkDosage" v-show="fieldShow"  label="化肥用量" type="text"  :beforeClose="chargeBtn" />
        <van-field v-model="agriculturalUser" v-show="fieldShow"  label="农资运输人" type="text"  :beforeClose="chargeBtn" />
    </van-dialog>
</div>

</template>

<script>
    import Vue from 'vue'
    import { Button,NumberKeyboard,Dialog } from 'vant'
    import axios from "@/api/ajax"
    // import hasBtnPermission from '@/util/permission'
    const apiPrefixbaseNew = 'http://192.168.2.25:7770/'

    Vue.use(Button)
    Vue.use(NumberKeyboard)
    Vue.use(Dialog)

    export default {
        name: 'WorkList',
        data(){
            return{
                message:'',
                form : [],
                seedDosage: '',
                npkDosage: '',
                jobId: '',
                agriculturalUser: '',
                taskArea: '',
                finishTime: '',
                okShow: false, //控制确认任务弹窗显示
                fieldShow: true ,//播种环节显示 种子 化肥 农资运输人 , 其他环节不显示
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

            getCurrtTime(){
                let t=new Date();
                let year=t.getFullYear();
                let month=t.getMonth()+1;
                let day=t.getDate();
                let hours=t.getHours();
                let minutes=t.getMinutes();
                return year+"."+month+"."+day+" "+hours+":"+minutes
            },
            initData() {
                let params = {}
                axios.post(apiPrefixbaseNew + '/jobTask/queryJobTaskByDriverId',params).then(resp => {
					if (resp.data.code == 200) {
						this.form = resp.data.result.list;
						let statusList = {'0':'待完成','1':'待验收','2':'验收通过','3':'验收不通过','4':'任务完成'}
						for (let status in statusList ){
						    for (let i in this.form){
						        if(this.form[i].taskStatus == status){
						            this.form[i].taskStatus_name = statusList[status]
						        }
						    }
						}
						console.log(this.form)
					}
                }).catch(err => {
                    console.log(err);
                })
            },
            toTaskAccept(item){
                let taskName =item.cropsName+item.linkName
                this.$router.push('/TaskAccept?taskName='+taskName+'&finishTime='+item.attribute2+'&taskArea='+item.attribute1+'' +
                    '&realArea='+item.attribute3+'&tractorDriverName='+item.tractorDriverName+'&evaluate='+item.attribute4+'&jobId='+item.id+'')
            },
            toOk(item){
                let date = this.$options.methods.getCurrtTime()
                this.jobId = item.id
                this.taskArea=item.attribute1
                this.okShow = true
                if(item.linkName=='播种'){
                    this.fieldShow=false
                }else{
                    this.fieldShow=true
                }
            },
            toMap(row){
				localStorage.setItem("getJobTaskRodeoDto",JSON.stringify(row.getJobTaskRodeoDto));
				localStorage.setItem("mapType","2");
                this.$router.push('/Map');
            },
            chargeBtn(action, done){//确认or取消
                if (action === 'cancel') {//取消按钮
                    done()
                } else if (action === 'confirm') {//确定按钮
                    let params = {
                        jobTaskId: this.jobId,
                        accomplishDateTime :this.finishTime,
                        seedDosage: this.seedDosage,
                        npkDosage: this.npkDosage,
                        agriculturalUser: this.agriculturalUser
                    };
                    //向后端传值并关闭dialog弹出框
                    axios.post(apiPrefixbaseNew + '/jobTask/createJobSuccess', params).then(()=>{
                        this.show = false
                        this.finishTime=''
                        this.seedDosage=''
                        this.npkDosage=''
                        this.agriculturalUser=''
                        this.$router.push('/WorkList');
                    });
                }
                done()
            },
        }
    }
</script>

<style>
    .containList{
        margin: 0;
        padding: 0;
    }
    .containList .containHead{
        width:750px;
        height:92px;
        background:rgba(255,255,255,1);
        position: relative;
    }
    .containList .containHead .titles{
        display: block;
        width:150px;
        height:34px;
        line-height: 34px;
        margin: auto;
        padding-top: 28px;
        box-sizing: border-box;
        font-size:36px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(52,52,52,1);
    }
    .containList .containHead>span:nth-child(2){
        width:34px;
        height:34px;
        position: absolute;
        right: 30px;

    }
    .containList .lists{
        width:750px;
        height:420px;
        background:rgba(246,247,246,1);
        padding: 24px 30px 39px 30px;
        box-sizing:border-box;
        display: flex;
    }
    .containList .lists .first{
        display: flex;
        width:690px;
        height:395px;
        background:rgb(255,255,255);
    }

    .containList .lists .first .wait{
        display: flex;

    }
    .containList .lists .first .left{
        width:5px;
        height:395px;
        background:#DECCB6;
    }
    .containList .lists .first .right{
        display: block;
        width:2px;
        height:388px;
        border:2px solid #C6C6C6;
        padding-top: 4px;
        padding-bottom: 3px;
        box-sizing: border-box;
    }
    .containList .lists .first .wait>span:nth-child(2){
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
    .containList .lists .first .listRight{
        display: flex;
        flex:1;
        flex-direction: column;
        /* justify-content: center; */
        padding: 32px;
        padding-right: 0;
        box-sizing: border-box;
    }
    .containList .lists .first .listRight>div:nth-child(1)>span:nth-child(1){
        width:72px;
        height:34px;
        font-size:36px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(52,52,52,1);
        line-height:84px;

    }
    .containList .lists .first .listRight>div:nth-child(1)>span:nth-child(2){
        width:246px;
        height:22px;
        font-size:28px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:22px;
        padding: 6px 0 6px 226px;
        box-sizing: border-box;
    }

    .containList .lists .first .listRight .line{
        width:578px;
        height:1px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(240,240,240,1);
    }
    .containList .lists .first .listRight .listContent li{
        list-style: none;
        /* background: brown; */

    }
    .containList .lists .first .listRight .listContent>li:nth-child(1){
        width:68px;
        height:30px;
        margin-top:23PX ;
        background:#7AC0AA;
        border-radius:15px;
        font-size:24px;
        font-family:PingFang SC;
        font-weight:400;
        color:white;
        /* line-height:30px; */

    }
    .containList .lists .first .listRight .listContent>li:nth-child(1)>span{
        margin-left: 11px;
    }
    .containList .lists .first .listRight .listContent li:nth-child(2)>span:nth-child(1){
        width:243px;
        height:28px;
        font-size:28px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(102,102,102,1);
        /* line-height:84px; */
    }
    .containList .lists .first .listRight .listContent li:nth-child(2)>span:nth-child(2){
        width:67px;
        height:42px;
        font-size:55px;
        font-family:PingFang SC;
        font-weight:bold;
        font-style:italic;
        color:rgba(102,102,102,1);
        /* line-height:84px; */
    }
    .containList .lists .first .listRight .listContent li:nth-child(2)>span:nth-child(3){
        width:26px;
        height:26px;
        font-size:28px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(102,102,102,1);
        margin-left: 11px;
    }
    .containList .lists .first .listRight .listContent li:nth-child(3){
        margin-top: 18px;
    }
    .containList .lists .first .listRight .listContent li:nth-child(3)>span{
        width:222px;
        height:27px;
        font-size:28px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:27px;

    }
    .containList .lists>div .listRight .listContent>li span:nth-child(3){
        margin-left: 50px;
    }
    .containList .lists>div .listRight .listContent li:nth-child(2) .count{
        margin-left: 180px;
    }
    .containList .lists>div .listRight .listBtns{
        display: flex;
        justify-content: flex-end;
    }
    .containList .lists>div .listRight .listBtns .van-button{
        width:150px;
        height: 70px;
        font-size: 26px;
        border-radius: 10px;
        margin-right: 20px;
    }
    .containList .lists>div .listRight .listBtns .van-button:nth-child(1) .van-cell{
        border: 1px solid blue;
    }
    .listsBtns{
        margin-top: 10px;
    }
    .listsBtns .van-button{
        width:110px;
        height:55px;
        background:rgba(240,240,240,1);
        margin-left: 172px;

    }
    .listsBtns .van-button:nth-child(2){
        margin:0 15px;
    }
    .listsBtns .van-button:nth-child(3){
        border:1px solid #0DC288;
        background: #0DC288;
        font-size:24px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-left: 15px;
    }
</style>
