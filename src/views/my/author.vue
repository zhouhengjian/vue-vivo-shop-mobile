<template>
    <div class="Author">
        <van-nav-bar
            title="关于我"
            left-arrow
            @click-left="back"
        />
        <div class="AuthorMain">
            <h2>一条小团团OVO</h2>
            <p>斗鱼：4615502</p>
            <img src="/img/300x450.jpeg" alt="头像" width="80%">
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
        img{
            margin-bottom: 0.35rem;
        }
    }
}
</style>
