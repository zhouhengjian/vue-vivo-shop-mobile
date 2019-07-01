<template>
    <div class="welcome">
        <!-- Swiper -->
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="/img/wel-ad1.jpg" alt="" width="100%" height="100%">
                </div>
                <div class="swiper-slide">
                    <img src="/img/wel-ad2.jpg" alt="" width="100%" height="100%">
                </div>
                <div class="swiper-slide">
                    <img src="/img/wel-ad3.jpg" alt="" width="100%" height="100%">
                </div>
                <div class="swiper-slide lastAd">
                    <img src="/img/wel-ad1.jpg" alt="" width="100%" height="100%">
                    <router-link to='/home'><van-button plain type="danger">进入首页</van-button></router-link>
                </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
        </div> 
    </div>
</template>

<script>
export default {
    mounted() {
        new Swiper('.swiper-container', {
            pagination: {
                el: '.swiper-pagination',
            },
        })
    },
    created(){
        if(localStorage.One){
            this.$router.push("/ad");
        }else{
            localStorage.One = true;
        }
    }
}
</script>

<style lang="scss">
.welcome{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .swiper-container {
        width: 100%;
        height: 100%;
        .swiper-wrapper{
            .swiper-slide {
                text-align: center;
                font-size: 18px;
                background: #fff;
            }
            .lastAd{
                position: relative;
                a{
                    display: block;
                    position: absolute;
                    top:15px;
                    right: 15px;
                    .van-button {
                        border-radius:20px;
                        border: 1px solid #ccc;
                    }
                }
            }
        }
        .swiper-pagination{
            color: red;
        }
    }
}
</style>
