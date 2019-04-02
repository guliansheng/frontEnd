<template>
    <div id="complain">
        <div class="searchWrap">
           <input type="text" 
                placeholder="输入订单号、发起人、被投诉方" 
                class="searchInput" 
                v-model="query"
                @keyup.enter="search"
                >
           <button class="btn searchBtn" @click="search">搜索</button>
       </div>
        <div class="tableWrap">
          <table class="recordTable">
            <thead>
              <tr>
                <th>发起时间</th>
                <th>投诉单号</th>
                <th>发起人</th>
                <th>被投诉方</th>
                <th>状态</th>
                <th>投诉类型</th>
                <th>
                    <el-dropdown @command="handCommand">
                        <span class="el-dropdown-link">
                            操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <!-- active样式没做 -->
                            <el-dropdown-item  command="0" 
                                :class="{active:status === 0}">处理中</el-dropdown-item>
                            <el-dropdown-item  command="1" 
                                :class="{active:status === 1}">已完成</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </th>
              </tr>
            </thead>
            <tbody  v-show="tableList.length > 0">
              <tr v-for="(item,index) in tableList" :key="index">
                <td>{{item.createTime}}</td>
                <td>{{item.complainId}}</td> 
                <td>{{item.customerName}}</td>
                <td>{{item.employeeName}}</td>
                <td>{{item.statusDesc}}</td> 
                <td>{{item.complainType}}</td>
                <td> 
                    <a v-show="item.status === 2" class="deal" @click="showDetail(item.complainId)">
                        处理
                    </a>
                    <span v-show="item.status !== 2" @click="showDetail(item.complainId)">
                        查看
                    </span>
                </td>  
              </tr>
              
            </tbody>
            <tbody v-show="!tableList.length">
                暂无数据
            </tbody>
          </table>
        </div>
        <div class="pagination" v-show="tableList.length > 0">
             <el-pagination
                background
                layout="prev, pager, next,total,jumper"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
//信息处理 => 投诉管理
export default {
    created(){
        if(this.$route.query.status){
            this.handCommand(0);
            return
        }
        if(this.$route.query.nickname){
            this.query=this.$route.query.nickname;
            this.init(1,this.query);
            return 
        }
        this.init();
    },
    data(){
        return{
            tableList:[],
            status:"", //待处理,已完成
            total:10, //总数量
            currentPage:1, //当前页
            query:"", //搜索框
            pageSize:20,
        }
    },
    methods:{
        init(page=1,query,status){

            let params={
                count:this.pageSize,
                page,
            }
            if(query){
                params.search=query;
            }
            if(status === 0 || status === 1){
                params.status=status;
            }
            this.$api.getComplainList(params)
            .then((res)=>{
                if(res.data && res.data.list){
                    this.tableList=res.data.list;
                    this.total=res.data.total;
                }
            })
        },
        handleCurrentChange(val){  //分页       
            this.init(val,this.query,this.status);
        },
        handCommand(val){  //操作查询
            val=parseInt(val);

            this.status=val;
            this.init(1,this.query,val);
        },
        search(){
            // this.status="";
            this.currentPage=1;
            if(!this.query){
                this.status="";
            }
           
            this.init(1,this.query,this.status);
        },
        showDetail(id){ //查看详情
            this.$router.push({
                path:'/infoHandle/complainDetail',
                query:{
                    id         
                }
            });
        },

    },
    watch:{
        '$route'(to,from){
            this.init();
        }
    }
    
}
</script>
<style lang='scss'>
#complain{
  padding: 0 16px;
  .searchWrap{
    width: 500px;
    margin: 26px auto 0;
    font-size: 0;
    .searchInput{
      width: 363px;
      height: 36px;
      border: 1px solid #e2e2e2;
      outline: none;
      text-indent: 10px;
      font-size: 14px;
      box-sizing: border-box;
      margin-right: 2px;
      
    }
    .searchBtn{
      width: 89px;
      height: 36px;
      background-color: #15C3F9;
      color: #fff;
      border: none;
      padding: 0;
      border-radius: 5px;
      font-size: 14px;
      cursor: pointer;
      outline: none;
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
        .active{
            background-color: #1BC2F6;
        }
      }
      tbody{
        line-height: 30px;
        padding-top: 10px;
        td{
            .deal{
                color: #1BC2F6;
                cursor: pointer;
                &:hover{
                    text-decoration: underline;
                }
            }
            &:last-child{
                cursor: pointer;
                color: #15C3F9;
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


<style lang='scss'>

//这里存在  样式修改问题 暂不管
#complain{
    .operativeList{
             text-align: center;
             line-height: 30px;
            li{
                // line-height:20px;
            }
        }
    .operative{
        .operativeList{
             text-align: center;
             line-height: 30px;
            li{
                // line-height:20px;
            }
        }
        .caret{
            display: inline-block;
            width: 0;
            height: 0;
            border:10px solid #eee;
        }

        
    }
}


</style>
