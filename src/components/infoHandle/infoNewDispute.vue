<template>
    <div id="newDispute">
        <h2 class="title">
            纠纷新增
        </h2>
        <div class="form">
            <el-form ref="form"  label-width="80px">
                <el-form-item label="提出者">
                    <el-input v-model="proposeId" placeholder="请输入用户ID" class="input"></el-input>
                </el-form-item>
                <el-form-item label="对象">
                    <el-input v-model="targetId"  placeholder="请输入用户ID" class="input"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="type" placeholder="请选择">
                        <el-option
                        v-for="item in typeOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>   
                </el-form-item>
                <el-form-item label="详情">
                    <el-input type="textarea" v-model="comment"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit">提交</el-button>
                    <el-button @click='$router.go(-1)'>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
//信息处理 => 纠纷处理 => 新增纠纷
export default {
    created(){
        this.$api.getDisputeTypeList()
        .then(res =>{
            this.typeOptions=res.data;
        })

    },
    data() {
      return {
        proposeId:'',
        targetId:'',
        typeOptions: [],
        type: '',  //类型
        comment:'', //详情
      }
    },
    methods: {
      submit() {
          if(!this.comment || !this.proposeId || !this.targetId || !this.type){
              this.$notify({
                  type:'warning',
                  message:"请填写完整信息"
              })
              return 
          }
          
          let params={ 
              comment:this.comment,  //详情
              proposeId:this.proposeId, //提出纠纷的人的id
              targetId:this.targetId, //被纠纷的id
              type:this.type, //纠纷的类型
          }
          this.$api.insertDispute(params)
            .then(res =>{
                if(res.code === 0){
                    this.$notify({
                        type:"success",
                        message:res.msg,
                    })
                    this.$router.push('/infoHandle/dispute');
                }else{
                    this.$notify({
                        type:"warning",
                        message:res.msg,
                    })
                }

            })
      },
    }

}
</script>

<style lang='scss'>
#newDispute{
    //  padding: 24px;
    .title{
        padding: 24px  0;
        margin: 0 24px;

        font-size: 16px;
        color: #4A4A4A;
        font-weight: normal;
        border-bottom: 1px solid #707070;
    }
    .form{
        width: 600px;
        margin-top: 20px;
    }
    .input{
        width: 140px;

    }

}

</style>
