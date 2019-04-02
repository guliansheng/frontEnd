<template xmlns="element-ui">
  <div id="maker">
    <div class="searchWrap">
    </div>
    <div class="tableWarp">
      <el-table
        :data="tableData"
        style="width: 100%"
        @sort-change="sortChange"
      >
        <el-table-column
          prop="orderId"
          label="订单编号">
        </el-table-column>
        <el-table-column
          prop="appforTime"
          label="申请时间"
          sortable='custom'>
        </el-table-column>
        <el-table-column
          prop="customerId"
          label="雇主ID">
        </el-table-column>
        <el-table-column
          prop="customerName"
          label="雇主名称">
        </el-table-column>
        <el-table-column
          prop="formerEmployee"
          label="原创客">
        </el-table-column>
        <el-table-column
          prop="formerEmployeeId"
          label="原创客ID">
        </el-table-column>
        <el-table-column
          prop="newEmployee"
          label="新创客">
        </el-table-column>
        <el-table-column
          prop="newEmployeeId"
          label="新创客ID">
        </el-table-column>
        <el-table-column
          prop="statusDesc"
        >
          <template slot="header" slot-scope="scope" >
            <el-dropdown @command="changeStatus">
              <span class="el-dropdown-link">
                状态<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command='0'>审核中</el-dropdown-item>
                <el-dropdown-item command='1'>审核不通过</el-dropdown-item>
                <el-dropdown-item command='2'>审核通过</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <template slot-scope="scope">
            {{scope.row.statusDesc === 0 ? '待审核' : scope.row.statusDesc === 1 ? '审核不通过' :  '审核通过'}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)" v-if="scope.row.statusDesc === 0">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog width="35%" title="请确认是否确认审核通过" :visible.sync="dialogFormVisible" center>
        <el-form :model="form">
          <el-input rows="10" type="textarea" v-model="form.desc"></el-input>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible = false">审核通过</el-button>
          <el-button @click="dialogFormVisible = false">审核不通过</el-button>
        </div>
      </el-dialog>
      <div class="pagination" v-show="tableData.length > 0">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="page.currentPage"
          layout="prev, pager, next, total, jumper"
          :page-size="page.pageSize"
          :total="page.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import Search from '@/base/search.vue'
  export default {
    data(){
      return {
        query: '',
        tableData: [
          {
          orderId: '345',
          appforTime: '2016-05-04',
          customerId: '45',
          customerName: '王小虎',
          formerEmployee: 'ling',
          formerEmployeeId: '32445',
          newEmployee: 'wang',
          newEmployeeId: '456677',
          statusDesc: 2,
        },{
          orderId: '345',
          appforTime: '2016-05-04',
          customerId: '45',
          customerName: '王小虎',
          formerEmployee: 'ling',
          formerEmployeeId: '32445',
          newEmployee: 'wang',
          newEmployeeId: '456677',
          statusDesc: 0,
        },{
          orderId: '345',
          appforTime: '2016-05-04',
          customerId: '45',
          customerName: '王小虎',
          formerEmployee: 'ling',
          formerEmployeeId: '32445',
          newEmployee: 'wang',
          newEmployeeId: '456677',
          statusDesc: 2,
        },{
            orderId: '345',
            appforTime: '2016-05-04',
            customerId: '45',
            customerName: '王小虎',
            formerEmployee: 'ling',
            formerEmployeeId: '32445',
            newEmployee: 'wang',
            newEmployeeId: '456677',
            statusDesc: 2,
          },{
            orderId: '345',
            appforTime: '2016-05-04',
            customerId: '45',
            customerName: '王小虎',
            formerEmployee: 'ling',
            formerEmployeeId: '32445',
            newEmployee: 'wang',
            newEmployeeId: '456677',
            statusDesc: 2,
          },{
            orderId: '345',
            appforTime: '2016-05-04',
            customerId: '45',
            customerName: '王小虎',
            formerEmployee: 'ling',
            formerEmployeeId: '32445',
            newEmployee: 'wang',
            newEmployeeId: '456677',
            statusDesc: 2,
          },{
            orderId: '345',
            appforTime: '2016-05-04',
            customerId: '45',
            customerName: '王小虎',
            formerEmployee: 'ling',
            formerEmployeeId: '32445',
            newEmployee: 'wang',
            newEmployeeId: '456677',
            statusDesc: 2,
          },{
            orderId: '345',
            appforTime: '2016-05-04',
            customerId: '45',
            customerName: '王小虎',
            formerEmployee: 'ling',
            formerEmployeeId: '32445',
            newEmployee: 'wang',
            newEmployeeId: '456677',
            statusDesc: 2,
          },{
            orderId: '345',
            appforTime: '2016-05-04',
            customerId: '45',
            customerName: '王小虎',
            formerEmployee: 'ling',
            formerEmployeeId: '32445',
            newEmployee: 'wang',
            newEmployeeId: '456677',
            statusDesc: 2,
          },{
            orderId: '345',
            appforTime: '2016-05-04',
            customerId: '45',
            customerName: '王小虎',
            formerEmployee: 'ling',
            formerEmployeeId: '32445',
            newEmployee: 'wang',
            newEmployeeId: '456677',
            statusDesc: 2,
          },{
            orderId: '345',
            appforTime: '2016-05-04',
            customerId: '45',
            customerName: '王小虎',
            formerEmployee: 'ling',
            formerEmployeeId: '32445',
            newEmployee: 'wang',
            newEmployeeId: '456677',
            statusDesc: 2,
          },{
            orderId: '345',
            appforTime: '2016-05-04',
            customerId: '45',
            customerName: '王小虎',
            formerEmployee: 'ling',
            formerEmployeeId: '32445',
            newEmployee: 'wang',
            newEmployeeId: '456677',
            statusDesc: 2,
          },{
            orderId: '345',
            appforTime: '2016-05-04',
            customerId: '45',
            customerName: '王小虎',
            formerEmployee: 'ling',
            formerEmployeeId: '32445',
            newEmployee: 'wang',
            newEmployeeId: '456677',
            statusDesc: 2,
          },{
            orderId: '345',
            appforTime: '2016-05-04',
            customerId: '45',
            customerName: '王小虎',
            formerEmployee: 'ling',
            formerEmployeeId: '32445',
            newEmployee: 'wang',
            newEmployeeId: '456677',
            statusDesc: 2,
          },{
            orderId: '345',
            appforTime: '2016-05-04',
            customerId: '45',
            customerName: '王小虎',
            formerEmployee: 'ling',
            formerEmployeeId: '32445',
            newEmployee: 'wang',
            newEmployeeId: '456677',
            statusDesc: 2,
          },{
            orderId: '345',
            appforTime: '2016-05-04',
            customerId: '45',
            customerName: '王小虎',
            formerEmployee: 'ling',
            formerEmployeeId: '32445',
            newEmployee: 'wang',
            newEmployeeId: '456677',
            statusDesc: 2,
          },{
            orderId: '345',
            appforTime: '2016-05-04',
            customerId: '45',
            customerName: '王小虎',
            formerEmployee: 'ling',
            formerEmployeeId: '32445',
            newEmployee: 'wang',
            newEmployeeId: '456677',
            statusDesc: 2,
          }],
        dialogFormVisible: false,
        form: {
          name: '',
          delivery: false,
          formWidth: '400px'
        },
        order: {},
        status: '',
        page:{
          pageSize: 20,
          total: 100,
          currentPage: 1
        }
      }
    },
    computed: {
    },
    created(){
      this.init();
    },
    methods:{
      init(page = 1,query,status){
        let params={
          count:this.page.pageSize,
          page,
        };

        if(query){
          params.search=query;
        }
        if(parseInt(status) === 0 || parseInt(status) === 1){
          params.status=status;
        }

        this.$api.getChangeEmployeeList(params)
          .then(res =>{
            // this.tableList=res.data.list;
            // this.total=res.data.total;
          })

      },
      handleEdit(row){
        console.log(row);
        this.dialogFormVisible=true;
      },
      sortChange( column){
        if (column.column){
          if (column.column.property === "appforTime") {
            let order = column.column.order;
            this.order.order = 'time';
            this.order.sort = order === 'ascending'? 'asc': order === 'descending'? 'desc' : ''
          }
        }else{
          this.order = {}
        }
        console.log(this.order)
      },
      changeStatus(status){
        this.status = status;
        console.log(this.status)
      },
      handleCurrentChange(val){
        console.log(val)
      },
      handleSizeChange(val){
        console.log(val)
      },
      searchQuery(val){
        console.log(val);
        this.query=val;
        this.page.currentPage=1;
        this.status="";
        this.init(1,val);
      },
    },
    components:{
      Search
    }
  }
</script>

<style scoped>
  #maker .tableWarp{
    padding: 0 40px;
    box-sizing: border-box;
  }
  .pagination{
    margin-top: 40px;
  }
</style>