<template>
    <div id="dialog">
        <el-dialog
            :visible.sync="dialogVisible"
            width="50%"
            >
            <img  width="100%" :src="src" alt="pic">
        </el-dialog>
    </div>
</template>

<script>
//查看图片
export default {
    props:{
        src:String,
    },
    data(){
        return{
            dialogVisible:false,
        }
    },
    methods:{
        show(){
            this.dialogVisible=true;
        },
        hide(){
            this.dialogVisible=false;
        }
    }

}
</script>

<style lang='scss'>
#dialog{


}


</style>
