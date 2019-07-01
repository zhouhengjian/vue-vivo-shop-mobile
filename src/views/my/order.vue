<template>
    <div class="order">
        <van-nav-bar
            title="我的订单"
            left-arrow
            @click-left="back"
            />
        <div class="orderimg" v-if="!orders.length">
            <img src="/img/dingdan.png" alt="订单">
            <p>您暂无订单</p>
        </div>
        <div class="orderMain">
            <van-panel 
                v-for="(order,i) in orders" :key="i"
                class="orders">
                <div slot="header" class="order-header">
                    <van-row>
                        <van-col span="18" style="font-size:22px;line-height:30p">
                            <p>vivo官方旗舰店</p>
                        </van-col>
                        <van-col span="6" style="font-size:16px;line-height:30p;color:red">
                            <p>交易成功</p>
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col span="12" style="font-size:12px;line-height:30p;color:#ccc">
                            <p>订单号：{{order.id}}</p>
                        </van-col>
                        <van-col span="12" style="font-size:12px;line-height:30p;color:#ccc">
                            <p>下单时间：{{order.addTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</p>
                            
                        </van-col>
                    </van-row>
                </div>
                
                <div class="order-body" v-for="(item,index) in order.result" :key="index">
                    <div class="orderImage">
                        <img :src="item.image" alt="手机图片">
                    </div>
                    <div class="order-text">
                        <div class="orderName"><span>{{item.name}}</span></div>
                        <div class="orderColor"><span>颜色:{{item.color}}</span></div>
                        <div class="orderPrice"><span>￥{{item.price}}</span></div>
                    </div>
                    <p >×{{item.value}}</p>
                </div>
                <div slot="footer" class="order-total">
                    <van-row>
                        <van-col span="18" style="font-size:16px;line-height:30px">
                            共<i style="color:red">&nbsp;{{order.result.length}}&nbsp;</i>件商品 总计:&nbsp;<i style="color:red">￥{{order.total}}</i>
                        </van-col>
                        <van-col span="6"><van-button size="small" type="danger" @click="orderdel(i)">删除</van-button></van-col>
                    </van-row>
                </div>
                
            </van-panel>
        </div>
    </div>
</template>

<script>
import { mapState ,mapMutations ,mapGetters,} from 'vuex';
export default {
    name:"order",
    data(){
        return{
            order:[]
        }
    },
    computed:{
        ...mapGetters(
            ["sum"]
        ),
        orders(){
            return this.$store.state.orders    
        },
        
    },
    methods:{
        ...mapMutations([
            "orderdel"
        ]),
        back(){
            this.$router.go(-1)
        },
    },
    mounted() {},
    updated() {},
}
</script>


<style lang="scss">
.order{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    background: #F4F4F4;
    overflow-x: hidden;
    overflow-y: auto;
    .orderimg{
        width: 3rem;
        height: 3rem;
        margin: 5rem auto;
        >img{
            width: 2.5rem;
        }
        >p{
            margin-top: 0.3rem;
            text-align: center;
            color: #ccc;
            font-size: 0.42rem 
        }
    }
    .orderMain{
        .orders{
            margin-top: 0.05rem;
            .order-header{
                padding: 10px 5px;
            }
            .order-body{
                height: 3.4rem;
                width: 100%;
                background: white;
                list-style: none;
                border-top: 1px solid #ccc;
                .orderImage{
                    padding: 0.3rem;
                    >img{
                        width: 2.5rem;
                        float: left;
                    }
                }
                .order-text{
                    width: 58%;
                    float: left;
                    font-size: 16px;
                    .orderName{
                        width: 100%;
                    }
                    .orderColor{
                        >span{
                            font-size: 14px;
                            padding-left: 0.1rem;
                            color: #888;
                        }
                    }
                    .orderPrice{
                        width: 100px;
                        float: left;
                        color: red;
                        font-size: 14px;
                        margin-top: 0.13rem;
                        >span{
                            color: red;
                        }
                    }
                }
                >p{
                    color: #888;
                    font-size: 16px;
                }  
            }
            .order-total{
                    width: 100%;
                    padding: 10px 10px;
                }
        }
    }
}
    
</style>
