<template>
    <div id="dispute">
        <div class="searchWrap">
            <search placeholder='输入发起人,对象' @search='getQuery'/>
        </div>
        <div class="control">
            <button class="btn" @click="$router.push('/infoHandle/newDispute')">新增</button>
        </div>
        <div class="tableWrap">
          <table class="recordTable">
            <thead>
              <tr>
                <th>创建时间</th>
                <th>提出者</th>
                <th>对象</th>
                <th>类型</th>
                <th>
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            状态<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="1">已处理</el-dropdown-item>
                            <el-dropdown-item command="0">未处理</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>          
                </th> 
                <th>详情</th>
                <th>
                    操作
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in tableList" :key="index">
                <td>{{item.createTime}}</td>
                <td>{{item.proposeName}}</td>
                <td>{{item.targetName}}</td>
                <td>{{item.typeDesc}}</td>
                <td>
                    {{item.status ? '已处理' :  '未处理'}}
                </td>
                <td class="comment">{{item.comment}}</td>
                <td>
                    <p v-show="!item.status">
                        <a href="javascript:;"                         
                            @click='confirm(item.id)'>成立</a>
                        <a href="javascript:;"                         
                            @click='cancel(item.id)'>无效</a>
                    </p>
                    
                    <a href="javascript:;" 
                        v-show="item.status" 
                        @click='showDetail(item.id)'>查看处理结果</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="no-result" v-show="tableList.length === 0">
            暂无数据
        </div>
        <div class="pagination" v-show="tableList.length > 0">
             <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                layout="prev, pager, next,total"
                :page-size="pageSize"
                :total="total">
            </el-pagination>
        </div>
        <div class="dialogConfirm">
            <el-dialog
                :visible.sync="dialogConfirmVisible"
                width="605px"
                >
                <div class="dialogContent">
                    <p class="title">确认纠纷成立</p>
                    <div class="type item">
                        <span class="txt">违规类型：</span>
                        <div class="val">
                             <!-- <el-select placeholder="请选择">
                                <el-option
                                v-for="item in typeOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select> -->
                            <select-illegal-type  @change="getIllegalType" ref='illegalType'/>
                        </div>  
                    </div>
                    <div class="score item">
                        <span class="txt">行为分扣除：</span>
                        <div class="val">
                            <select-illegal-score @change="getScore" ref='score' />
                        </div>        
                    </div>
                    <div class="result item">
                        <span class="txt">填写处理结果：</span>
                        <textarea cols="60" rows="10"  class="textarea" v-model="comment"/>
                    </div>
                    

                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="confirmSubmit">提交</el-button>
                    <el-button  @click="dialogConfirmVisible = false">取消</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="dialogCancel">
            <el-dialog
            :visible.sync="dialogCancelVisible"
            width="605px">
                <div class="dialogContent">
                    <p class="title">确认纠纷无效</p>
                    <div class="item">
                        <span class="txt">备注：</span>
                        <textarea cols="60" rows="10"  class="textarea" v-model="cancelComment"/>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogCancelVisible = false">取 消</el-button>
                    <el-button type="primary" @click="cancelSubmit">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
//信息处理 => 纠纷处理
import Search from '@/base/search.vue'
import SelectIllegalType from '@/base/selectIllegalType.vue'
import SelectIllegalScore from '@/base/selectIllegalScore.vue'
export default {  
    created(){
        this.$api.getDisputeTypeList()
        .then(res =>{
            this.typeOptions=res.data;
        })

        if(this.$route.query.status){
            this.handleCommand(0);
            return 
        }
        
        this.init();       
    },       
    data(){
        return{
            tableList:[],          
            dialogConfirmVisible:false,  //成立弹窗
            dialogCancelVisible:false, //无效弹窗
            total:0,
            currentPage:0,
            pageSize:20,
            query:'',
            score:'', //行为分扣除
            type:"", //纠纷类型
            illegalType:'',//违规类型
            typeOptions:[], //纠纷类型的下来框
            id:"", //当前操作的的纠纷id
            comment:'', 
            cancelComment:'', //不成立的备注
            status:'',
        }
    },
    methods:{
        init(page = 1,query,status){
            let params={
                count:this.pageSize,
                page,
            };


            if(query){
                params.search=query;
            }
            if(parseInt(status) === 0 || parseInt(status) === 1){
                params.status=status;
            }


            this.$api.getDisputeList(params)
            .then(res =>{
                this.tableList=res.data.list;
                this.total=res.data.total;
            })

        },
        handleCurrentChange(val){
            this.init(val,this.query,this.status);
        },
        handleCommand(val){
            this.currentPage=1;
            this.status=parseInt(val);

            this.init(1,this.query,val);
        },
        getQuery(val){ 
            this.query=val;
            this.currentPage=1;
            this.status="";

            this.init(1,val);
        },
        getScore(val){
            this.score=val;
        },
        confirm(id){ //成立
            this.id=id;
            this.dialogConfirmVisible=true;

            //重置
            this.comment="";
            // this.illegalType="";

            this.$nextTick(()=>{
                this.$refs.score.setValue("");
                this.$refs.illegalType.setValue("");
            })
             
        },
        cancel(id){  //无效
            this.id=id;
            this.dialogCancelVisible=true;

            this.cancelComment="";
        },
        confirmSubmit(){  //纠纷成立提交
            if(!this.illegalType || !this.comment){
                this.$notify({
                    type:'warning',
                    message:'请补充完整信息'
                })
                return 
            }
            if(!this.score && this.score !== 0){
                this.$notify({
                    type:"warning",
                    message:'请选择扣分情况'
                })
                return 
            }


            let params={
                disputeResult:1,
                id:this.id,
                illegalComment:this.comment,
                illegalScore:this.score,
                illegalType:this.illegalType,
            };
            this.$api.submitDisputeResult(params)
            .then(res =>{
                if(res.code === 0){
                    this.dialogConfirmVisible=false;
                    this.$notify({
                        type:"success",
                        message:res.msg,
                    })
                    this.init(this.currentPage,this.query,this.status); 
                }else{
                    this.$notify.warning(res.msg);
                }
            })
        },
        cancelSubmit(){ //纠纷无效提交
            if(!this.cancelComment){
                this.$notify({
                    type:"warning",
                    message:'请填写备注信息',
                })
                return 
            }

            let params={
                disputeResult:0,
                handleComment:this.cancelComment,
                id:this.id,
            }

            this.$api.submitDisputeResult(params)
            .then(res =>{
                 if(res.code === 0){
                    this.dialogCancelVisible=false;

                    this.$notify({
                        type:"success",
                        message:res.msg,
                    })

                    this.init(this.currentPage,this.query,this.status); 
                }

            })

        },
        showDetail(id){ //查看详情
            this.$router.push({
                path:'/infoHandle/disputeDetail',
                query:{
                    id,
                }
            })
        },
        getIllegalType(val){
            this.illegalType=val;
        }
    },
    components:{
        Search,
        SelectIllegalScore,
        SelectIllegalType,

    }

}
</script>

<style  lang='scss' >
#dispute{
    padding: 0 16px;
    .control{
        margin-top: 10px;
        .btn{

            width: 47px;
            height: 24px;
            color: #fff;
            cursor: pointer;
            background-color: #1DB3F5;
        }
    }
    .tableWrap{
        padding-top: 20px;
        .recordTable{
            width: 100%;
            // text-align: center;
            font-size: 14px;
            color: #848484;
            thead{
                border-bottom: 1px solid #e2e2e2;
                tr{
                    line-height: 30px;
                    th{
                        text-align: left;
                        font-weight: normal;
                    }
                }
            }
            tbody{
                line-height: 30px;
                padding-top: 10px;
                .comment{
                    max-width: 200px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }

    }
    .pagination{
        margin-top: 20px;
    }
    .dialogConfirm,.dialogCancel{  //判定成立
        .dialogContent{
            .title{
                margin-bottom: 40px;
                text-align: center;
                font-size: 16px;
                color: #6B6B6B;
            }
            .item{
                margin:20px 0;
                .txt{
                    display: inline-block;
                    width: 100px;
                    text-align: right;
                    vertical-align: middle;
                }
                .val{
                    display: inline-block;

                }
                .textarea{
                    resize: none;
                    border: 1px solid #e2e2e2;
                }
                &:last-child{
                    .txt{
                        vertical-align: top;
                    }
                }

            }               
        }

    }
    .dialogCancel{

    }


}


</style>
