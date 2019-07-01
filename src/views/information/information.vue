<template>
    <div class="information">
        <van-nav-bar title="新闻信息"></van-nav-bar>
        <div class="MainBody">
            <van-panel 
                v-for="(information,index) in informations" :key="index"
                :title="information.title" 
                :desc="information.time"
                @click="open(information.id)" 
                :id="information.id"
                class="Mainlist">
            <div class="informationImg">
                <img  :src="information.img" alt="图片">
            </div>
            <div slot="footer" class="footer">
                <van-button size="small" type="danger" @click="open(information.id)" > 阅读全文</van-button>
            </div>
        </van-panel>
        </div>
    </div>
</template>

<script>
export default {
    name:"information",
    data(){
        return{
            informations:[]
        }
    },
    mounted(){
        this.getDate()
    },
    methods:{
        getDate(){
            this.$axios.get("/information.json").then((res)=> {
                for (var i = 0; i < res.data.informations.length; i++) {
                    let selData = res.data.informations[i];
                    let part = res.data.informations[i].name;
                    this.informations.push(selData);
                }
            })
        },
        open(id){
            this.$router.push({path:"/news",query:{id:id}})
        },
    }
}
</script>


<style lang="scss">
.information{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    top: 0;
    left: 0;
    background: #F4F4F4;
    overflow-x: hidden;
    overflow-y: auto;
    .MainBody{
        margin-bottom: 50px;
        .Mainlist{
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            .informationImg{
                img{
                    width: 100%;
                    height: 4.7rem;
                }
            }
            .footer{
                position: relative;
                height: 30px;
                .van-button{
                    position: absolute;
                    right: 0;
                }
            }
        }
    }
}


</style>
