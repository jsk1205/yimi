<template>
    <div id="drivermapland-bar">
        <!-- 顶部导航 -->
       <van-nav-bar title="选择地块" left-text="返回" left-arrow>
            <template #right>
                <van-icon name="search" size="18" />
            </template>
        </van-nav-bar>
        <!-- 地图 -->
        <div id="map"></div>
        <!-- 弹窗信息 -->
        <van-popup
            v-model="show"
            closeable
            close-icon="close"
            round 
            position="bottom"
            :style="{ height: '30%' }"
            >
            <van-submit-bar :price="3050" button-text="确定" @submit="onSubmit">
                <van-checkbox v-model="checked">全选</van-checkbox>
            </van-submit-bar>
        </van-popup>
    </div>    
</template>
<script>
// import markerIcon from "@/assets/img/landmap/center_point.png"
export default {
    name:'Driverlandmap',
    data(){
        return{
            mapContent:'',
            allLandSearch:{
                "companyId": "2020083108012476141",
                "cropCode": "202008310814126413",
                "growthStageCode": "",
                "linkCode": "",
                "type": "j"
            },
            polygonArr:[],
            show:false,
            checked:false,
        }
    },
    mounted(){
        this.initMap();
    },
    methods:{
        /*地图展示*/
        initMap() {
            this.mapContent = this.$L.map("map",{zoomControl: true,attributionControl: false,}).setView([47.25, 132.03], 8);
            this.$L.tileLayer(
                "http://mt3.google.cn/vt/lyrs=y@167000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil.png",
            ).addTo(this.mapContent);
            this.driverRodeoCoordinate(this.allLandSearch);
        },
        /*展示所有地块信息*/
        driverRodeoCoordinate(params){
            this.$api.taskApi.driverRodeoCoordinate(params).then(resp => {
                console.log('所有地块~~',resp)
                if(resp.status=='200'){
                    let data=resp.data.result;
                    data.forEach((item, index)=> {
                        let myIcon = L.icon({
                            iconUrl: markerIcon,
                            iconSize: [20,29],
                            iconAnchor: [12, 28],
                            className:'landrodeoId'+' '+item.rodeoId,
                        });
                        let locationMarker=L.marker(item.coordinate, {icon: myIcon}).addTo(this.mapContent);
                            this.mapContent.panTo(data[0].coordinate);
                        let that=this;
                            locationMarker.on('click',function(e){
                                console.log(e)
                                let classNameArr=e.target.options.icon.options.className.split(' ');
                                that.driverRodeoAreaInfo(that.allLandSearch.companyId,classNameArr[1]);
                            });  
                    })
                }
            }).catch(err => {
                // Toast.error('发生异常');
            });
        },
        /*查询地块详情*/
        driverRodeoAreaInfo(companyCode,id){
            this.$api.taskApi.driverRodeoAreaInfo(companyCode,id).then(resp => {
                console.log('地块详情~~',resp)
                if(resp.data.code=='200'){
                    // 展示弹层
                    this.show=true;
                    let data=resp.data.result;
                    let rodeoId=data.rodeoId;
                    let coordinate=data.coordinate;
                    let areaActualCount=data.areaActualCount;
                    let areaLandCount=data.areaLandCount;
                        this.mapContent.fitBounds(data.areaGeJson02);
                    //显示该地块的面积
                    let myIcon =  L.divIcon({
                        html: (areaActualCount||areaLandCount)+'亩',
                        className:rodeoId+' '+'landAllArea'
                    });
                    let area=L.marker(coordinate, {icon: myIcon}).addTo(this.mapContent);
                    let polygon=L.polygon(data.areaGeJson02, {className:rodeoId+' '+'landContent'+'',color:'#FF6000',fillColor:'#FF6000', opacity: 0.5, weight: 2}).addTo(this.mapContent);
                        polygonArr.push(polygon);   
                    
                }
            }).catch(err => {
                // Toast.error('发生异常');
            });
        },
        /*确定*/
        onSubmit(){
            console.log('44555')
        }, 
    }
}
</script>
<style>
    #drivermapland-bar .van-nav-bar{
        height:100px;
        line-height: 100px;
        font-size:24px;
    }
    #map{
        width:100%;
        height:100vh;
    }
    #map .landAllArea{
        width:150px;
        color:#fff;
    }
    /* 弹窗阴影 */
    .van-overlay{
        display:none;
    }
</style>