<template>
<div class="goodDetail" >
        <van-nav-bar title="商品详情" left-arrow @click-left="back" />
        <div class="goodDetailList">
            <ul style="background: white;">
                <li v-for="(goodDetail,index) in goodDetails" :key="goodDetail.id">
                    <div class="goodDetaiSwipe">
                        <van-swipe :autoplay="3000" indicator-color="red">
                            <van-swipe-item ><img v-bind:src="goodDetail.imgone" alt="图片"></van-swipe-item>
                            <van-swipe-item ><img v-bind:src="goodDetail.imgtwo" alt="图片"></van-swipe-item>
                            <van-swipe-item ><img v-bind:src="goodDetail.imgThree" alt="图片"></van-swipe-item>
                        </van-swipe>
                    </div>
                    <div class="goodDetailMain">
                        <div class="gooDetailNumber">商品编号：{{goodDetail.number}}</div>
                        <div class="goodDetailName">{{goodDetail.name}}</div>
                        <div class="goodDetailColor">{{goodDetail.color}}</div>
                        <div class="goodDetailPaid">￥ {{goodDetail.price}}</div>
                    </div>
                    
                    <div class="goodDetailValue">
                        <div class="_Value">购买数量：</div>
                        <div style="margin-left: 2rem;">
                            <van-stepper v-model="goodDetail.value" integer min="1" max="99"/>
                        </div>
                    </div>
                    <div class="goodDetailBox">
                        <van-tabs v-model="selected" swipeable animated>
                            <van-tab title="图文详情">
                                <div class="goodDetailImg">
                                    <p v-for="Image in goodDetail.Images">
                                        <img v-bind:src="Image.one" alt="详情图片">
                                    </p>
                                    <p>
                                        <img src="/img/list_details_09.jpg" alt="">
                                    </p>
                                </div>
                            </van-tab>
                            <van-tab title="商品配置">
                                <div class="goodDetailPeizhi">
                                    <table style="width: 100%;border:1px solid #cccccc;margin-top: 5px;border-collapse: collapse;" border="1">
                                        <tbody>
                                            <tr v-for="Peizhi in goodDetail.Peizhis">
                                                <td style="width:26%;height:50px">{{Peizhi.left}}</td>
                                                <td style="width:80%;height:50px">{{Peizhi.right}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </van-tab>
                        </van-tabs>
                    </div>
                    <div class="goodDetailFooter">
                        <van-goods-action>
                            <van-goods-action-icon icon="chat-o" text="客服" @click="chat" />
                            <van-goods-action-icon icon="cart-o" text="购物车" :info="getCartInfo?getCartInfo:''" @click="gotoCart" />
                            <van-goods-action-button type="warning" text="加入购物车" @click="add(index)" />
                            <van-goods-action-button type="danger" text="立即购买" @click="pay(index)" />
                        </van-goods-action>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';
import { Toast } from 'vant';
import { Tab, Tabs } from 'vant';
    export default{
        name:"goodDetail",
        data(){
            return{
                selected:"" ,
                goodDetails:[]
            }
        },
        mounted(){
            this.getData()
        },
        computed:{
            paid(){
                let paid=0
                for(var i in this.goodDetails){
                    paid+=this.goodDetails[i].value*this.goodDetails[i].price
                }
                return paid
            },
            // 获取购物车商品数量
            getCartInfo(){
                return this.$store.state.carts.length
            }
            
        },
        methods:{
            // 本地写个json数据文件，模拟后台将数据渲染出来
            getData(){
                let id = this.$route.query.id
                this.$axios.get("/goodDetail.json").then((res)=> {
                    for (var i = 0; i < res.data.goodDetails.length; i++) {
                        if (res.data.goodDetails[i].id == id) {
                            this.goodDetails.push(res.data.goodDetails[i])
                        }
                    }
                })
            },
            jia(index){
                this.goodDetails[index].value++
            },
            jian(index){
                if(this.goodDetails[index].value==1){
                    this.goodDetails[index].value=1
                }else{
                    this.goodDetails[index].value--
                }
            },
            chat(){
                Toast.fail('程序员小哥哥正在努力开发中....');
            },
            gotoCart(){
                this.$router.push("/cart")
            },
            // 点击按钮时，首先判断该商品是否在购物车已存在，如果存在则不再加入
            add(index){
                let idExist=this.$store.state.carts.find(obj=> {
                    return obj.id==this.goodDetails[index].id
                })
                if(!idExist){
                    let data={
                        id:this.goodDetails[index].id,
                        name:this.goodDetails[index].name,
                        price:this.goodDetails[index].price,
                        image:this.goodDetails[index].imgone,
                        value:this.goodDetails[index].value,
                        color:this.goodDetails[index].color,
                    }
                    this.$store.commit("addcarts",data);
                    Toast.success("加入购物车成功！");
                }else{
                    Toast.fail('商品已存在购物车中');
                }
            },
            //返回上一级
            back(){
                this.$router.go(-1)
            },
            pay(index){
                if(this.$store.state.isLogin==true){
                    Toast.success(`成功支付了${this.paid}元`);
                    let data={
                        id:this.goodDetails[index].id,
                        name:this.goodDetails[index].name,
                        price:this.goodDetails[index].price,
                        image:this.goodDetails[index].imgone,
                        value:this.goodDetails[index].value,
                        order:this.goodDetails[index].order,
                        color:this.goodDetails[index].color,
                        number:this.goodDetails[index].number,
                    }
                    let order={
                        id:this.$common.getOrderId(new Date()),
                        total:this.paid,
                        addTime:new Date(),
                        result:[data]
                    }
                    this.$store.commit("addorder",order)
                }else{
                    Toast.fail('请先登录！')
                }
            },
        }
    }
</script>

<style lang="scss">
    .goodDetail{
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 999;
        top: 0;
        left: 0;
        overflow-x: hidden;
        overflow-y: auto;
        background: white;
        .goodDetailList{
            margin-bottom: 1rem;
            .goodDetaiSwipe{
                margin-top: 3px;
                background: white;
                img{
                    width: 70%;
                    height: 7rem;
                    display: block;
                    margin: 15px auto;
                }
            }
            .goodDetailMain{
                background: white;
                border-bottom: 1px solid #cecece;
                border-top: 1px solid #cecece;
                padding: 0.4rem;
                .gooDetailNumber{
                    display: none
                }
                .goodDetailName{
                    color: black;
                    font-weight: 800;
                    font-size: 0.35rem
                }
                .goodDetailColor{
                    display: none
                }
                .goodDetailPaid{
                    color: red;
                    font-size: 0.4rem;
                }
            }
            .goodDetailValue{
                height: 1rem;
                border-bottom: 1px solid #cecece;
                padding: 0.4rem;
                ._Value{
                    float: left;
                    margin-top: 0.2rem
                }
            }
            .goodDetailBox{
                height: 1px;
                .goodDetailImg{
                    margin-top: 4px;
                    padding-bottom: 1rem;
                    img{
                        width: 100%;
                        height: auto;
                        display: block;
                    }
                }
                table{
                    margin-bottom: 50px;
                    td{
                        font-size: 0.31rem;
                        text-align: center;
                        color: #000
                    }  
                }
            }
            .goodDetailFooter{
                position: fixed;
                width: 100%;
                bottom: 0rem;
                height: 1.3rem;
                background: #F6F4F7;
                border-top: 1px solid #efefef
            }
        }
    }
</style>
