<template>
    <div>
        <br>
        <br>
        <br>
        <h1>广告位招租</h1>
        <h2>电话：13800138000</h2>
        <h2 style="font-size:50px;">{{num}}</h2>
    </div>
</template>
<script>
import { setTimeout, setInterval, clearInterval } from 'timers';
export default {
    data() {
        return {
            num:3,
            cleardata:null
        }
    },
    created(){
        this.cleardata = setInterval(()=>{
            if(this.num == 0){
                this.$router.push("/home");
            }else{
                this.num--;
            }
        },1000)
    },
    beforeDestroy(){  //销毁数据与方法
        clearInterval(this.cleardata);
    }
}
</script>
<style lang="scss">
h2,
h1{
    text-align: center
}
</style>

