<template>
    <div id="tip">
        <div class="searchWrap">
            <search
            ref='search'
            @search='getQuery'
            placeholder='输入被举报者、举报类型'/>
        </div>
        <div class="tableWrap">
          <table class="recordTable">
            <thead>
              <tr>
                <th>创建时间</th>
                <th>链接</th> 
                <th>举报人</th>
                <th>被举报者</th>
                <th>举报内容</th>
                <th>举报类型</th>
                <th>详情</th>
                <th>扣分</th>
                <th>状态</th>
                <th>
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="0">未处理</el-dropdown-item>
                            <el-dropdown-item command="1">已处理</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in tableList" :key="index">
                <td>{{item.createTime}}</td>
                <td><a :href="item.url">{{item.url}}</a></td>
                <td>{{item.reportName}}</td>
                <td>{{item.exposeName}}</td>
                <td>{{item.comment}}</td>
                <td>{{item.type}}</td>
                <td>{{item.info}}</td>
                <td>{{item.illegalScore}}</td>
                <td>{{item.statusString}}</td>
                <td>
                    <a href="javascript:;" 
                        v-show="item.status === 0" 
                        @click="showDetail(item.id)">处理</a>
                    <a href="javascript:;" 
                      v-show="item.status === 1"
                      @click="showDetail(item.id)">查看</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination" v-show="tableList.length>0">
             <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                background
                :page-size="pageSize"
                layout="prev, pager, next,total,jumper"
                :total="total">
            </el-pagination>
        </div>
        <div class="no-result" v-show="tableList.length === 0">
            暂无数据
        </div>
    </div>
</template>

<script>
//信息管理  => 举报信息
import Search from '@/base/search'
export default {
    created(){
        if(this.$route.query.nickname){   
            this.$nextTick(()=>{
                this.$refs.search.setQuery(this.query);
            })
            this.query=this.$route.query.nickname;
            this.init(1,this.query);
            return 
        }
        if(this.$route.query.status){
            this.handleCommand(0);
            return 
        }
        this.init();
    },
    data(){
        return{
            tableList:[], 
            total:0, 
            query:'',  
            currentPage:1, //当前页     
            status:'', 
            pageSize:20,  
        }
    },
    methods:{
        init(page = 1,search,status){  
            let params={
                page,
                count:this.pageSize,
            }
            if(search){
                params.search=search;
            }
            if(status == 0 || status == 1){
                params.status=status;
            }
            this.$api.getExposeList(params)
            .then(res =>{
                this.tableList=res.data.list;
                this.total=res.data.total;
            })
        },
        showDetail(id){
            this.$router.push({
                path:'/infoHandle/tipDetail',
                query:{id}
            });
        },
        getQuery(val){

            this.query=val;
            this.currentPage=1;
            this.status=""; //重置
            
            this.init(1,val);
        },
        handleCurrentChange(val){ //点击分页 
            this.init(val,this.query,this.status);
        },
        handleCommand(val){
            this.status=parseInt(val);
            this.currentPage=1;
            this.init(1,this.query,val);
        }
    },
    components:{
        Search
    }


}
</script>

<style lang='scss' scoped>
#tip{
  padding: 0 16px;
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
        tr{
            line-height: 36px;
            td:nth-child(2),td:nth-child(7){
                padding-right: 20px;
                max-width: 160px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;  
            }
        }
      }
    }

  }
  .pagination{
    margin-top: 20px;
  }

}


</style>
