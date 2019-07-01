<template>
    <div class="choose">
        <van-nav-bar
            title="选购手机"
            left-arrow
            @click-left="choose"
        />
        <div class="choose-main">
            <van-tabs v-model="selected" swipeable animated>
                <van-tab title="全部">
                    <van-row class="products">
                        <van-col span="12" v-for="(choose,index) in chooses" :id="choose.id" :key="index">
                            <div @click="open(choose.id)">
                                <div class="image">
                                    <img :src="choose.ImageOne" alt="图片">
                                </div>
                                <div class="name">{{choose.name}}</div>
                                <div class="nametwo">{{choose.nametwo}}</div>
                                <div class="Price">￥{{choose.Price}}</div>
                            </div>
                        </van-col>
                    </van-row>
                </van-tab>
                <van-tab title="Xplay系列">
                    <van-row class="products">
                        <van-col span="12" v-for="(choose,index) in motos" :id="choose.id" :key="index">
                            <div @click="open(choose.id)">
                                <div class="image">
                                    <img :src="choose.ImageOne" alt="图片">
                                </div>
                                <div class="name">{{choose.name}}</div>
                                <div class="nametwo">{{choose.nametwo}}</div>
                                <div class="Price">￥{{choose.Price}}</div>
                            </div>
                        </van-col>
                    </van-row>
                </van-tab>
                <van-tab title="X系列">
                    <van-row class="products">
                        <van-col span="12" v-for="(choose,index) in MotoZs" :id="choose.id" :key="index">
                            <div @click="open(choose.id)">
                                <div class="image">
                                    <img :src="choose.ImageOne" alt="图片">
                                </div>
                                <div class="name">{{choose.name}}</div>
                                <div class="nametwo">{{choose.nametwo}}</div>
                                <div class="Price">￥{{choose.Price}}</div>
                            </div>
                        </van-col>
                    </van-row>
                </van-tab>
                <van-tab title="Y系列">
                    <van-row class="products">
                        <van-col span="12" v-for="(choose,index) in z2s" :id="choose.id" :key="index">
                            <div @click="open(choose.id)">
                                <div class="image">
                                    <img :src="choose.ImageOne" alt="图片">
                                </div>
                                <div class="name">{{choose.name}}</div>
                                <div class="nametwo">{{choose.nametwo}}</div>
                                <div class="Price">￥{{choose.Price}}</div>
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
    name:"choose",
    data(){
        return{
            selected:"",
            chooses:[],
            motos:[],
            MotoZs:[],
            z2s:[]
        }
    },
    mounted(){
        this.getData()
        this.getMoto()
        this.getVibe()
        this.getZ2()
    },
    methods:{
        getData(){
            this.$axios.get("/choose.json").then((res)=>{
                for(var i=0;i<res.data.chooses.length;i++){
                    let selData=res.data.chooses[i];
                    let part=res.data.chooses[i].name;
                    this.chooses.push(selData)
                }
            })
        },
        getMoto(){
            this.$axios.get("/choose.json").then((res)=>{
                for(var i=0;i<res.data.motos.length;i++){
                    let selData=res.data.motos[i];
                    let part=res.data.motos[i].name;
                    this.motos.push(selData)
                }
            })
        },
        getVibe(){
            this.$axios.get("/choose.json").then((res)=>{
                for(var i=0;i<res.data.MotoZs.length;i++){
                    let selData=res.data.MotoZs[i];
                    let part=res.data.MotoZs[i].name;
                    this.MotoZs.push(selData)
                }
            })
        },
        getZ2(){
            this.$axios.get("/choose.json").then((res)=>{
                for(var i=0;i<res.data.z2s.length;i++){
                    let selData=res.data.z2s[i];
                    let part=res.data.z2s[i].name;
                    this.z2s.push(selData)
                }
            })
        },
        open(id){
            this.$router.push({path:"goodDetail",query:{id:id}})
        },
        choose(){
            this.$router.go(-1)
        },
    }
}
</script>

<style lang="scss" scoped>
.choose{
    position: fixed;
    background: white;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    z-index:999;
    overflow-x: hidden;
    overflow-y: auto;
    .choose-main{
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
