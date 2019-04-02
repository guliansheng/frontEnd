<template>
    <div id="complainDetail">
        <back :func="back" />
        <div class="wrap">
            <ul class="infoList">
                <li  class="infoItem">
                    <span class="infoName">投诉受理日期:</span>
                    <span class="info">{{info.createTime}}</span>
                </li>
                <li class="infoItem">
                    <span class="infoName">投诉单号:</span>
                    <span class="info">{{info.complainId}}</span>
                </li>
                <li class="infoItem">
                    <span class="infoName">投诉人:</span>
                    <span class="info">{{info.customerName}}</span>
                </li>
                <li class="infoItem">
                    <span class="infoName">投诉类型:</span>
                    <span class="info">{{info.complainType}}</span>
                </li>
                <li class="infoItem infoDetail">
                    <span class="infoName">投诉详情:</span>
                    <span class="info detail">{{info.comment}}</span>
                </li>
                <li class="infoItem">
                    <span class="infoName">附件:</span>
                    <div class="info">
                        <span v-show="info.img1" class="img" @click="showPic(info.img1)">
                            图片
                        </span>
                        <span v-show="info.img2" class="img" @click="showPic(info.img2)">
                            图片
                        </span>
                        <span  v-show="info.img3" class="img" @click="showPic(info.img3)">
                            图片
                        </span>
                        <em class="info-no-result" v-show="!info.img1 && !info.img2 && !info.img3">    
                            暂无附件
                        </em>
                    </div>
                    
                </li>
                <li class="infoItem">
                    <span class="infoName">违规类型:</span>
                    <span class="info" v-show="info.illegalType">{{info.illegalType}}</span>
                    <span class="info" v-show="!info.illegalType">-</span>
                    
                </li>
                <li class="infoItem">
                    <span class="infoName">行为扣分:</span>
                    <span class="info" v-show="info.illegalScore">{{info.illegalScore}}</span>
                    <span class="info" v-show="!info.illegalScore">-</span>
                </li>
                <li class="infoItem">
                    <span class="infoName">最新进度:</span>
                    <span class="info">{{info.statusDesc}}</span>
                </li>
            </ul>
        </div>
        <div class="history">
            <p class="title">历史记录：</p>
            <table class="historyTable">
                <thead>
                    <tr>
                        <th>操作人</th>
                        <th>时间</th>
                        <th>操作类型</th>
                        <th>备注</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in info.complainLogList" :key='item.id'>
                        <td>{{item.logUserName}}</td>
                        <td>{{item.createTime}}</td>
                        <td>{{item.logType}}</td>
                        <td>{{item.remarks}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="btnWrap" v-show="info.status == 2">
                <button class="btn btnJudge" @click="showJudgeDialog">投诉成立</button>
                <button class="btn btnJudge" @click="judge(0)">投诉无效</button>
                <button class="btn btnBack" @click="$router.back()">返回</button>
            </div>

        </div>
        <div class="dialog">
            <el-dialog title="投诉成立信息处理" :visible.sync="dialogVisible" width="540px">
                 <el-form  label-width="80px" :model="resultData" class="form">
                    <el-form-item label="违规类型">
                        <el-select v-model="resultData.illegalType" placeholder="请选择">
                            <el-option
                                v-for="item in resultData.illegalTypeOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="行为扣分">
                        <el-select v-model="resultData.score" placeholder="请选择">
                            <el-option
                                v-for="item in resultData.scoreOptions"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注说明">
                        <el-input v-model="resultData.illegalComment"  type="textarea"></el-input>
                    </el-form-item>
                </el-form>


                 <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="judge(1)">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="showPic">
            <pic-view :src='src' ref='picView'></pic-view>
        </div>

        
    </div>
    
</template>

<script>
// 信息处理=>投诉管理=>详细信息
import PicView from '@/base/picView.vue'
import Back from '@/base/back'
export default {
    created(){
        this.id = this.$route.query.id;

        if(!this.id){
            this.$router.push('/infoHandle/complain');
            return 
        }

        this.init();
    },
    data(){
        return{
            dialogVisible:false,
            judgeRadio:'',
            id:'', 
            info:{},
            src:"", //附件 查看图片地址
            resultData:{   //处理结果
                illegalTypeOptions:[],
                scoreOptions:[
                    {value:3},
                    {value:6},
                    {value:12},
                    {value:24},
                ],
                illegalType:"",
                score:"",
                illegalComment:"",



            },  

        }
    },
    methods:{
        init(){
            let params={
                complainId:this.id
            }
            //获取详情
            this.$api.getComplainDetailInfo(params)
                .then(res =>{
                    if(res.data){
                        this.info=res.data;
                    }
                })
        },
        showPic(src){ //附件 图片展示
            this.src=src;
            this.$refs.picView.show();
        },
        showJudgeDialog(){  //显示投诉成立面板

             //获取违规类型
            this.$api.getIllegalTypeList()
                .then(res =>{
                    this.resultData.illegalTypeOptions=res.data;

                    this.dialogVisible=true;
                })

        },
        judge(complainResult){ //投诉是否成立

            // status == 2 的时候 可以判定投诉
            let params={
                complainId:this.id,
                complainResult,
            };

            if(complainResult === 0){ //如果投诉判定无效
                 this.$confirm('确认该投诉判定无效吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this._submitComplainResult(params);                    
                    }).catch(() => {
                        return 
                    });
            }else if(complainResult === 1){ //如果判定投诉有效 进入这个   无效不进入

                params.illegalComment =this.resultData.illegalComment;
                params.illegalType =this.resultData.illegalType;
                params.score =this.resultData.score;

                this._submitComplainResult(params);
            }

        },
        _submitComplainResult(params){
            this.$api.submitComplainResult(params)
                .then(res =>{
                    if(res.code === 0){
                        this.dialogVisible=false;
                        this.init();

                        this.$notify({
                            title:"成功",
                            message:res.msg,
                            type:"success"
                        })
                    }
                })
        },
        back(){
            this.$router.push('/infoHandle/complain')
        }
    },
    components:{
        PicView,
        Back,
    }


}
</script>

<style lang='scss' scoped>
#complainDetail{
    padding: 26px 54px;
    .back{
        margin-bottom: 26px;
        font-size: 14px;
        color: #656565;
        cursor: pointer;
    }
    .wrap{
        // width: 1000px;
        max-width: 1200px;
        padding-right: 60px;
        border: 1px solid #EAEAEA;
        .infoList{ //ul
            padding: 20px 10px;
            .infoItem{  //li
                line-height: 40px;
                font-size: 14px;
                color: #5D5D5D;
                &.infoDetail{
                    .infoName{
                        vertical-align: top;
                    }
                }

                .infoName{
                    display: inline-block;
                    width: 136px;
                    text-align: right;
                    margin-right: 14px;                          
                }               
                .info{
                    display: inline-block;
                    .img{
                        color: #16AEFE;
                        cursor: pointer;
                        margin-right: 4px;
                        &:hover{
                            color: #176FD1;
                        }
                    }

                    
                }
                .detail{
                    max-width: 900px;
                }
                

            }

        }       
    }
    .history{
        margin-top: 30px;
        .title{
            font-size: 14px;
            color:#414141;
            margin-bottom: 15px;
        }
        .historyTable{
            width: 900px;
            font-size: 14px;
            color: #414141;
            thead{
                text-align: left;
                border-bottom: 1px solid #E3E3E3;
                border-top: 1px solid #E3E3E3;
                th{
                    line-height: 36px;
                    font-weight: normal;
                    // text-indent: 10px;
                }

            }
            
        }
        .btnWrap{
            width: 900px;
            margin-top: 80px;
            text-align: center;
            .btn{
                width: 89px;
                height: 31px;
                cursor: pointer;
            }
            .btnJudge{
                background-color: #16AEFE;
                color: #fff;
                font-size: 14px;
                margin-right: 20px   
            }
            .btnBack{
                background-color: #fff;
                color: #ACACAC;
                border:1px solid #ECECEC;
            }

        }

    }
    .dialog{
        .form{
            width: 420px;
            margin: 0 auto;
        }

    }

}

</style>
