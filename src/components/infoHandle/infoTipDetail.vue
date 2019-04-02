<template>
    <div id="tipDetail">
        <back :func="back"/>
        <div class="info">
            <p class="infoItem">
                <span class="txt">创建时间：</span>
                <span class="val">{{info.createTime}}</span>
            </p>
            <p class="infoItem">
                <span class="txt">链接：</span>
                <span class="val">
                    <a :href="info.url">{{info.url}}</a>
                </span>
            </p>
            <p class="infoItem">
                <span class="txt">被举报者：</span>
                <span class="data">{{info.exposeName}}</span>
            </p>
            <p class="infoItem">
                <span class="txt">举报内容：</span>
                <span class="val">{{info.comment}}</span>
            </p>
            <p class="infoItem">
                <span class="txt">举报类型：</span>
                <span class="val">{{info.type}}</span>
            </p>
            <p class="infoItem itemDetails">
                <span class="txt">详情：</span>
                <span class="val">{{info.info}}</span>
            </p>
             <div class="infoItem itemPic">
                <span class="txt">图片：</span>
                <div class="imgWrap">
                    <ul class="picList clearfix">
                        <li class="picItem" 
                        @click="showPic(info.img1)"
                        v-show="info.img1">
                            <img :src="info.img1" alt="pic" />
                        </li>
                        <li class="picItem"
                        @click="showPic(info.img2)" 
                        v-show="info.img2">
                            <img :src="info.img2" alt="pic">
                        </li>
                        <li class="picItem" 
                        @click="showPic(info.img3)"
                        v-show="info.img3">
                            <img :src="info.img3" alt="pic" >
                        </li>
                    </ul>              
                </div>
                <span class="val" v-show="!info.img1 && !info.img2 && !info.img3">暂无图片</span>
            </div>
            <p class="infoItem status">
                <span class="txt">状态：</span>
                <span class="val">{{info.statusString}}</span>
            </p>
            <!-- 已处理(status 为状态已处理 illegal为已通过) -->
            <div class="handled" v-show="info.status === 1 && info.illegal">
                <p class="infoItem ">
                    <span class="txt">违规类型：</span>
                    <span class="val">{{info.illegalType}}</span>
                </p>
                 <p class="infoItem ">
                    <span class="txt">行为扣分：</span>
                    <span class="val">{{info.illegalScore}}</span>
                </p>
                 <p class="infoItem ">
                    <span class="txt">备注说明：</span>
                    <span class="val">{{info.illegalComment}}</span>
                </p>
            </div>
            <!-- 审核了但未通过 -->
            <p class="infoItem" v-show="info.status === 1 && !info.illegal">
                <span class="txt">审核结果：</span>
                <span class="val">未通过</span>
            </p>

        </div>
         <!-- 未处理 -->
        <div class="notHandled" v-show="info.status === 0">
            <div class="btnWrap">
                <button class="pass btn" @click="dialogVisible = true">审核通过</button>
                <button class="refuse btn" @click="refuse">审核不通过</button>
            </div>
        </div>   
        <!-- 确认审核通过弹框 -->
        <div class="dialogWrap">
            <el-dialog 
                title="审核通过"
                :visible.sync="dialogVisible" width='693px'>
                <div class="dialogContent">
                    <div class="item clearfix">
                        <span class="txt">违规类型：</span>
                        <div class=" "><illegal-type @change="getType"/></div>
                    </div>
                    <div class="item clearfix">
                        <span class="txt">行为扣分：</span>
                        <div class="selectWrap">
                            <illegal-score @change="getScore"/>
                        </div>
                    </div>
                    <div class="item clearfix">
                        <span class="txt">备注说明：</span>
                        <div class="textAreaWrap">
                            <textarea class="comment" v-model="comment"/>
                        </div>
                    </div>       
                    
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="pass">提交</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="picView">
            <pic-view :src='src' ref='pic'/>
        </div>
    </div>
</template>

<script>
// 信息处理 => 举报信息  => 举报信息详情
import Back from '@/base/back'
import IllegalScore from '@/base/selectIllegalScore.vue'
import IllegalType from '@/base/selectIllegalType.vue'
import PicView from '@/base/picView.vue'
export default {
    created(){
        let id =this.$route.query.id;
        if(!id){
            this.$router.push('/infoHandle/tip');     
        }else{
            this.id=id;
            this.init();
        }
    },
    data(){
        return{
            dialogVisible:false,
            id:'',
            illegalType:'',
            illegalScore:'',
            comment:'',
            info:{},
            src:'', //预览图片
        }
    },
    methods:{
        init(){
            let params={
                id:this.id,
            }
            this.$api.getExposeInfo(params)
            .then(res =>{
                this.info=res.data;
            })

        },
        refuse(){  //拒绝举报
             this.$confirm('确认审核不通过吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let params={
                    id:this.id,
                    exposeResult:0,
                }
                this.$api.submitExposeResult(params)
                .then(res =>{
                    this.init();
                    this.$notify({
                        type:'success',
                        message:res.msg,
                    })                  
                })

            }).catch(()=>{

            })
        },
        pass(){ //通过举报
            
            //非空验证
            if(!this.illegalType){
                this.$notify({
                    type:'warning',
                    message:'请选择违规类型'
                })
                return 
            }else if(!this.illegalScore && this.illegalScore !== 0){
                this.$notify({
                    type:'warning',
                    message:"请选择行为扣分"
                })
                return 
            }else if(!this.comment){
                this.$notify({
                    type:'warning',
                    message:'备注说明不能为空'
                })
                return 
            }

            let params={
                exposeResult:1, 
                id:this.id,
                illegalComment:this.comment,
                illegalType:this.illegalType,
                score:this.illegalScore
            }
            
            this.$api.submitExposeResult(params)
            .then(res =>{
                this.dialogVisible=false;
                this.init();
                this.$notify({
                    type:'success',
                    message:res.msg
                })
                
            })

        },
        getType(val){ //获取违规类型
            this.illegalType=val;
        },
        getScore(val){ //获取扣分
            this.illegalScore=val;
        },
        showPic(src){  //查看图片
            this.src=src;
            this.$refs.pic.show();
        },
        back(){
            this.$router.push('/infoHandle/tip');
        }       
    },
    components:{
        Back,
        IllegalScore,
        IllegalType,
        PicView,
    }

}
</script>

<style lang='scss' scoped>
#tipDetail{
    padding:0 26px;
    .info{
        padding: 34px 44px;
        color: #4B4B4B;
        font-size: 14px;
        .infoItem{
            line-height: 44px;
            .txt{
                display: inline-block;
                width: 70px;
                text-align: right;
                margin-right: 8px;
            }
            .val{
                display: inline-block;
            }
            .imgWrap{
                display: inline-block;
                .picItem{
                    float: left;
                    margin-right: 10px;
                    transition: all .5s;
                    cursor: pointer;
                    img{
                        width: 63px;
                        height: 60px;
                    }     
                    &:hover{
                        transform: translateY(-5px)
                    }
                }         
            }
            &.status{
                .val{
                    color: #1ABAEC;
                }
                
            }
            &.itemDetails{
                // margin-bottom: 12px;
                .txt{
                    vertical-align: top;
                    line-height: 1.8;
                }
                .val{
                    vertical-align: top;
                    max-width:1200px;
                    width: 80%;
                    line-height: 1.8;
                }
            }
        }    
    }
    .notHandled{
        .btnWrap{
            width: 300px;
            margin: 0 auto;
            .btn{
                width: 91px;
                height: 30px;               
                &.pass{
                    background-color: #00C2FF;
                    color: #fff;
                    margin-right: 6px;
                }
                &.refuse{
                    background-color: #fff;
                    color: #727272;
                    border:1px solid  #727272;
                }
            }

        }

    }
    .dialogContent{
        padding: 20px 60px;
        .item{
            margin: 10px 0;
            .txt{
                float: left;
                width: 70px;
                text-align: right;
                margin-right: 40px;

            }
            .selectWrap,.textAreaWrap{
                float: left;

            }
            .comment{
                width: 363px;
                height: 143px;
                border: 1px solid #C6C6C6;
            }

        }

    }
    
}

</style>
