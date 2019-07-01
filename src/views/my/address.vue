<template>
    <div class="addressInfo">
        <van-nav-bar title="收货地址" left-arrow @click-left="back" />
        <van-address-list
            v-model="chosenAddressId"
            :list="list"
            @add="toAdd"
            @edit="toEdit"
            class="addressList"
        />
        <!-- 添加地址 -->  
        <van-popup v-model="isAdd" position="bottom" :style="{ height: '60%' }">
            <van-address-edit
                :area-list="areaList"
                show-set-default
                show-postal
                save-button-text="保存地址"
                @save="onAdd"
                class="addressChange"
            />
        </van-popup>
        
        <!-- 编辑地址 -->
        <van-popup v-model="isEdit" position="bottom" :style="{ height: '60%' }">
            <van-address-edit
                :area-list="areaList"
                show-postal
                show-delete
                :address-info="addressInfo"
                @save="onEdit"
                @delete="onDelete"
                class="addressChange"
            />
        </van-popup>
        
        <!-- 省市列表 -->
        <van-area :area-list="areaList" value="110101" v-show="isChoose"/>
    </div>
</template>

<script>
import { Toast } from 'vant';
import { AddressEdit } from 'vant';
import { Area } from 'vant';
import { Popup } from 'vant';
import AreaList from '@/lib/area';
export default {
    data() {
        return {
            isAdd: false,
            isEdit: false,
            areaList:AreaList,
            addressInfo:{},
            isChoose:false,
            chosenAddressId: '',
            editId:-1,
            list:[]
        }
    },
    computed: {},
    mounted() {
        this.getData()
    },
    methods: {
        getData(){
            this.$axios.get("/users.json").then((res)=>{
                // 多个用户时，遍历用户组
                res.data.usersList.forEach((item,index)=>{
                    // 匹配当前登录用户
                    if(item.username===JSON.parse(sessionStorage.getItem("loginInfo")).username){
                        this.list=item.addressList
                        // 设置默认地址
                        this.list.forEach((item,index)=>{
                            if(item.isDefault){
                                this.chosenAddressId = item.id
                            }
                        })
                        return 
                    }
                })
            })
        },
        back(){
            this.$router.go(-1)
        }, 
        toAdd() {
            if(this.list.length>=5){
                Toast("最多只能设置五个常用地址")
                return
            }else{
                this.isAdd = true
            }
            
        },
        onAdd(data) {
            (async () => {
                // 新增地址为默认地址，
                if(data.isDefault==true){
                    this.list.forEach((item,index)=>{
                        item.isDefault=false
                        this.chosenAddressId=this.list.length+1
                        return
                    })
                }
                let oneAddress={
                    id:Number(this.list[this.list.length-1].id+1),
                    name:data.name,
                    tel:data.tel,
                    isDefault: data.isDefault,
                    province:data.province,
                    city:data.city,
                    county:data.county,
                    addressDetail:data.addressDetail,
                    postalCode:data.postalCode,
                    areaCode: data.areaCode,
                    address:`${data.province}${data.city}${data.county}${data.addressDetail}`
                }
                
                await this.list.push(oneAddress)
                // console.log(oneAddress)
                this.isAdd=false
            })()
        },
        toEdit(item,index) {
            this.isEdit = true
            this.addressInfo=this.list[index]
            this.editId=index
        },
        onEdit(item){
            this.list[this.editId].name=item.name
            this.list[this.editId].tel=item.tel
            this.list[this.editId].province=item.province
            this.list[this.editId].city=item.city
            this.list[this.editId].county=item.county
            this.list[this.editId].addressDetail=item.addressDetail
            this.list[this.editId].postalCode=item.postalCode
            this.list[this.editId].areaCode=item.areaCode
            this.list[this.editId].address=`${item.province}${item.city}${item.county}${item.addressDetail}`
            this.isEdit=false
        },
        onDelete() {
            this.list.splice(this.editId,1)
            this.isEdit = false
        },
    },
    watch: {
        // 监听chosenAddressId值的变化，点击地址设置为默认地址
        "chosenAddressId":function () {
            this.list.forEach((item,index)=>{
                item.isDefault=false
                if(item.id==this.chosenAddressId){
                    item.isDefault=true
                    return
                    
                }
                console.log(item.isDefault)
                return
            })
        }
    },
}
</script>

<style lang="scss">
.addressInfo{
    position: fixed;
    background: white;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    z-index:99;
    overflow-x: hidden;
    overflow-y: auto;
    .addressList{
        height: auto;
        padding-bottom: 50px;
        .van-address-list__add{
            z-index: 666
        }
    }
    .addressChange{
        height: 100%;
        overflow: hidden;
        position: relative;
        .van-address-edit__buttons{
            padding: 10px 15px;
            width: calc(100% - 30px);
            position: absolute;
            bottom: 0;
            button{
                margin: 10px 0;
            }
        }
    }
}

</style>
