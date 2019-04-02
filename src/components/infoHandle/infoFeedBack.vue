<template>
    <div id="feedBack">
        <div class="control">
          <span>
            标记状态: 
          </span>  
          <el-select v-model="feedBackStatus" placeholder="请选择" class="markStatus">
            <el-option
              v-for="item in FeedBackStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <button class="btn" @click="search">
            查询
          </button>
        </div> 
        <div class="hasData" v-show="tableList.length>0">      
          <div class="tableWrap">
              <table class="recordTable">
                <thead>
                  <tr>
                    <th>创建时间</th>
                    <th>提交者</th>
                    <th>反馈内容</th>
                    <th>标记为</th>          
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in tableList" :key="index">
                    <td>{{item.createTime}}</td>
                    <td>{{item.userName}}</td>
                    <td>
                      <span class="comment" :title='item.comment'>{{item.comment}}</span>
                    </td>
                    <td>
                      <a class="deal" v-show="item.dealDesc ==='未处理'"
                         @click='handleFeedBack(item.feedbackId)'>
                          确认处理
                      </a>
                      <span class="no-deal" v-show="item.dealDesc !== '未处理'">
                        {{item.dealDesc}}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
          <div class="pagination">
              <el-pagination
                  background
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  layout="prev, pager, next,total,jumper"
                  :page-size="pageSize"
                  :total="total">
              </el-pagination>
          </div>
        </div>
        <div class="no-result" v-show="tableList.length === 0">
          暂无数据
        </div>
    </div> 

</template>

<script>
//信息处理 => 意见反馈
export default {
    created(){
      if(this.$route.query.status){
          this.feedBackStatus=0;
          this.search()
          return 
      }
      this.init()
    },
    data(){
      return{
        tableList:[],
        feedBackStatus:"",  //筛选的值
        FeedBackStatusOptions:[
          {
            value:0,
            label:"未处理",  
          },
          {
            value:1,
            label:"已处理",  
          },
        ],
        total:10,
        pageSize:20,
        currentPage:1,
      }
    },
    methods:{
      init(page=1,status){  //刷新，查询数据

        let params={
          count:this.pageSize,
          page,
        }
        if(status === 0  || status === 1){
          params.status = status;
        }
        this.$api.getFeedbackList(params)
        .then(res =>{
          // console.log(res);
          if(res.data && res.data.list){
            this.tableList=res.data.list;
            this.total=res.data.total;
          }
        })

      },
      handleCurrentChange(val){
        this.init(val,this.feedBackStatus);
      },
      search(){
        this.init(this.currentPage,this.feedBackStatus)
        // console.log(this.FeedBackStatus);
      },
      handleFeedBack(id){ //确认处理

        this.$confirm('确认已处理该反馈吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params={
            feedbackId:id
          }
          this.$api.dealFeedbackInfo(params)
            .then(res =>{
              if(res.code ===0){
                this.init(this.currentPage,this.status);
                this.$notify({
                  title:"成功",
                  message:res.msg,
                  type:"success"
                })
              }
            })
        }).catch(() => {});          
      },


    }

}
</script>

<style lang='scss' scoped>
#feedBack{
  padding: 0 16px;
  .control{
    margin-top: 30px;
    font-size: 14px;
    color: #6B6B6B;
    .btn{
      width: 47px;
      height: 24px;
      padding: 0;
      border: none;
      color: #fff;
      outline: none;
      background-color: #1DB3F5;
      cursor: pointer;
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
            &:nth-child(4){
              text-align: center;
            }
          }
        }
      }
      
      tbody{
        line-height: 30px;
        padding-top: 10px;
        td{
          .deal{
            color: #1DB3F5;
            cursor: pointer;
            &:hover{
              text-decoration: underline;
            }
          }
          &:nth-child(1){
            width: 200px;
          }
          &:nth-child(2){
            width: 140px;
          }
          &:nth-child(3){
            max-width: 200px;
            padding-right: 20px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            .comment{
              max-width: 200px;
              padding-right: 20px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;          
            }
          }
          &:nth-child(4){
            text-align: center;
          }
 
        }
      }
    }
  }
  .pagination{
    margin-top: 20px;
  }
  .no-result{
    margin-top: 20px;
    font-size: 14px;

  }
}

</style>
<style lang='scss'>
#feedBack{
  .markStatus{
    .el-input__inner{
      width: 100px;
      height:30px;
    }
    .el-input__icon{
      line-height:30px;
    }

  }
  
}

</style>

