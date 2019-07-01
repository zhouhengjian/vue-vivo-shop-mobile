<template>
    <div class="Author">
        <van-nav-bar
            title="联系我"
            left-arrow
            @click-left="back"
        />
        <div class="AuthorMain">
            <h2>18岁的老周是个小全栈</h2>
            <img src="/img/touxiang.jpg" alt="" width="80px" height="80px">
            <p>邮箱：zhouhj0425@163.com</p>
            <p>qq：634881864</p>
            <p>github: <a href="https://github.com/zhouhengjian/vue-vivo-shop-mobile.git">vue-vivo-shop-mobile</a> </p>
            <van-button plain type="danger" @click="goHome">进入首页</van-button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed: {
        isShow(){
            return this.$store.state.footerIsShow
        }
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
        goHome(){
            this.$router.push("/home")
        }
    },
}
</script>

<style lang="scss">
.Author{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    overflow: hidden;
    background: white;
    .AuthorMain{
        font-size: 0.55rem;
        text-align: center;
    }
}
</style>
