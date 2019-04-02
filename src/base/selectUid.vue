<template>
    <div class="selectedUserByUid">
        <div class="uid">
            <span class="txt">
                <span class="require">*</span>
                请输入用户UID：</span>
            <div class="selectWrap">

                <input type="text" 
                    class="uidInput"
                    @blur="query"
                    @keyup.enter="query"
                    v-model="uid"/>            
            </div>
        </div>
        <div class="userName">
            <span class="txt">姓名：</span>
            <span class="val" v-show="info.nickname">{{info.nickname}}</span>
            <span class="val" v-show="!info.nickname">-</span>
        </div>
        <div class="grade">
            <span class="txt">等级：</span>
            <span class="val" v-show="info.levelDesc">初级</span>
            <span class="val" v-show="!info.levelDesc">-</span>
        </div>
    </div>
</template>

<script>
export default {
    created(){
        
    },
    data(){
        return{
            uid:"",
            info:{},
        }
    },
    methods:{
        query(){
            if (this.uid) {

                let params={employeeId:this.uid};

                this.$api.getInfoByEmployeeId(params)
                    .then(res =>{
                        
                        if(res.code === 1){
                            this.info={};
                            this.$notify({
                                type:"warning",
                                message:res.msg,
                            })

                        }else if(res.code === 0){
                            this.info=res.data;

                        }
                    }) 
                this.$emit('change',this.uid); 

            }            
        },
        clearUid(){
            this.uid="";
            this.info={};   
        }
    }

}
</script>

<style lang='scss' scoped>
.selectedUserByUid{
    .uid,.userName,.grade{
        line-height: 40px;
        .txt{
            width: 120px;
            display: inline-block;
            text-align: right;
            vertical-align: middle;
            font-size: 14px;
            color: #545454;
            .require{
                color: red;
                vertical-align: middle;
            }

        }
    }
    .uid{
        .selectWrap{
            display: inline-block;
            .uidInput{
                border: 1px solid #C8CBD3;
            }
        }
    }

}


</style>
