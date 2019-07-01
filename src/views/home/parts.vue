<template>
    <div class="parts">
        <van-nav-bar
            title="选购配件"
            left-arrow
            @click-left="parts"
        />
        <div class="partsMain">
            <van-tabs v-model="selected" animated swipeable>
                <van-tab title="全部">
                    <van-row class="products">
                        <van-col span="12" v-for="(parts,index) in list" :key="index">
                            <div @click="open(parts.id)">
                                <div class="image">
                                    <img :src="parts.image" alt="图片">
                                </div>
                                <div class="name">{{parts.name}}</div>
                                <div class="nametwo">{{parts.nametwo}}</div>
                                <div class="Price">￥{{parts.price}}</div>
                            </div>
                        </van-col>
                    </van-row>
                </van-tab>
                <van-tab title="充电器">
                    <van-row class="products">
                        <van-col span="12" v-for="(parts,index) in charger" :key="index">
                            <div @click="open(parts.id)">
                                <div class="image">
                                    <img :src="parts.image" alt="图片">
                                </div>
                                <div class="name">{{parts.name}}</div>
                                <div class="nametwo">{{parts.nametwo}}</div>
                                <div class="Price">￥{{parts.price}}</div>
                            </div>
                        </van-col>
                    </van-row>
                </van-tab>
                <van-tab title="保护膜">
                    <van-row class="products">
                        <van-col span="12" v-for="(parts,index) in protect" :key="index">
                            <div @click="open(parts.id)">
                                <div class="image">
                                    <img :src="parts.image" alt="图片">
                                </div>
                                <div class="name">{{parts.name}}</div>
                                <div class="nametwo">{{parts.nametwo}}</div>
                                <div class="Price">￥{{parts.price}}</div>
                            </div>
                        </van-col>
                    </van-row>
                </van-tab>
                <van-tab title="耳机音响">
                    <van-row class="products">
                        <van-col span="12" v-for="(parts,index) in headset" :key="index">
                            <div @click="open(parts.id)">
                                <div class="image">
                                    <img :src="parts.image" alt="图片">
                                </div>
                                <div class="name">{{parts.name}}</div>
                                <div class="nametwo">{{parts.nametwo}}</div>
                                <div class="Price">￥{{parts.price}}</div>
                            </div>
                        </van-col>
                    </van-row>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import { Tab, Tabs } from 'vant';
export default {
    data(){
        return{
            selected:"",
            list:[],
            charger:[],
            protect:[],
            headset:[]
        }
    },
    mounted(){
        this.getData(),
        this.chargerData(),
        this.protectData(),
        this.HeadsetData()
    },
    methods:{
        getData(){
            this.$axios.get("/parts.json").then((res)=>{
                for(var i=0;i<res.data.list.length;i++){
                    let selData=res.data.list[i];
                    let part=res.data.list[i].name;
                    this.list.push(selData)
                }
            })
        },
        chargerData(){
            this.$axios.get("/parts.json").then((res)=>{
                for(var i=0;i<res.data.charger.length;i++){
                    let selData=res.data.charger[i];
                    let part=res.data.charger[i].name;
                    this.charger.push(selData)
                }
            })
        },
        protectData(){
            this.$axios.get("/parts.json").then((res)=>{
                for(var i=0;i<res.data.protect.length;i++){
                    let selData=res.data.protect[i];
                    let part=res.data.protect[i].name;
                    this.protect.push(selData)
                }
            })
        },
        HeadsetData(){
            this.$axios.get("/parts.json").then((res)=>{
                for(var i=0;i<res.data.headset.length;i++){
                    let selData=res.data.headset[i];
                    let part=res.data.headset[i].name;
                    this.headset.push(selData)
                }
            })
        },
        parts(){
            this.$router.go(-1)
        },
        open(id){
            this.$router.push({path:"goodDetail",query:{id:id}})
        },
    }
}
</script>


<style lang="scss">
.parts{
    position: fixed;
    background: white;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    z-index: 999;
    overflow-x: hidden;
    overflow-y: auto;
    .partsMain{
        width: 100%;
        .products{
            border-top: 1px solid #ccc;
            padding-bottom: 50px;
            .van-col--12{
                border-bottom: 1px solid #ccc;
                &:nth-child(2n-1){
                    border-right: 1px solid #ccc;
                }
                .image{
                    width: 100%;
                    height: 4rem;
                    background: white;
                    img{
                        height: 3.3rem;
                        width: 3.5rem;
                        display: block;
                        margin:0 auto;
                        padding-top: 0.45rem;
                    }
                }
                .name{
                    width: 80%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    margin: auto;
                    font-size: 0.25rem;
                    padding-top: 0.25rem;
                    font-weight: 800;
                    text-align: center;
                }
                .nametwo{
                    font-size: 0.2rem;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    text-align: center;
                    padding-top: 0.15rem;
                    font-family: "微软雅黑"
                }
                .Price{
                    font-size: 0.43rem;
                    color: red;
                    margin:0 auto;
                    text-align: center;
                    padding-top: 0.3rem;
                    padding-bottom: 0.2rem;
                    font-weight: bold;
                }
            }
        }
    }
} 

</style>
