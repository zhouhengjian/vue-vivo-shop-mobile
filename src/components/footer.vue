<template>
    <div class="footer" >
        <van-tabbar v-model="active" active-color="red" inactive-color="#292929" fixed border>
            <van-tabbar-item replace name="home" :to="{name:'home'}" icon="wap-home">
                <span>首页</span>
            </van-tabbar-item>
            <van-tabbar-item replace name="information" :to="{name:'information'}" icon="label-o">
                <span>资讯</span>
            </van-tabbar-item>
            <van-tabbar-item replace name="cart" :to="{name:'cart'}" icon="shopping-cart-o" :info="getCartInfo" v-show="getCartInfo!=0">
                <span>购物车</span>
            </van-tabbar-item>
            <van-tabbar-item replace name="cart" :to="{name:'cart'}" icon="shopping-cart-o" v-show="getCartInfo==0">
                <span>购物车</span>
            </van-tabbar-item>
            <van-tabbar-item replace name="my" :to="{name:'my'}" icon="contact">
                <span>我的</span> 
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: "home",
        }
    },
    computed: {
        // 获取购物车商品数量
        getCartInfo(){
            return this.$store.state.carts.length 
        }
    },
}
</script>

<style lang="scss" scoped>
    .footer{
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 999;
        border-top: 1px solid #292929;
        height: 50px;
        width: 100%;
        overflow: hidden;
    }

</style>

