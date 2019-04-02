<template>
    <div id="operative-info" class="clearfix">
        <div class="siderBar fl">
             <ul class="sideList">
                <router-link to='/infoHandle/complain'  class="nav-item" tag='li'>投诉管理</router-link>
                <router-link to='/infoHandle/feedBack' class="nav-item" tag='li'>意见反馈</router-link>
                <router-link to='/infoHandle/dispute' class="nav-item" tag='li'>纠纷处理</router-link>
                <router-link to='/infoHandle/tip' class="nav-item" tag='li'>举报信息</router-link>
                <router-link to='/infoHandle/behavior' class="nav-item" tag='li'>行为分信息</router-link>
                <router-link to='/infoHandle/qualification' class="nav-item" tag='li'>增票资质</router-link>
                <router-link to='/infoHandle/replaceMaker' class="nav-item" tag='li'>更换创客</router-link>
            </ul>
        </div>
        <div class="platform-view fl">
            <router-view/>
        </div>
    </div>
</template>

<script>
//信息处理
export default {
    data(){
        return{
        }
    },
    methods:{
       
   
    }

}
</script>

<style lang='scss' scoped>
#operative-info{
    height: 800px;
    .siderBar{
        width: 200px;
        height: 100%;
        border: 1px solid #e3e3e3;
        padding-top: 40px;
        .nav-item{
            line-height: 30px;
            text-indent: 16px;
            font-size: 14px;
            color: #434444;
            padding-left: 22px;
            cursor: pointer;
            &.router-link-active{
                color: #1BC2F6;
            }  
        }
    }
    .platform-view{
        width: calc(100% - 200px);
    }
}


</style>
