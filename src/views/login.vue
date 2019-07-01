<template>
    <div class="login">
        <van-nav-bar
            title="登录"
            left-arrow
            @click-left="back"
        />
        <van-cell-group>
            <van-field
                v-model="username"
                required
                clearable
                label="用户名"
                right-icon="question-o"
                placeholder="请输入用户名"
                rows="1"
                autosize
                @click-right-icon="$toast('提示：1+1=？')"
            />
            <van-field
                v-model="password"
                type="password"
                label="密码"
                rows="1"
                autosize
                placeholder="请输入密码"
                required
            />
        </van-cell-group>
        <van-row>
            <van-col offset="6" span="12">
                <van-button type="primary" size="large" @click="login">登录</van-button>
            </van-col>
        </van-row>
        
        
    </div>
</template>

<script>
import { Toast } from 'vant';
import { mapState,mapMutations,mapGetters,mapActions } from 'vuex';
export default {
    data(){
        return {
            username:'admin',
            password:'123456'
        }
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
        login(){ 
            // axios.post() 不支持请求本地json文件？？？
            this.$axios.get("/users.json").then(res=>{
                if(res.status!=200){
                    Toast.fail('登录失败！')
                }else{
                    res.data.usersList.forEach(item => {
                        // 账号密码相同，登录成功
                        if(item.username===this.username && item.password===this.password){
                            // 设置Vuex登录标志为true，默认userLogin为false
                            this.$store.dispatch("userLogin", true);
                            //Vuex在刷新的时候userLogin会回到默认值false，所以我们需要用到HTML5储存(sessionStorage)
                            //在sessionStorage中设置一个名为Flag，值为isLogin的字段，作用是如果Flag有值且为isLogin的时候，证明用户已经登录了。
                            sessionStorage.setItem("loginInfo",JSON.stringify({id:1,username:this.username,Flag:"isLogin"}))
                            Toast.success('登录成功')
                            //登录成功后跳转到指定页面
                            this.$router.push("/my")
                            return
                        }else{
                            Toast.fail('账号或密码错误！')
                        }
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
        }  
    },
}
</script>

<style lang="scss">
.login{
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .van-cell-group{
        width: 90%;
        margin: 4rem auto 1rem;
    }
}

</style>

