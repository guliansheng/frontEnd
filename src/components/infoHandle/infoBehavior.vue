<template>
    <div id="behavior">
        <div class="searchWrap">
            <search placeholder="输入扣分对象、违规类型" @search='search'/>
        </div>  
        <div class="behaviorContent">
            <div class="tableWrap">
                <table class="behaviorTable">
                    <thead>
                        <tr>
                            <th>创建时间</th>
                            <th>关联</th>
                            <th>扣分对象</th>
                            <th>违规类型</th>
                            <th>扣分分值</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in tableList" :key="item.deductScoreId">
                            <td>{{item.createTime}}</td>
                            <td>
                                <div class="imgWrap" 
                                    @click="Link(item.deductId,item.deductTypeId)">
                                    <img src="~imgs/operative/link.png" alt="link" >
                                </div>
                            </td>
                            <td>{{item.employeeNickname}}</td>
                            <td>{{item.illegalType}}</td>
                            <td>{{item.score}}</td>
                            <td>
                                <span @click="openDetail(item)">查看</span>          
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pagination" v-show="tableList.length>0">
               <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="prev, pager, next,total,  jumper"
                :total="total">
                </el-pagination> 
            </div>
            <div class="no-result" v-show="tableList.length === 0">
                暂无数据
            </div>
        </div>
        

    </div>
</template>

<script>
// 行为分信息
import Search from '@/base/search.vue'
import {mapMutations} from 'vuex'
// 行为分信息没有弄完
export default {
    created(){
        this.init();
    },
    data(){
        return{
            tableList:[],
            currentPage:1,
            total:10,
            query:'',
            pageSize:20,
        }
    },
    methods:{
        ...mapMutations({
            setInfo:'SET_INFO'
        }),
        init(page=1,query){
            let params={
                page,
                count:this.pageSize,
            }
            if(query){
                params.search=query;
            }
            this.$api.getDeductScoreList(params)
             .then(res =>{
                 if(res.data){
                    this.tableList=res.data.list;
                    this.total=res.data.total;
                 }
             })
        },
        handleCurrentChange(value){
            this.init(value,this.query);
        },
        Link(id,type){  //关联跳转

            if(type === 1){  //1 举报
                let {href} = this.$router.resolve({path: `/infoHandle/tipDetail?id=${id}`});
                window.open(href, '_blank');
            }
            else if(type === 2){ //投诉
                let {href} = this.$router.resolve({path: `/infoHandle/complainDetail?id=${id}`});
                window.open(href, '_blank');
            }else if(type === 3){ //纠纷
                let {href} = this.$router.resolve({path: `/infoHandle/disputeDetail?id=${id}`});
                window.open(href, '_blank');
            }    
        },
        openDetail(item){ //查看详情
            this.setInfo(item);
            this.$router.push('/infoHandle/behaviorDetail');
        },
        search(query){ 
            this.query=query;
            this.init(1,query);
        }

    },
    components:{
        Search,
    }
}
</script>

<style lang='scss'>

#behavior{
    padding: 0 42px;
    .searchWrap{
        margin-bottom: 20px;
    }
    .tableWrap{  
        .behaviorTable{
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
                td:nth-child(2),td:nth-child(3){
                    cursor: pointer;
                    transition: all .5s;
                    &:hover{
                        transform: translateX(2px);
                    }
                }
                td:last-child{
                    color: #15C3F9;
                    cursor: pointer;
                    &:hover{
                        color:#409EFF; 
                    }
                }
            }
        }

    }




}

</style>
