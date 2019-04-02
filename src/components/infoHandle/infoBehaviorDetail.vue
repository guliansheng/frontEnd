<template>
    <div id="behaviorDetail">
        <back />
        <div class="info" v-show="info">
            <p class="item">
                <span class="txt">创建时间：</span>
                <span class="value">{{info.createTime}}</span>
            </p>
            <!-- 举报 -->
            <p class="item" v-show="info.exposeId">
                <span class="txt">关联举报：</span>
                <span class="value">
                    <img src="~imgs/operative/link.png" 
                        @click="Link(info.exposeId,'expose')"
                    alt="link">
                </span>
            </p>
            <p class="item" v-show="info.complainId">
                <span class="txt">关联投诉：</span>
                <span class="value">
                    <img src="~imgs/operative/link.png" 
                        @click="Link(info.complainId,'complain')"
                    alt="link">
                </span>
            </p>
            <p class="item">
                <span class="txt">扣分对象：</span>
                <span class="value">{{info.employeeNickname}}</span>
            </p>
            <p class="item">
                <span class="txt">违规类型：</span>
                <span class="value">{{info.illegalType}}</span>
            </p>
            <p class="item">
                <span class="txt">行为扣分：</span>
                <span class="value">{{info.score}}</span>
            </p>
            <p class="item">
                <span class="txt">备注说明：</span>
                <span class="value">{{info.comment}}</span>
            </p>

        </div>
    </div>
    
</template>

<script>
import Back from '@/base/back.vue'
import {mapGetters} from 'vuex'
export default {
    created(){

    },
    mounted(){
        if(!this.info){
            this.$router.push('/infoHandle/behavior');
        }
    },
    data(){
        return{

        }
    },
    methods:{
        Link(id,type){  //关联跳转
            //关联举报
            if(type === 'expose'){
                let {href} = this.$router.resolve({path: `/infoHandle/tipDetail?id=${id}`});
                window.open(href, '_blank');
            }
            //关联投诉
            else if(type =='complain'){
                let {href} = this.$router.resolve({path: `/infoHandle/complainDetail?id=${id}`});
                window.open(href, '_blank');
            }    
        },

    },
    computed:{
        ...mapGetters([
            'info'
        ])
    },
    components:{
        Back,
    }

}
</script>

<style lang='scss' scoped>
#behaviorDetail{
    padding: 14px 25px ;
    .info{
        padding-top: 30px;
        .item{
            font-size: 14px;
            color: #4B4B4B;
            line-height: 60px;
            text-indent: 46px;
            .txt{
                // width: 120px;
                // display: inline-block;
                // text-align: left;
                // font-size: 14px;
                // margin-right: 20px;

            }
            .value{
                img{
                    vertical-align: middle;
                }
                // display: inline-block;
                // font-size: 14px;

            }
        }

    }

}



</style>

