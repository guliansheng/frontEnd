<template>
    <div id="disputeDetail">
        <div class="back">
            <back :func='back' title="返回纠纷列表"/>
        </div>
        <ul class="infoList">
            <li class="infoItem">
                <span class="txt">纠纷编号：</span>
                <span class="val">{{info.id}}</span>
            </li>
            <li class="infoItem">
                <span class="txt">创建日期：</span>
                <span class="val">{{info.createTime}}</span>
            </li>
             <li class="infoItem">
                <span class="txt">提出者：</span>
                <span class="val">{{info.proposeName}}</span>
            </li>
             <li class="infoItem">
                <span class="txt">对象：</span>
                <span class="val">{{info.targetName}}</span>
            </li>
             <li class="infoItem">
                <span class="txt">状态：</span>
                <span class="val">{{info.status ? '已处理' :  '未处理'}}</span>
            </li>
             <li class="infoItem">
                <span class="txt">详情：</span>
                <span class="val">{{info.comment}}</span>
            </li>
            <li class="infoItem">
                <span class="txt">判定结果：</span>
                <span class="val result" v-show="!info.handleComment" >成立</span>
                <span class="val fail" v-show="info.handleComment">无效</span>
            </li>
            <li class="infoItem" v-show="info.handleComment">
                <span class="txt">备注：</span>
                <span class="val">{{info.handleComment}}</span>
            </li>
            <li class="infoItem" v-show="!info.handleComment">
                <span class="txt">违规类型：</span>
                <span class="val">{{info.illegalType}}</span>
            </li>

            <li class="infoItem" v-show="!info.handleComment">
                <span class="txt">扣分：</span>
                <span class="val score">{{info.illegalScore}}</span>
            </li>
            <li class="infoItem" v-show="!info.handleComment">
                <span class="txt">处理结果：</span>
                <span class="val">{{info.illegalComment}}</span>
            </li>
            
        </ul>
    </div>
</template>

<script>
// 纠纷
import Back from '@/base/back'
export default {
    created(){
        this.init();
    },
    data(){
        return {
            info:{},
        }
    },
    methods:{
        init(){
            let params={
                id:this.$route.query.id,
            }
            this.$api.getDisputeInfo(params)
            .then(res =>{
                this.info=res.data;
            })
        },
        back(){
           
            this.$router.push('/infoHandle/dispute');
        },
    },
    components:{
        Back,
    }
}
</script>

<style lang='scss'>
#disputeDetail{
    padding: 10px 20px;
    .infoList{
        padding-top: 20px;
        height: 48px;
        line-height: 48px;
        font-size: 14px;
        color: #777777;
        .infoItem{
            .txt{
                display: inline-block;
                width: 88px;
                text-align: right;     
            }
            .result,{
                font-weight: bold;
                color: #f56c6c;
            }
            .score{
                color: #f56c6c;
            }
            .fail{
                font-weight: bold;
            }
        }
    }


}
</style>
