<template>
    <div class="back">
        <span class="title" @click="handleClick">{{title}}</span>    
    </div>
</template>

<script>
// 头部的返回
export default {
    props:{
        title:{
            type:String,
            default:"返回列表"
        },
        func:{
            type:Function,
        }

    },
    methods:{
        handleClick(){
            if(this.func){
                this.func();
            }else{
                this.$router.back()
            }
        }

    }
}
</script>

<style lang='scss' scoped>
.back{
    line-height: 44px;
    font-size: 14px;
    color: #656565;
    border-bottom:1px solid #DADADA;
    
    .title{
        cursor: pointer;
        &:hover{
            color: #1BC2F6;
        }
    }
}


</style>
