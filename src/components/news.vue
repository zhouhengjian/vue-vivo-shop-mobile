<template>
    <div class="news">
        <van-nav-bar
            title="新闻详情"
            left-arrow
            @click-left="news"
        /> 
        <div class="newsMain" v-for="(news,index) in list">
            <h2 class="newsTitle">{{news.title}}</h2>
            <span class="newsTime">{{news.time}}</span>
            <div style="margin-top: 0.6rem;">
                <div class="newsBox" v-for="box in news.boxs">
                    <p >{{box.p}}</p>
                    <img :src="box.img">
                </div>
            </div>
        </div>
        <div class="newsFooter"></div>
    </div>
</template>
<script>
    export default {
        name:"news",
        data(){
            return{
                list:[]
            }
        },
        mounted(){
            this.getData()
        },
        methods:{
            getData(){
                let id=this.$route.query.id;
                this.$axios.get("/information.json").then((res)=> {
                    for (var i = 0; i < res.data.list.length; i++) {
                        if (res.data.list[i].id == id) {
                            this.list.push(res.data.list[i])
                        }
                    }
                })
            },
            news(){
                this.$router.go(-1)
            }
        },
    }
</script>

<style lang="scss">
.news{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    overflow-x: hidden;
    overflow-y: auto;
    .newsMain{
        margin-top: 0.1rem;
        background: white;
        margin-bottom: 15px;
        .newsTitle{
            width: 282px;
            margin: auto;
            text-align: center;
        }
        .newsTime{
            text-align: center;
            display: block;
            margin-top: 0.1rem;
        }
        .newsBox{
            p{
                width: 90%;
                margin:0 auto;
                padding: 0 15px;
                font-size: 0.43rem;
                line-height: 150%;
                font-family: 微软雅黑, sans-serif;
                margin-top: 0.3rem;
            }
            img{
                width: 9.3rem;
                display: block;
                margin: auto;
            }
        }
    }
}

</style>
