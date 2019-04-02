<template>
    <div id="qualification">
        <div class="searWrap">
            <search 
                placeholder="输入单位名称、纳税人识别号" 
                @search='getQuery'/>
        </div>
        <div class="tableWrap">
            <table class="table">
                <thead>
                    <tr>
                        <th>单位名称</th>
                        <th>纳税人识别号</th>
                        <th>注册地址</th>
                        <th>注册电话</th>
                        <th>开户银行</th>
                        <th>银行账号</th>
                        <th>状态</th>
                        <th>
                            <el-dropdown @command="handleCommand">
                                <span class="el-dropdown-link">
                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="0">未处理 </el-dropdown-item>
                                    <el-dropdown-item command="1">已处理</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in tableList" :key="item.id">
                        <td>
                            {{item.companyName}}
                        </td>
                        <td>
                            {{item.recognitionNum}}
                        </td>
                        <td>
                            {{item.address}} 
                        </td>
                        <td>{{item.tel}}</td>
                        <td>{{item.bank}}</td>
                        <td>{{item.bankNum}}</td>
                        <td>
                            <span v-show="item.status === 0">待审核</span>
                            <span v-show="item.status === 1">审核通过</span>
                            <span v-show="item.status === 2">审核不通过</span>                      
                        </td>
                        <td>
                            <a href="javascript:;" 
                                v-show="item.status === 0"  
                                @click="openDialog(item.id)">审核</a>                        
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="pagination" v-show="tableList.length >0">
                 <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="pageSize"
                    layout="prev, pager, next, total,jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>
        <div class="no-result" v-show="tableList.length === 0 ">
            暂无数据
        </div>
        <div class="checkDialog">
            <el-dialog
                title="确认该单位是否为一般纳税人?"
                :visible.sync="dialogVisible"
                width="28%">
                <span slot="footer" class="dialog-footer">
                    <el-button @click="examine(2)">否，普通纳税人</el-button>
                    <el-button type="primary" @click="examine(1)">是，一般纳税人</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import Search from '@/base/search'
//增票资质
export default {
    created(){
        if(this.$route.query && this.$route.query.status == '未处理'){
            this.status=0;
            this.init(1,"",0);
        }else{
            this.init();
        }
    },
    data(){
        return{
            tableList:[],
            currentPage:1,
            total:0,
            id:-1, //当前操作id
            dialogVisible:false, //审判窗口
            query:'',
            status:'',//已处理，未处理
            pageSize:20,
        }
    },
    methods:{
        init(page =1,query,status){
            let params={
                page,
                count:this.pageSize,  
            }
            if(query){
                params.search=query;
            }
            if(status == 0 || status === 1){
                params.status=status;
            }

            this.$api.getInvoiceAptitudeList(params)
            .then(res =>{
                this.tableList=res.data.list;
                this.total=res.data.total;
            })
        },
        getQuery(val){  //获取搜索结果
            this.query=val;
            this.currentPage=1;
            this.status="";

            this.init(1,val);
        },
        handleCurrentChange(val){ //分页
            this.init(val,this.query,this.status);
        },
        handleCommand(val){
            this.status=parseInt(val);
            this.init(1,this.query,val);
        },    
        openDialog(id){
            this.id=id;
            this.dialogVisible=true;
        },
        examine(status){ //审核
            //1通过,2不通过
            let tip= status  === 1  ? '确认审核通过吗' : '确认审核不通过吗'
            this.$confirm(tip, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let params={
                        id:this.id,
                        status,
                    }
                    this.$api.getAuditingInvoiceAptitude(params)
                    .then(res =>{
                        if(res.code === 0){
                            this.dialogVisible=false;
                            this.$notify.success(res.msg);
                            this.init();
                        }else{
                            this.$notify.warning(res.msg);   
                        }
                    })

                }).catch(() => {});           
        },
    },
    components:{
        Search
    }

}
</script>

<style lang='scss'>
#qualification{
    padding: 0 30px;
    .table{
        width: 100%;
        color: #515151;
        font-size: 12px;
        margin: 20px 0;
        thead{
            height: 40px;
            line-height: 40px;
            background-color: #F5E3E3;

        }
        tbody{
            tr{
                line-height: 60px;
                border-bottom: 1px dashed #707070;
            }

        }

    }

}


</style>
